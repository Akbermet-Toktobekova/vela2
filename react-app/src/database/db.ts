import { PIDatabaseSeed, createDemoSeedData, createBlankUserSeedData } from './seed';

const DB_NAME = 'vela_pi_database_v1';
const DB_VERSION = 1;
const STORE_NAME = 'pi_state';
const STATE_KEY = 'active_pi_state';

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not supported in this browser environment.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadPIState(): Promise<PIDatabaseSeed> {
  try {
    const db = await openIndexedDB();
    return await new Promise<PIDatabaseSeed>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as PIDatabaseSeed);
        } else {
          const seed = createDemoSeedData();
          savePIState(seed).then(() => resolve(seed)).catch(() => resolve(seed));
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Fallback to localStorage if IndexedDB is blocked in restricted mode
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as PIDatabaseSeed;
      } catch {
        // ignore parse error
      }
    }
    const seed = createDemoSeedData();
    localStorage.setItem(STATE_KEY, JSON.stringify(seed));
    return seed;
  }
}

export async function savePIState(state: PIDatabaseSeed): Promise<void> {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }
  try {
    const db = await openIndexedDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(state, STATE_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // fallback already saved in localStorage
  }
}

export async function resetToDemoState(): Promise<PIDatabaseSeed> {
  const seed = createDemoSeedData();
  await savePIState(seed);
  return seed;
}

export async function resetToBlankNewUserState(): Promise<PIDatabaseSeed> {
  const blank = createBlankUserSeedData();
  await savePIState(blank);
  return blank;
}

export function exportPIStateJson(state: PIDatabaseSeed): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      schemaVersion: '1.0',
      application: 'Vela Personal Intelligence Prototype',
      securityNotice:
        'Browser-local prototype export. Production banking requires encrypted backend storage.',
      data: state,
    },
    null,
    2
  );
}
