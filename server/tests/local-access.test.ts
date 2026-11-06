import express from 'express';
import type { Server } from 'node:http';
import { request } from 'node:http';
import { afterAll,beforeAll,describe,expect,it } from 'vitest';
import { createLocalAccessMiddleware,LOCAL_LISTEN_HOST } from './helpers/localAccess';

describe('D-011 local-only transport boundary', () => {
  let server: Server;
  let base: string;
  beforeAll(async () => {
    const app = express();
    app.use(createLocalAccessMiddleware({ allowedOrigins: ['http://localhost:5173'] }));
    app.get('/private', (_req, res) => res.json({ local: true }));
    app.put('/private', (_req, res) => res.json({ saved: true }));
    server = app.listen(0, LOCAL_LISTEN_HOST);
    await new Promise<void>((resolve) => server.once('listening', resolve));
    base = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  });
  afterAll(async () => { await new Promise<void>((resolve) => server.close(() => resolve())); });

  it('binds on IPv4 loopback and permits local CLI access without advertising wildcard CORS', async () => {
    expect((server.address() as { address: string }).address).toBe('127.0.0.1');
    const response = await fetch(`${base}/private`);
    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it('permits approved local UI origin and echoes that exact origin', async () => {
    const response = await fetch(`${base}/private`, { headers: { Origin: 'http://localhost:5173' } });
    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });
  it.each(['https://attacker.example', 'http://localhost.attacker.example:5173', 'null', 'http://localhost:9999'])('rejects foreign/unapproved origin %s before route execution', async (origin) => {
    const response = await fetch(`${base}/private`, { method: 'PUT', headers: { Origin: origin } });
    expect(response.status).toBe(403);
    expect((await response.json()).code).toBe('LOCAL_ORIGIN_REQUIRED');
    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });
  it('rejects a rebound Host even from a local socket; forwarded headers cannot authorize it', async () => {
    // fetch may normalize Host; use actual raw HTTP headers for this attack case.
    const response = await new Promise<{ status: number; code: string }>((resolve, reject) => {
      const req = request(`${base}/private`, { headers: { Host: 'attacker.example', 'X-Forwarded-Host': 'localhost', 'X-Forwarded-For': '127.0.0.1' } }, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => resolve({ status: res.statusCode!, code: JSON.parse(body).code }));
      });
      req.on('error', reject);
      req.end();
    });
    expect(response.status).toBe(403);
    expect(response.code).toBe('LOCAL_HOST_REQUIRED');
  });
  it('blocks cross-site no-Origin subresource requests', async () => {
    const response = await fetch(`${base}/private`, { headers: { 'Sec-Fetch-Site': 'cross-site' } });
    expect(response.status).toBe(403);
  });
  it('permits the exact local API same-origin', async () => {
    const response = await fetch(`${base}/private`, { headers: { Origin: base } });
    expect(response.status).toBe(200);
  });
  it('handles approved preflight without allowing arbitrary headers/methods', async () => {
    const headers = { Origin: 'http://localhost:5173', 'Access-Control-Request-Method': 'PUT', 'Access-Control-Request-Headers': 'content-type,x-user-id' };
    expect((await fetch(`${base}/private`, { method: 'OPTIONS', headers })).status).toBe(204);
    expect((await fetch(`${base}/private`, { method: 'OPTIONS', headers: { ...headers, 'Access-Control-Request-Headers': 'x-unapproved' } })).status).toBe(403);
    expect((await fetch(`${base}/private`, { method: 'OPTIONS', headers: { ...headers, 'Access-Control-Request-Method': 'DELETE' } })).status).toBe(403);
  });
  it('fails closed for nonlocal configured origins', () => {
    expect(() => createLocalAccessMiddleware({ allowedOrigins: ['https://public.example'] })).toThrow(/loopback/);
  });
  it('mounts the boundary on the actual API before any public diagnostics route', async () => {
    const { createAppBundle } = await import('./helpers/engineHttp');
    const { SQLiteStore } = await import('./helpers/engineStore');
    const { LLMClient } = await import('../src/ai/llmClient');
    const store = new SQLiteStore(':memory:');
    const bundle = createAppBundle({ store, llmClient: new LLMClient({ mockMode: true }) });
    const apiServer = bundle.app.listen(0, LOCAL_LISTEN_HOST);
    await new Promise<void>((resolve) => apiServer.once('listening', resolve));
    const apiBase = `http://127.0.0.1:${(apiServer.address() as { port: number }).port}/api`;
    try {
      expect((await fetch(`${apiBase}/health`)).status).toBe(200);
      const rejected = await fetch(`${apiBase}/health`, { headers: { Origin: 'https://foreign.example' } });
      expect(rejected.status).toBe(403);
      expect((await rejected.json()).code).toBe('LOCAL_ORIGIN_REQUIRED');
      const ui = await fetch(`${apiBase}/health`, { headers: { Origin: 'http://localhost:5173' } });
      expect(ui.status).toBe(200);
      expect(ui.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
    } finally {
      await new Promise<void>((resolve) => apiServer.close(() => resolve()));
      store.close();
    }
  });
});
