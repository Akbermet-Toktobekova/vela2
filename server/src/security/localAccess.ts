import type { RequestHandler } from 'express';

/** D-011: transport boundary for a single-computer prototype, not authentication. */
export const LOCAL_LISTEN_HOST = '127.0.0.1';

const LOOPBACK_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
const DEFAULT_BROWSER_ORIGINS = [5173, 4173, 5188].flatMap((port) =>
  [...LOOPBACK_HOSTS].map((host) => `http://${host}:${port}`)
);
const ALLOWED_HEADERS = new Set(['content-type', 'x-user-id', 'authorization']);

function isLoopbackOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return (url.protocol === 'http:' || url.protocol === 'https:') &&
      LOOPBACK_HOSTS.has(url.hostname) && url.origin === origin &&
      !url.username && !url.password;
  } catch {
    return false;
  }
}

function isLoopbackHostHeader(host: string): boolean {
  if (!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/i.test(host)) return false;
  try {
    const url = new URL(`http://${host}`);
    return LOOPBACK_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function createLocalAccessMiddleware(options?: { allowedOrigins?: string[] }): RequestHandler {
  const configured = options?.allowedOrigins ??
    (process.env.FINAGENT_ALLOWED_ORIGINS
      ? process.env.FINAGENT_ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
      : DEFAULT_BROWSER_ORIGINS);
  if (configured.some((origin) => !isLoopbackOrigin(origin))) {
    throw new Error('FINAGENT_ALLOWED_ORIGINS must contain only explicit loopback HTTP(S) origins.');
  }
  const allowedOrigins = new Set(configured);

  return (req, res, next) => {
    const remote = req.socket.remoteAddress;
    const host = req.headers.host || '';
    const origin = req.headers.origin;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.vary('Origin');

    const deny = (code: string) => {
      res.status(403).json({ code, error: code, message: 'This prototype is available only from this computer and approved local app origins.' });
    };
    if (!remote || !['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)) {
      deny('LOCAL_ACCESS_ONLY');
      return;
    }
    // Check the actual Host and socket, never forwarded headers: blocks DNS rebinding.
    if (!isLoopbackHostHeader(host)) {
      deny('LOCAL_HOST_REQUIRED');
      return;
    }
    if (origin !== undefined) {
      const sameOrigin = origin === `http://${host}` || origin === `https://${host}`;
      if (!isLoopbackOrigin(origin) || (!sameOrigin && !allowedOrigins.has(origin))) {
        deny('LOCAL_ORIGIN_REQUIRED');
        return;
      }
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (req.headers['sec-fetch-site'] === 'cross-site') {
      deny('LOCAL_ORIGIN_REQUIRED');
      return;
    }

    if (req.method === 'OPTIONS') {
      const requestedMethod = req.headers['access-control-request-method'];
      const requestedHeaders = String(req.headers['access-control-request-headers'] || '')
        .split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
      if (!origin || !requestedMethod || !['GET', 'PUT', 'POST'].includes(requestedMethod) ||
          requestedHeaders.some((h) => !ALLOWED_HEADERS.has(h))) {
        deny('LOCAL_PREFLIGHT_REJECTED');
        return;
      }
      res.vary('Access-Control-Request-Method');
      res.vary('Access-Control-Request-Headers');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-User-Id, Authorization');
      res.sendStatus(204);
      return;
    }
    next();
  };
}
