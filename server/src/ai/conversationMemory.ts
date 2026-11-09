import { ChatMemorySchema, type ChatMemory } from '@shared/contracts/pipeline';
import { SecurityService } from '../security/securityService';
import { LLMClient, wrapUntrustedData } from './llmClient';
import { prompts } from './prompts';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export function memoryFingerprint(messages: ConversationMessage[]): string {
  return SecurityService.computeCanonicalHash({
    messages: messages.filter(row => row.role === 'user'),
    prompt: prompts.memory.version,
  });
}

export async function summarizeConversation(
  messages: ConversationMessage[],
  previous: ChatMemory | null,
  llm: Pick<LLMClient, 'generateStructured'>,
  sanitize: (text: string) => string,
): Promise<ChatMemory | null> {
  const userMessages = messages.filter(message => message.role === 'user');
  if (!userMessages.length) return null;
  const inputHash = memoryFingerprint(messages);
  if (previous?.status === 'CURRENT' && previous.inputHash === inputHash) return previous;
  const existingIds = new Set(userMessages.map(row => row.id));
  const safePrevious = previous?.entries.filter(entry => entry.messageIds.every(id => existingIds.has(id))) ?? [];
  const recent = userMessages.slice(-10);
  const ids = new Set([...recent.map(row => row.id), ...safePrevious.flatMap(entry => entry.messageIds)]);
  const schema = ChatMemorySchema.pick({ entries: true, summaryText: true });
  const fallback = () => ({ entries: safePrevious, summaryText: safePrevious.map(row => row.text).join(' ') });
  const result = await llm.generateStructured({
    systemPrompt: prompts.memory.text,
    userPrompt: wrapUntrustedData(JSON.stringify({
      messages: recent.map(({ id, content }) => ({ id, content: sanitize(content) })),
      previousEntries: safePrevious,
    }), 'conversation_memory'),
    schema, fallback,
  }).catch(() => null);
  const parsed = schema.safeParse(result?.data);
  const valid = result?.liveCallUsed && parsed.success && parsed.data.entries.every(entry =>
    entry.messageIds.every(id => ids.has(id)));
  const entries = valid && parsed.success ? parsed.data.entries : safePrevious;
  return ChatMemorySchema.parse({
    inputHash, promptVersion: prompts.memory.version, status: valid ? 'CURRENT' : entries.length ? 'STALE' : 'UNAVAILABLE',
    updatedAt: new Date().toISOString(), entries, summaryText: entries.map(entry => entry.text).join(' '),
    model: result && { provider: result.provider, modelUsed: result.modelUsed, liveCallUsed: result.liveCallUsed, fallbackReason: result.fallbackReason } || undefined,
  });
}
