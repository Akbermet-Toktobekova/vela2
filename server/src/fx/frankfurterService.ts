import { PrototypePolicyBundle } from '@shared/contracts';
import { FXRateEntry } from '@shared/pi/types';
import { loadPrototypePolicy } from '../config/policyLoader';

export interface FXCachePersistence {
  getCachedFXRate(base: string, target: string, rateDate?: string): FXRateEntry | null;
  upsertFXRate(entry: FXRateEntry): void;
}

export interface FrankfurterServiceOptions {
  policy?: PrototypePolicyBundle;
  cacheStore?: FXCachePersistence;
  fetchFn?: typeof fetch;
  referenceNowIso?: string;
  timeoutMs?: number;
}

interface FrankfurterApiResponse {
  amount?: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Known ECB / Frankfurter v1 supported currencies
export const FRANKFURTER_ECB_SUPPORTED_CURRENCIES = new Set<string>([
  'EUR',
  'USD',
  'GBP',
  'HUF',
  'CHF',
  'PLN',
  'CZK',
  'RON',
  'SEK',
  'NOK',
  'DKK',
  'JPY',
  'CAD',
  'AUD',
  'NZD',
  'CNY',
  'HKD',
  'SGD',
  'KRW',
  'INR',
  'BRL',
  'MXN',
  'ZAR',
  'TRY',
  'ILS',
  'IDR',
  'MYR',
  'PHP',
  'THB',
  'ISK',
  'BGN',
]);

export class FrankfurterFXService {
  private policy: PrototypePolicyBundle;
  private cacheStore?: FXCachePersistence;
  private fetchFn: typeof fetch;
  private referenceNowIso?: string;
  private timeoutMs: number;
  private memoryCache = new Map<string, FXRateEntry>();

  constructor(options?: FrankfurterServiceOptions) {
    this.policy = options?.policy || loadPrototypePolicy();
    this.cacheStore = options?.cacheStore;
    this.fetchFn = options?.fetchFn || globalThis.fetch;
    this.referenceNowIso = options?.referenceNowIso;
    this.timeoutMs = options?.timeoutMs ?? 4500;
  }

  public setCacheStore(store: FXCachePersistence): void {
    this.cacheStore = store;
  }

  /**
   * Evaluates whether a stored FX rate is OK, STALE, or UNAVAILABLE
   * against policy.horizonAndFreshness.fxRateStaleThresholdHours (from prototype-policy.json).
   */
  public evaluateFreshnessStatus(
    entry: Pick<FXRateEntry, 'rate' | 'fetchedAt' | 'rateDate' | 'status'>,
    referenceNowIso?: string
  ): 'OK' | 'STALE' | 'UNAVAILABLE' {
    if (entry.status === 'UNAVAILABLE' || !(entry.rate > 0)) {
      return 'UNAVAILABLE';
    }
    const staleThresholdHours = this.policy.horizonAndFreshness.fxRateStaleThresholdHours;
    const nowMs = referenceNowIso
      ? new Date(referenceNowIso).getTime()
      : this.referenceNowIso
      ? new Date(this.referenceNowIso).getTime()
      : Date.now();

    const quoteMs = Date.parse(entry.rateDate + 'T00:00:00Z');
    if (!Number.isFinite(quoteMs) || !Number.isFinite(nowMs) ||
        entry.rateDate > new Date(nowMs).toISOString().slice(0, 10)) return 'UNAVAILABLE';
    const fetchedMs = new Date(entry.fetchedAt).getTime();
    if (Number.isNaN(fetchedMs)) {
      return 'STALE';
    }

    const ageHours = Math.max(0, (nowMs - fetchedMs) / (1000 * 60 * 60));
    if (ageHours > staleThresholdHours) {
      return 'STALE';
    }
    return 'OK';
  }

  private getFromCache(base: string, target: string, dateKey?: string): FXRateEntry | null {
    const b = base.toUpperCase();
    const t = target.toUpperCase();
    if (this.cacheStore) {
      const dbEntry = this.cacheStore.getCachedFXRate(b, t, dateKey);
      if (dbEntry) return dbEntry;
    }
    const memKey = `${b}:${t}:${dateKey || 'latest'}`;
    return this.memoryCache.get(memKey) || null;
  }

  private saveToCache(entry: FXRateEntry, dateKey?: string): void {
    const b = entry.base.toUpperCase();
    const t = entry.target.toUpperCase();
    this.memoryCache.set(`${b}:${t}:latest`, entry);
    this.memoryCache.set(`${b}:${t}:${entry.rateDate}`, entry);
    if (dateKey) {
      this.memoryCache.set(`${b}:${t}:${dateKey}`, entry);
    }
    if (this.cacheStore) {
      this.cacheStore.upsertFXRate(entry);
    }
  }

  private async fetchWithTimeout(url: string): Promise<FrankfurterApiResponse | null> {
    if (!this.fetchFn) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await this.fetchFn(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) {
        return null;
      }
      const data = (await response.json()) as FrankfurterApiResponse;
      if (!data || typeof data.rates !== 'object') {
        return null;
      }
      return data;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Fetches latest FX rates for `base` against `symbols` using official Frankfurter v1 endpoint:
   * https://api.frankfurter.dev/v1/latest?base=...&symbols=...
   * with fallback to https://api.frankfurter.app/latest?base=...&symbols=...
   * Never invents a 1:1 rate for unsupported currencies (such as KGS).
   */
  public async getLatestRates(
    base: string,
    symbols: string[],
    options?: { forceRefresh?: boolean; referenceNowIso?: string }
  ): Promise<Record<string, FXRateEntry>> {
    const baseUpper = (base || 'EUR').trim().toUpperCase();
    const nowIso = options?.referenceNowIso || this.referenceNowIso || new Date().toISOString();
    const uniqueTargets = Array.from(
      new Set(symbols.map((s) => (s || '').trim().toUpperCase()).filter(Boolean))
    );

    const results: Record<string, FXRateEntry> = {};
    const symbolsToFetch: string[] = [];

    for (const target of uniqueTargets) {
      if (target === baseUpper) {
        const identityEntry: FXRateEntry = {
          base: baseUpper,
          target,
          rate: 1,
          rateDate: nowIso.slice(0, 10),
          fetchedAt: new Date().toISOString(),
          status: 'OK',
          source: 'identity',
        };
        results[target] = identityEntry;
        continue;
      }

      if (
        !FRANKFURTER_ECB_SUPPORTED_CURRENCIES.has(baseUpper) ||
        !FRANKFURTER_ECB_SUPPORTED_CURRENCIES.has(target)
      ) {
        const unavailableEntry: FXRateEntry = {
          base: baseUpper,
          target,
          rate: 0,
          rateDate: nowIso.slice(0, 10),
          fetchedAt: new Date().toISOString(),
          status: 'UNAVAILABLE',
          source: 'frankfurter_unsupported_currency',
        };
        this.saveToCache(unavailableEntry);
        results[target] = unavailableEntry;
        continue;
      }

      if (!options?.forceRefresh) {
        const cached = this.getFromCache(baseUpper, target);
        if (cached && cached.status !== 'UNAVAILABLE' && cached.rate > 0) {
          const currentStatus = this.evaluateFreshnessStatus(cached, nowIso);
          if (currentStatus === 'OK') {
            results[target] = { ...cached, status: 'OK' };
            continue;
          }
        }
      }

      symbolsToFetch.push(target);
    }

    if (symbolsToFetch.length > 0) {
      const symbolsParam = encodeURIComponent(symbolsToFetch.join(','));
      const baseParam = encodeURIComponent(baseUpper);
      const primaryUrl = `https://api.frankfurter.dev/v1/latest?base=${baseParam}&symbols=${symbolsParam}`;
      const fallbackUrl = `https://api.frankfurter.app/latest?base=${baseParam}&symbols=${symbolsParam}`;

      let apiData = await this.fetchWithTimeout(primaryUrl);
      let usedSource = 'https://api.frankfurter.dev/v1/latest';

      if (!apiData) {
        apiData = await this.fetchWithTimeout(fallbackUrl);
        usedSource = 'https://api.frankfurter.app/latest';
      }

      for (const target of symbolsToFetch) {
        const rateVal = apiData?.rates?.[target];
        if (apiData && typeof rateVal === 'number' && rateVal > 0) {
          const entry: FXRateEntry = {
            base: baseUpper,
            target,
            rate: rateVal,
            rateDate: apiData.date || nowIso.slice(0, 10),
            fetchedAt: new Date().toISOString(),
            status: 'OK',
            source: usedSource,
          };
          entry.status = this.evaluateFreshnessStatus(entry, nowIso);
          this.saveToCache(entry);
          results[target] = entry;
        } else {
          // Check if we have a stale cached entry before returning UNAVAILABLE
          const cached = this.getFromCache(baseUpper, target);
          if (cached && cached.rate > 0) {
            const staleEntry: FXRateEntry = {
              ...cached,
              status: 'STALE',
            };
            results[target] = staleEntry;
          } else {
            const unavailableEntry: FXRateEntry = {
              base: baseUpper,
              target,
              rate: 0,
              rateDate: nowIso.slice(0, 10),
              fetchedAt: new Date().toISOString(),
              status: 'UNAVAILABLE',
              source: 'frankfurter_unavailable',
            };
            this.saveToCache(unavailableEntry);
            results[target] = unavailableEntry;
          }
        }
      }
    }

    return results;
  }

  /**
   * Fetches historical FX rates for a specific ISO date (YYYY-MM-DD):
   * https://api.frankfurter.dev/v1/${dateIso}?base=${encodeURIComponent(base)}
   */
  public evaluateHistoricalQuote(entry: FXRateEntry, valuationTime: string): FXRateEntry['status'] {
    const status = this.evaluateFreshnessStatus(entry, valuationTime);
    if (status !== 'OK') return status;
    const ageHours = (Date.parse(valuationTime.slice(0, 10)) - Date.parse(entry.rateDate)) / 3600000;
    return ageHours > this.policy.horizonAndFreshness.fxRateStaleThresholdHours ? 'STALE' : 'OK';
  }

  public async getHistoricalRates(
    dateIso: string,
    base: string,
    symbols: string[] = [],
    options?: { referenceNowIso?: string }
  ): Promise<Record<string, FXRateEntry>> {
    const cleanDate = dateIso.slice(0, 10);
    const baseUpper = (base || 'EUR').trim().toUpperCase();
    const valuationTime = options?.referenceNowIso || cleanDate + "T00:00:00Z";
    const uniqueTargets = Array.from(
      new Set(symbols.map((s) => (s || '').trim().toUpperCase()).filter(Boolean))
    );

    const results: Record<string, FXRateEntry> = {};
    const symbolsToFetch: string[] = [];

    for (const target of uniqueTargets) {
      if (target === baseUpper) {
        results[target] = {
          base: baseUpper,
          target,
          rate: 1,
          rateDate: cleanDate,
          fetchedAt: new Date().toISOString(),
          status: 'OK',
          source: 'identity',
        };
        continue;
      }
      if (
        !FRANKFURTER_ECB_SUPPORTED_CURRENCIES.has(baseUpper) ||
        !FRANKFURTER_ECB_SUPPORTED_CURRENCIES.has(target)
      ) {
        const unavail: FXRateEntry = {
          base: baseUpper,
          target,
          rate: 0,
          rateDate: cleanDate,
          fetchedAt: new Date().toISOString(),
          status: 'UNAVAILABLE',
          source: 'frankfurter_unsupported_currency',
        };
        this.saveToCache(unavail, cleanDate);
        results[target] = unavail;
        continue;
      }
      const cached = this.getFromCache(baseUpper, target, cleanDate);
      if (cached && cached.rate > 0 && cached.rateDate <= cleanDate) {
        results[target] = { ...cached, status: this.evaluateHistoricalQuote(cached, valuationTime) };
        continue;
      }
      symbolsToFetch.push(target);
    }

    if (symbolsToFetch.length > 0 || uniqueTargets.length === 0) {
      const baseParam = encodeURIComponent(baseUpper);
      const symQuery =
        symbolsToFetch.length > 0
          ? `&symbols=${encodeURIComponent(symbolsToFetch.join(','))}`
          : '';
      const primaryUrl = `https://api.frankfurter.dev/v1/${cleanDate}?base=${baseParam}${symQuery}`;
      const fallbackUrl = `https://api.frankfurter.app/${cleanDate}?base=${baseParam}${symQuery}`;

      let apiData = await this.fetchWithTimeout(primaryUrl);
      let usedSource = `https://api.frankfurter.dev/v1/${cleanDate}`;

      if (!apiData) {
        apiData = await this.fetchWithTimeout(fallbackUrl);
        usedSource = `https://api.frankfurter.app/${cleanDate}`;
      }

      const targetsToPopulate =
        symbolsToFetch.length > 0 ? symbolsToFetch : Object.keys(apiData?.rates || {});

      for (const target of targetsToPopulate) {
        const rateVal = apiData?.rates?.[target];
        if (apiData && /^\d{4}-\d{2}-\d{2}$/.test(apiData.date) && apiData.date <= cleanDate && typeof rateVal === 'number' && rateVal > 0) {
          const entry: FXRateEntry = {
            base: baseUpper,
            target,
            rate: rateVal,
            rateDate: apiData.date,
            fetchedAt: new Date().toISOString(),
            status: 'OK',
            source: usedSource,
          };
          entry.status = this.evaluateHistoricalQuote(entry, valuationTime);
          this.saveToCache(entry, cleanDate);
          results[target] = entry;
        } else {
          const unavail: FXRateEntry = {
            base: baseUpper,
            target,
            rate: 0,
            rateDate: cleanDate,
            fetchedAt: new Date().toISOString(),
            status: 'UNAVAILABLE',
            source: 'frankfurter_unavailable',
          };
          this.saveToCache(unavail, cleanDate);
          results[target] = unavail;
        }
      }
    }

    return results;
  }
}
