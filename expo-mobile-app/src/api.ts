import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { ActionHistoryItem } from "../../shared/contracts/actionHistoryTypes";
import type { FindingsPacket } from "../../shared/contracts/findingsTypes";
import type { PIDatabaseSeed } from "../../shared/profile/seed";
export type StateEnvelope = {
  actionHistory?: ActionHistoryItem[];
  findings?: FindingsPacket;
  reviewJob?: { id: string; status: string } | null;
  version: number;
  state: PIDatabaseSeed;
  aiConsent: boolean;
  experimentalRecommendations?: boolean;
  snapshot?: any;
  recommendation?: any;
  analysis?: any;
};
export type BetaUser = { id: string; name: string; email: string };
const TOKEN_KEY = "vela.beta.session";
export async function readSession() {
  return Platform.OS === "web" ? null : SecureStore.getItemAsync(TOKEN_KEY);
}
export async function writeSession(token: string | null) {
  if (Platform.OS === "web") return;
  if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
}
export const drafts = {
  get: async (userId: string) => {
    if (Platform.OS === "web") return null;
    const raw = await SecureStore.getItemAsync(`vela.beta.draft.${userId}`);
    return raw ? JSON.parse(raw) : null;
  },
  set: async (userId: string, value: unknown) => {
    if (Platform.OS === "web") return;
    await SecureStore.setItemAsync(
      `vela.beta.draft.${userId}`,
      JSON.stringify(value),
    );
  },
  clear: async (userId: string) => {
    if (Platform.OS === "web") return;
    await SecureStore.deleteItemAsync(`vela.beta.draft.${userId}`);
  },
};
export class ApiError extends Error {
  constructor(message: string, public code: string, public status: number, public fields: Record<string, string> = {}) { super(message); }
}
export async function api<T = any>(
  base: string,
  path: string,
  token: string | null,
  method = "GET",
  data?: unknown,
): Promise<T> {
  if (!base.trim())
    throw new Error("Set the HTTPS server address before connecting.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(base.replace(/\/$/, "") + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(data === undefined ? {} : { body: JSON.stringify(data) }),
      signal: controller.signal,
    });
    const content = await response.text();
    let body;
    try {
      body = JSON.parse(content);
    } catch {
      if (response.status === 413) throw new Error("This statement is too large to upload.");
      throw new Error(`Vela server returned an unexpected response (${response.status}). Check the connection and try again. Your form is still here.`);
    }
    if (!response.ok)
      throw new ApiError(
        response.status >= 500 && body.error?.code !== "EMAIL_NOT_CONFIGURED"
          ? "The Vela server could not finish this request. Your input is still here; please try again."
          : body.error?.message || body.message || `Request failed (${response.status})`,
        body.error?.code || "REQUEST_FAILED", response.status, body.error?.fields || {},
      );
    return body;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError")
      throw new Error(
        "The server did not respond. Your form remains available; try again.",
      );
    if (error instanceof TypeError) throw new Error("Cannot reach the Vela server. Check your connection and server address, then try again.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function saveImportJob(userId: string, id: string | null) {
  if (Platform.OS === "web") return;
  const key = `vela.beta.importjob.${userId}`;
  if (id) await SecureStore.setItemAsync(key, id);
  else await SecureStore.deleteItemAsync(key);
}
export async function readImportJob(userId: string) {
  return Platform.OS === "web"
    ? null
    : SecureStore.getItemAsync(`vela.beta.importjob.${userId}`);
}
