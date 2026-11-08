import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, type ThinkingLevel } from '@google/genai';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type LLMProvider = 'gemini' | 'openai';

export interface ModelRuntimeState {
  modelId: string;
  status: 'AVAILABLE' | 'RATE_LIMITED' | 'NOT_FOUND_404' | 'ERROR';
  cooldownUntilMs: number;
  successCount: number;
  rateLimitCount: number;
  errorCount: number;
  lastError?: string;
}

export interface LLMClientOptions {
  provider?: LLMProvider;
  geminiApiKey?: string;
  geminiPrimaryModel?: string;
  geminiHttpOptions?: NonNullable<ConstructorParameters<typeof GoogleGenAI>[0]>['httpOptions'];
  pinGeminiModel?: boolean;
  geminiStreaming?: boolean;
  geminiThinkingLevel?: ThinkingLevel;
  openaiApiKey?: string;
  openaiModel?: string;
  openaiBaseUrl?: string;
  mockMode?: boolean;
  envFilePath?: string;
}

export interface LLMCallResult<T> {
  data: T;
  provider: 'gemini' | 'openai' | 'deterministic_fallback';
  modelUsed: string;
  liveCallUsed: boolean;
  fallbackReason?: string;
  responseCapture?: { model: string; rawText: string };
}

/**
 * Parses a standard .env file via node:fs without requiring an external dotenv dependency.
 */
export function parseEnvFile(envFilePath?: string): Record<string, string> {
  const candidatePaths = envFilePath
    ? [envFilePath]
    : [
        path.resolve(__dirname, '../../../user-inputs/secrets/.env'),
        path.resolve(process.cwd(), '../user-inputs/secrets/.env'),
        path.resolve(process.cwd(), 'user-inputs/secrets/.env'),
      ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf-8');
        const result: Record<string, string> = {};
        for (const rawLine of content.split(/\r?\n/)) {
          const line = rawLine.trim();
          if (!line || line.startsWith('#')) continue;
          const eqIdx = line.indexOf('=');
          if (eqIdx <= 0) continue;
          const key = line.slice(0, eqIdx).trim();
          let val = line.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          result[key] = val;
        }
        return result;
      }
    } catch {
      // Ignore unreadable candidate path and try next
    }
  }
  return {};
}

/**
 * Wraps untrusted statement descriptions, merchant strings, or external text
 * in <untrusted_data> tags and neutralizes any embedded closing tags to prevent prompt injection.
 */
export function wrapUntrustedData(rawText: string, label?: string): string {
  const sanitized = String(rawText ?? '')
    .replace(/<\/?\s*untrusted_data[^>]*>/gi, '[escaped_tag]')
    .trim();
  const attr = label ? ` source="${label.replace(/[^a-zA-Z0-9_-]/g, '_')}"` : '';
  return `<untrusted_data${attr}>${sanitized}</untrusted_data>`;
}

export class LLMClient {
  private readonly provider: LLMProvider;
  private readonly geminiApiKey: string;
  private readonly openaiApiKey: string;
  private readonly openaiModel: string;
  private readonly openaiBaseUrl: string;
  private readonly mockMode: boolean;
  private readonly geminiModels: string[];
  private readonly geminiStreaming: boolean;
  private readonly geminiThinkingLevel?: ThinkingLevel;
  private readonly modelStates: Map<string, ModelRuntimeState> = new Map();
  private geminiClient: GoogleGenAI | null = null;
  private rotationCursor = 0;

  constructor(options?: LLMClientOptions) {
    this.geminiStreaming = options?.geminiStreaming ?? false;
    this.geminiThinkingLevel = options?.geminiThinkingLevel;
    const fileEnv = parseEnvFile(options?.envFilePath);
    const getEnv = (key: string): string => {
      const fromProc = process.env[key];
      if (fromProc !== undefined && fromProc.trim() !== '') {
        return fromProc.trim();
      }
      return (fileEnv[key] || '').trim();
    };

    const rawProvider = (options?.provider || getEnv('LLM_PROVIDER') || 'gemini').toLowerCase();
    this.provider = rawProvider === 'openai' ? 'openai' : 'gemini';

    this.geminiApiKey = options?.geminiApiKey ?? getEnv('GEMINI_API_KEY');
    this.openaiApiKey = options?.openaiApiKey ?? getEnv('OPENAI_API_KEY');
    this.openaiModel = options?.openaiModel || getEnv('OPENAI_MODEL') || 'gpt-4o-mini';
    this.openaiBaseUrl =
      options?.openaiBaseUrl || getEnv('OPENAI_BASE_URL') || 'https://api.openai.com/v1';

    // Default mockMode to true unless FINAGENT_USE_LIVE_LLM === 'true' or explicitly configured
    if (options?.mockMode !== undefined) {
      this.mockMode = options.mockMode;
    } else {
      this.mockMode = process.env.FINAGENT_USE_LIVE_LLM !== 'true';
    }

    const configuredPrimary =
      options?.geminiPrimaryModel || getEnv('GEMINI_MODEL') || 'gemini-3.5-flash-lite';

    // Primary rotation between gemini-3.1-flash-lite and gemini-3.5-flash-lite,
    // plus preview / flash fallback aliases if an endpoint returns 404 for a model ID (D-002).
    const orderedCandidates = [
      configuredPrimary,
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite-preview',
      'gemini-2.5-flash',
    ];
    this.geminiModels = options?.pinGeminiModel || configuredPrimary.startsWith('gemma-') || configuredPrimary === 'gemini-3.5-flash-lite'
      ? [configuredPrimary]
      : Array.from(new Set(orderedCandidates.filter(Boolean)));

    for (const modelId of this.geminiModels) {
      this.modelStates.set(modelId, {
        modelId,
        status: 'AVAILABLE',
        cooldownUntilMs: 0,
        successCount: 0,
        rateLimitCount: 0,
        errorCount: 0,
      });
    }
    this.modelStates.set(this.openaiModel, {
      modelId: this.openaiModel,
      status: 'AVAILABLE',
      cooldownUntilMs: 0,
      successCount: 0,
      rateLimitCount: 0,
      errorCount: 0,
    });

    if (this.geminiApiKey) {
      this.geminiClient = new GoogleGenAI({ apiKey: this.geminiApiKey, httpOptions: options?.geminiHttpOptions });
    }
  }

  static wrapUntrustedData(rawText: string, label?: string): string {
    return wrapUntrustedData(rawText, label);
  }

  wrapUntrustedData(rawText: string, label?: string): string {
    return wrapUntrustedData(rawText, label);
  }

  isMockMode(): boolean {
    return this.mockMode;
  }

  getProvider(): LLMProvider {
    return this.provider;
  }

  getQuotaAndModelStatus(): {
    provider: LLMProvider;
    mockMode: boolean;
    configuredPrimaryModel: string;
    candidateModels: string[];
    modelStates: Record<string, ModelRuntimeState>;
  } {
    const states: Record<string, ModelRuntimeState> = {};
    for (const [k, v] of this.modelStates.entries()) {
      states[k] = { ...v };
    }
    return {
      provider: this.provider,
      mockMode: this.mockMode,
      configuredPrimaryModel: this.geminiModels[0] || 'gemini-3.1-flash-lite',
      candidateModels: [...this.geminiModels],
      modelStates: states,
    };
  }

  /**
   * Dynamically tracks 429 / RESOURCE_EXHAUSTED or 404 responses without hardcoding static RPM/RPD constants.
   */
  private recordModelFailure(modelId: string, err: unknown): void {
    const state = this.modelStates.get(modelId) || {
      modelId,
      status: 'AVAILABLE',
      cooldownUntilMs: 0,
      successCount: 0,
      rateLimitCount: 0,
      errorCount: 0,
    };

    const msg = err instanceof Error ? err.message : String(err);
    state.lastError = msg;

    const is404 =
      msg.includes('404') ||
      msg.toLowerCase().includes('not found') ||
      msg.toLowerCase().includes('not supported for generatecontent');
    const is429 =
      msg.includes('429') ||
      msg.toUpperCase().includes('RESOURCE_EXHAUSTED') ||
      msg.toLowerCase().includes('quota') ||
      msg.toLowerCase().includes('rate limit') ||
      msg.toLowerCase().includes('too many requests');

    if (is404) {
      state.status = 'NOT_FOUND_404';
      state.errorCount += 1;
      // Keep 404 model cooled down for 1 hour so subsequent calls rotate immediately
      state.cooldownUntilMs = Date.now() + 60 * 60 * 1000;
    } else if (is429) {
      state.status = 'RATE_LIMITED';
      state.rateLimitCount += 1;
      // Parse Retry-After or retryDelay if provided in the API error message, else adaptive backoff
      const retrySecMatch = msg.match(/retry[^\d]*(\d+)\s*s/i);
      const backoffMs = retrySecMatch
        ? Math.min(300_000, Number(retrySecMatch[1]) * 1000)
        : Math.min(120_000, 5_000 * Math.pow(2, Math.min(4, state.rateLimitCount - 1)));
      state.cooldownUntilMs = Date.now() + backoffMs;
    } else {
      state.status = 'ERROR';
      state.errorCount += 1;
      state.cooldownUntilMs = Date.now() + 5_000;
    }

    this.modelStates.set(modelId, state);
  }

  private recordModelSuccess(modelId: string): void {
    const state = this.modelStates.get(modelId);
    if (state) {
      state.status = 'AVAILABLE';
      state.cooldownUntilMs = 0;
      state.successCount += 1;
      this.modelStates.set(modelId, state);
    }
  }

  private getOrderedEligibleGeminiModels(): string[] {
    const now = Date.now();
    const total = this.geminiModels.length;
    const rotated: string[] = [];
    for (let i = 0; i < total; i++) {
      const idx = (this.rotationCursor + i) % total;
      rotated.push(this.geminiModels[idx]);
    }
    // Advance cursor so normal requests balance across gemini-3.1-flash-lite and gemini-3.5-flash-lite
    this.rotationCursor = (this.rotationCursor + 1) % Math.max(1, Math.min(2, total));

    const ready = rotated.filter((m) => {
      const st = this.modelStates.get(m);
      if (!st) return true;
      if (st.status === 'NOT_FOUND_404' && st.cooldownUntilMs > now) return false;
      return st.cooldownUntilMs <= now;
    });

    return ready.length > 0 ? ready : rotated.filter((m) => this.modelStates.get(m)?.status !== 'NOT_FOUND_404');
  }

  private async callGeminiRaw(params: {
    systemPrompt: string;
    userPrompt: string;
    jsonMode: boolean;
    temperature?: number;
    responseJsonSchema?: object;
  }): Promise<{ text: string; modelUsed: string }> {
    if (!this.geminiClient || !this.geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const candidates = this.getOrderedEligibleGeminiModels();
    let lastError: unknown = new Error('No Gemini candidate models available');

    for (const modelId of candidates) {
      try {
        const request = {
          model: modelId,
          contents: params.userPrompt,
          config: {
            systemInstruction: params.systemPrompt,
            temperature: params.temperature ?? 0.1,
            ...(params.jsonMode ? { responseMimeType: 'application/json' } : {}),
            ...(params.responseJsonSchema ? { responseJsonSchema: params.responseJsonSchema } : {}),
            ...(this.geminiThinkingLevel ? { thinkingConfig: { thinkingLevel: this.geminiThinkingLevel } } : {}),
          },
        };
        let text = '';
        if (this.geminiStreaming) {
          const stream = await this.geminiClient.models.generateContentStream(request);
          for await (const chunk of stream) text += chunk.text ?? '';
        } else {
          text = (await this.geminiClient.models.generateContent(request)).text ?? '';
        }
        if (!text.trim()) {
          throw new Error(`Empty response text from Gemini model ${modelId}`);
        }
        this.recordModelSuccess(modelId);
        return { text, modelUsed: modelId };
      } catch (err) {
        this.recordModelFailure(modelId, err);
        lastError = err;
      }
    }

    throw lastError;
  }

  private async callOpenAIRaw(params: {
    systemPrompt: string;
    userPrompt: string;
    jsonMode: boolean;
    temperature?: number;
  }): Promise<{ text: string; modelUsed: string }> {
    if (!this.openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const modelId = this.openaiModel;
    try {
      const res = await fetch(`${this.openaiBaseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: modelId,
          temperature: params.temperature ?? 0.1,
          ...(params.jsonMode ? { response_format: { type: 'json_object' } } : {}),
          messages: [
            { role: 'system', content: params.systemPrompt },
            { role: 'user', content: params.userPrompt },
          ],
        }),
      });

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        throw new Error(`OpenAI HTTP ${res.status}: ${errBody}`);
      }

      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const text = json.choices?.[0]?.message?.content ?? '';
      if (!text.trim()) {
        throw new Error(`Empty response from OpenAI model ${modelId}`);
      }
      this.recordModelSuccess(modelId);
      return { text, modelUsed: modelId };
    } catch (err) {
      this.recordModelFailure(modelId, err);
      throw err;
    }
  }

  /**
   * Executes a structured JSON call with automatic model rotation, Zod schema validation,
   * and seamless deterministic fallback when in mockMode or when quota/network errors occur.
   */
  async generateStructured<T>(params: {
    systemPrompt: string;
    userPrompt: string;
    schema?: z.ZodType<T>;
    fallback: () => T;
    forceLive?: boolean;
    temperature?: number;
    responseJsonSchema?: object;
    captureRawResponse?: boolean;
  }): Promise<LLMCallResult<T>> {
    const shouldUseMock = this.mockMode && !params.forceLive;
    if (shouldUseMock) {
      return {
        data: params.fallback(),
        provider: 'deterministic_fallback',
        modelUsed: 'mock_deterministic',
        liveCallUsed: false,
        fallbackReason: 'mockMode_enabled',
      };
    }

    let responseCapture: LLMCallResult<T>['responseCapture'];
    try {
      const raw =
        this.provider === 'openai'
          ? await this.callOpenAIRaw({
              systemPrompt: params.systemPrompt,
              userPrompt: params.userPrompt,
              jsonMode: true,
              temperature: params.temperature,
            })
          : await this.callGeminiRaw({
              systemPrompt: params.systemPrompt,
              userPrompt: params.userPrompt,
              jsonMode: true,
              temperature: params.temperature,
              responseJsonSchema: params.responseJsonSchema,
            });
      if (params.captureRawResponse) responseCapture = { model: raw.modelUsed, rawText: raw.text };

      const cleaned = raw.text
        .trim()
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      const parsed = JSON.parse(cleaned) as unknown;
      const validated = params.schema ? params.schema.parse(parsed) : (parsed as T);

      return {
        data: validated,
        provider: this.provider,
        modelUsed: raw.modelUsed,
        liveCallUsed: true,
        ...(responseCapture ? { responseCapture } : {}),
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      return {
        data: params.fallback(),
        provider: 'deterministic_fallback',
        modelUsed: 'deterministic_fallback_after_error',
        liveCallUsed: false,
        fallbackReason: reason,
        ...(responseCapture ? { responseCapture } : {}),
      };
    }
  }

  /**
   * Executes a text generation call with automatic model rotation and deterministic fallback.
   */
  async generateText(params: {
    systemPrompt: string;
    userPrompt: string;
    fallback: () => string;
    forceLive?: boolean;
    temperature?: number;
  }): Promise<{
    text: string;
    provider: 'gemini' | 'openai' | 'deterministic_fallback';
    modelUsed: string;
    liveCallUsed: boolean;
    fallbackReason?: string;
  }> {
    const shouldUseMock = this.mockMode && !params.forceLive;
    if (shouldUseMock) {
      return {
        text: params.fallback(),
        provider: 'deterministic_fallback',
        modelUsed: 'mock_deterministic',
        liveCallUsed: false,
        fallbackReason: 'mockMode_enabled',
      };
    }

    try {
      const raw =
        this.provider === 'openai'
          ? await this.callOpenAIRaw({
              systemPrompt: params.systemPrompt,
              userPrompt: params.userPrompt,
              jsonMode: false,
              temperature: params.temperature,
            })
          : await this.callGeminiRaw({
              systemPrompt: params.systemPrompt,
              userPrompt: params.userPrompt,
              jsonMode: false,
              temperature: params.temperature,
            });

      return {
        text: raw.text.trim(),
        provider: this.provider,
        modelUsed: raw.modelUsed,
        liveCallUsed: true,
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      return {
        text: params.fallback(),
        provider: 'deterministic_fallback',
        modelUsed: 'deterministic_fallback_after_error',
        liveCallUsed: false,
        fallbackReason: reason,
      };
    }
  }
}
