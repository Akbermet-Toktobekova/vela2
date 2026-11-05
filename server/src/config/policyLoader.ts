import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrototypePolicyBundle, PrototypePolicyBundleSchema } from '@shared/contracts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_POLICY_PATH = path.resolve(__dirname, '../../config/prototype-policy.json');

let cachedPolicy: PrototypePolicyBundle | null = null;

export function loadPrototypePolicy(customPath?: string): PrototypePolicyBundle {
  if (cachedPolicy && !customPath) {
    return cachedPolicy;
  }
  const targetPath = customPath || DEFAULT_POLICY_PATH;
  const raw = fs.readFileSync(targetPath, 'utf-8');
  const parsed = JSON.parse(raw);
  const validated = PrototypePolicyBundleSchema.parse(parsed);
  if (!customPath) {
    cachedPolicy = validated;
  }
  return validated;
}

export function resetPolicyCache(): void {
  cachedPolicy = null;
}
