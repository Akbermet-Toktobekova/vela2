import { describe, expect, it, vi } from 'vitest';
import { FrankfurterFXService } from '../src/fx/frankfurterService';

describe('Frankfurter spending estimates', () => {
  it('independently fetches supported pairs, rejects future quotes and reuses valid display quotes', async () => {
    const fetchFn = vi.fn<typeof fetch>(async input => {
      const url = new URL(String(input));
      const quote = url.pathname.split('/').at(-1);
      if (quote === 'ZZZ') return new Response(null, {status: 422});
      return Response.json({base: 'EUR', quote, rate: quote === 'HUF' ? 400 : 100,
        date: quote === 'USD' ? '2026-11-10' : '2026-11-06'});
    });
    const fx = new FrankfurterFXService({fetchFn, referenceNowIso: '2026-11-09T10:00:00Z'});
    const rates = await fx.getSpendingRates('EUR', ['EUR', 'HUF', 'HUF', 'KGS', 'USD', 'ZZZ']);
    expect(Object.keys(rates)).toEqual(['HUF', 'KGS', 'USD', 'ZZZ']);
    expect(rates.HUF).toMatchObject({status: 'OK', rate: 400, rateDate: '2026-11-06'});
    expect(rates.KGS).toMatchObject({status: 'OK', rate: 100});
    expect(rates.USD).toMatchObject({status: 'UNAVAILABLE', rate: 0});
    expect(rates.ZZZ).toMatchObject({status: 'UNAVAILABLE', rate: 0});
    expect(fetchFn.mock.calls.map(([url]) => url)).toEqual(['HUF', 'KGS', 'USD', 'ZZZ'].map(
      code => 'https://api.frankfurter.dev/v2/rate/EUR/' + code + '?date=2026-11-09'));
    await fx.getSpendingRates('EUR', ['KGS']);
    expect(fetchFn).toHaveBeenCalledTimes(4);
  });
});
