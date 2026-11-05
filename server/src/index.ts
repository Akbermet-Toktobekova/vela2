import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  createApp,
  createAppBundle,
  createApiRouter,
} from './routes/api';
import type { CreateAppOptions, FinAgentAppBundle } from './routes/api';
import { SecurityService, SecurityError } from './security/securityService';
import { FrankfurterFXService } from './fx/frankfurterService';
import { SQLiteStore } from './db/sqliteStore';
import { ReviewOrchestrator } from './orchestrator/reviewWorkflow';
import { LOCAL_LISTEN_HOST } from './security/localAccess';

export {
  createApp,
  createAppBundle,
  createApiRouter,
  SecurityService,
  SecurityError,
  FrankfurterFXService,
  SQLiteStore,
  ReviewOrchestrator,
};
export type { CreateAppOptions, FinAgentAppBundle };

const isMainModule = (() => {
  try {
    if (!process.argv[1]) return false;
    const entryPath = path.resolve(process.argv[1]);
    const currentPath = path.resolve(fileURLToPath(import.meta.url));
    return entryPath === currentPath;
  } catch {
    return false;
  }
})();

if (isMainModule) {
  const port = Number(process.env.PORT || 3001);
  const { app } = createAppBundle();
  app.listen(port, LOCAL_LISTEN_HOST, () => {
    console.log(`[Vela FinAgent Server] Local prototype listening on http://${LOCAL_LISTEN_HOST}:${port} (D-011: this computer only; multi-user authentication is not enabled)`);
  });
}
