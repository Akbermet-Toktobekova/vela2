import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  Platform,
  Alert,
  Switch,
  Share,
  Linking,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

import * as DocumentPicker from "expo-document-picker";

import { File } from "expo-file-system";
import { CurrencyField } from "./components/CurrencyField";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  GlassButton as Button,
  GlassCard,
  Field as Input,
  Icon,
  FloatingNavigation,
  AmbientBackground,
} from "./components/SoftGlass";
import { DateField } from "./components/DateField";
import { TodayScreen } from "./screens/TodayScreen";
import {
  api,
  readSession,
  writeSession,
  drafts,
  StateEnvelope,
  BetaUser,
  saveImportJob,
  readImportJob,
} from "./api";

type Editor = {
  collection: string;
  values: Record<string, string>;
  id?: string;
};

const now = () => new Date().toISOString();
const today = () => now().slice(0, 10);
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`;

const money = (v: any, c = "EUR") =>
  v == null ? "Unknown" : `${c} ${Number(v).toLocaleString()}`;

const steps = [
  "Welcome",
  "Profile",
  "Priorities & goals",
  "Accounts",
  "Income",
  "Commitments & debts",
  "Statements & review",
];

const fields: Record<string, string[]> = {
  accounts: [
    "name",
    "institution",
    "currency",
    "balance",
    "balanceDate",
    "fundsOwnership",
    "personalAvailableAmount",
    "purpose",
  ],
  incomes: [
    "name",
    "estimatedMonthlyAmount",
    "currency",
    "pattern",
    "frequency",
    "sourceType",
    "nextExpectedDate",
    "receivingAccountId",
  ],
  obligations: [
    "name",
    "amount",
    "currency",
    "dueDate",
    "recurrence",
    "category",
    "accountId",
    "status",
  ],
  debts: [
    "name",
    "debtType",
    "remainingBalance",
    "currency",
    "apr",
    "minimumPayment",
    "nextDueDate",
  ],
  goals: [
    "name",
    "targetAmount",
    "currency",
    "goalType",
    "targetDate",
    "priority",
  ],
  expenses: ["estimatedMonthlyAmount", "currency", "notes"],
};

const options: Record<string, string[]> = {
  fundsOwnership: [
    "personal",
    "mixed",
    "work_business",
    "held_for_others",
    "unknown",
  ],
  purpose: [
    "daily_spending",
    "receiving_income",
    "savings",
    "work_business",
    "mixed",
    "other",
    "not_sure",
  ],
  pattern: ["regular", "irregular", "mixed"],
  frequency: ["monthly", "biweekly", "weekly", "irregular"],
  sourceType: [
    "salary",
    "scholarship",
    "freelance",
    "part_time",
    "business",
    "other",
  ],
  recurrence: ["monthly", "weekly", "yearly", "one_time"],
  category: ["rent", "energy", "internet", "tuition", "insurance", "other"],
  status: ["unpaid", "paid"],
  debtType: [
    "credit_card",
    "student_loan",
    "personal_loan",
    "overdraft",
    "family_loan",
    "other",
  ],
  goalType: [
    "emergency_cushion",
    "specific_purchase",
    "debt_paydown",
    "general_savings",
  ],
  priority: ["high", "medium", "low"],
};

const numeric = [
  "balance",
  "personalAvailableAmount",
  "estimatedMonthlyAmount",
  "amount",
  "remainingBalance",
  "apr",
  "minimumPayment",
  "targetAmount",
];

const labels: Record<string, string> = {
  balanceDate: "Balance date (YYYY-MM-DD)",
  dueDate: "Due date (YYYY-MM-DD)",
  nextDueDate: "Next due date (YYYY-MM-DD)",
  nextExpectedDate: "Next expected date (YYYY-MM-DD)",
  targetDate: "Target date (YYYY-MM-DD)",
  estimatedMonthlyAmount: "Monthly amount (blank = unknown)",
  personalAvailableAmount: "Personal share (blank = unknown)",
  apr: "APR % (blank = unknown)",
  remainingBalance: "Outstanding balance (blank = unknown)",
  minimumPayment: "Minimum payment (blank = unknown)",
  receivingAccountId: "Receiving account",
  accountId: "Payment account",
};

function Select({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: { id: string; name: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <View style={{ gap: 7 }}>
      <Text style={s.label}>{label}</Text>
      <View style={s.chips}>
        {values.map((v) => (
          <TouchableOpacity
            key={v.id}
            accessibilityRole="button"
            accessibilityState={{ selected: value === v.id }}
            onPress={() => onChange(v.id)}
            style={[s.chip, value === v.id && { backgroundColor: "#386641" }]}
          >
            <Text
              style={{
                color: value === v.id ? "white" : "#386641",
                fontSize: 12,
              }}
            >
              {friendly[v.id] || v.name.replaceAll("_", " ")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  const [base, setBase] = useState(process.env.EXPO_PUBLIC_API_URL || "");
  const [baseDraft, setBaseDraft] = useState(base);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<BetaUser | null>(null);
  const [env, setEnv] = useState<StateEnvelope | null>(null);

  const [boot, setBoot] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [mode, setMode] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(!base);
  const [tab, setTab] = useState("Today");
  const [settings, setSettings] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [draft, setDraft] = useState<Editor | null>(null);
  const [importAccount, setImportAccount] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [importSource, setImportSource] = useState<any>(null);
  const [correctedCsv, setCorrectedCsv] = useState("");
  const [importJob, setImportJob] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [allocation, setAllocation] = useState<{
    goalId: string;
    accountId: string;
    amount: string;
  } | null>(null);
  const [adjust, setAdjust] = useState("");
  const [reviewTransaction, setReviewTransaction] = useState<any>(null);
  const [economicType, setEconomicType] = useState("unknown");
  const [category, setCategory] = useState("other");
  const [importHistory, setImportHistory] = useState<any[]>([]);
  const [chatRequestId, setChatRequestId] = useState(uid());
  const [showOnboarding, setShowOnboarding] = useState(false);

  const state = env?.state;
  const candidateAnalysis = env?.analysis || job?.result;
  const analysis =
    candidateAnalysis?.version === env?.version ? candidateAnalysis : undefined;
  const recommendation = env?.recommendation || analysis?.recommendation;
  const snapshot: any = env?.snapshot || analysis?.snapshot;
  const onboarding =
    !!state && (showOnboarding || state.onboarding.status !== "completed");
  const step = Math.min(7, state?.onboarding.currentStep || 1);

  const request = <T = any,>(path: string, method = "GET", data?: unknown) =>
    api<T>(base, path, token, method, data);

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function hydrate(session: string, address = base) {
    const me = await api<any>(address, "/auth/me", session);
    setUser(me.user);
    setEnv(await api<StateEnvelope>(address, "/state", session));
    setDraft(await drafts.get(me.user.id));
    setImportHistory(
      (await api<any>(address, "/imports", session)).imports || [],
    );
    const pending = await readImportJob(me.user.id);
    if (pending) {
      const job = await api<any>(address, "/jobs/" + pending, session);
      setImportJob(job);
      if (job.status === "completed") setPreview(job.result);
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        const address =
          process.env.EXPO_PUBLIC_API_URL ||
          (await AsyncStorage.getItem("vela.beta.api")) ||
          "";
        setBase(address);
        setBaseDraft(address);
        const session = await readSession();
        if (session && address) {
          setToken(session);
          await hydrate(session, address);
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Sign in to restore your account.",
        );
      } finally {
        setBoot(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (editor && user)
      void drafts
        .set(user.id, editor)
        .catch(() =>
          setError(
            "This form could not be saved securely on the device. Keep it open until saved to your account.",
          ),
        );
  }, [editor, user?.id]);

  useEffect(() => {
    if (tab === "Assistant" && token)
      void run(async () => {
        setMessages((await request("/chat")).messages || []);
      });
  }, [tab]);

  useEffect(() => {
    const automatic = env?.reviewJob;
    if (automatic && ["queued", "running"].includes(automatic.status)) {
      setJob((current: any) => current?.id === automatic.id ? current : automatic);
    }
  }, [env?.reviewJob?.id, env?.reviewJob?.status]);

  useEffect(() => {
    if (
      !job?.id ||
      ![
        "queued",
        "pending",
        "running",
        "processing",
        "QUEUED",
        "RUNNING",
        "PENDING",
      ].includes(job.status)
    )
      return;
    let stop = false;
    const timer = setInterval(() => {
      void request(`/jobs/${job.id}`)
        .then((r) => {
          if (stop) return;
          setJob(r);
          if (["completed", "COMPLETED", "succeeded"].includes(r.status))
            void request<StateEnvelope>("/state").then(setEnv);
        })
        .catch((e) => {
          if (!stop) {
            setError(e.message);
            setJob((j: any) => ({ ...j, status: "connection_lost" }));
          }
        });
    }, 2000);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, [job?.id, job?.status]);

  useEffect(() => {
    if (
      !importJob?.id ||
      ![
        "queued",
        "pending",
        "running",
        "processing",
        "QUEUED",
        "RUNNING",
        "PENDING",
      ].includes(importJob.status)
    )
      return;
    let stop = false;
    const timer = setInterval(() => {
      void request(`/jobs/${importJob.id}`)
        .then((r) => {
          if (stop) return;
          setImportJob(r);
          if (["completed", "COMPLETED", "succeeded"].includes(r.status))
            setPreview(r.result);
          if (["failed", "FAILED"].includes(r.status))
            setError(r.error?.message || r.error || "Import failed.");
        })
        .catch((e) => {
          if (!stop) {
            setError(e.message);
            setImportJob((j: any) => ({ ...j, status: "connection_lost" }));
          }
        });
    }, 1500);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, [importJob?.id, importJob?.status]);

  useEffect(() => {
    const apply = (url: string | null | undefined) => {
      if (!url) return;
      try {
        const reset = new URL(url).searchParams.get("token");
        if (reset) {
          setResetToken(reset);
          setMode("reset");
        }
      } catch {
        setError("The recovery link could not be opened.");
      }
    };
    void Linking.getInitialURL().then(apply);
    const subscription = Linking.addEventListener("url", (e) => apply(e.url));
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (user)
      void request("/imports")
        .then((r) => setImportHistory(r.imports || []))
        .catch(() => {});
  }, [user?.id, state?.statements.length]);

  useEffect(() => {
    if (user && importJob?.id)
      void saveImportJob(user.id, importJob.id).catch(() =>
        setError(
          "Could not save import progress on this device. The server continues processing.",
        ),
      );
  }, [user?.id, importJob?.id]);

  async function save(
    next: any,
    consent = env?.aiConsent || false,
    experimental = env?.experimentalRecommendations || false,
  ) {
    if (!env) throw new Error("Load your profile first.");
    const result = await request<StateEnvelope>("/state", "PUT", {
      expectedVersion: env.version,
      state: next,
      aiConsent: consent,
      experimentalRecommendations: experimental,
    });
    const fresh = await request<StateEnvelope>("/state");
    setEnv(fresh);
    return fresh;
  }

  async function feedback(action: string, amount?: number) {
    if (!recommendation || !env) return;
    await run(async () => {
      const result = await request("/feedback", "POST", {
        recommendationId: recommendation.id,
        action,
        adjustedAmount: amount,
        amount,
        expectedVersion: env.version,
        requestId: uid(),
      });
      setEnv(await request("/state"));
      setNotice(result.message || "Your response has been saved.");
    });
  }
  async function authenticate() {
    await run(async () => {
      if (mode === "forgot") {
        await request("/auth/forgot-password", "POST", { email });
        setNotice("If this account exists, a recovery link will be sent.");
        return;
      }
      if (mode === "reset") {
        await request("/auth/reset-password", "POST", {
          token: resetToken,
          password,
        });
        setPassword("");
        setMode("login");
        setNotice("Password changed. Sign in.");
        return;
      }
      const r = await request(`/auth/${mode}`, "POST", {
        name,
        email,
        password,
      });
      await writeSession(r.token);
      setToken(r.token);
      setPassword("");
      await hydrate(r.token);
    });
  }

  async function clearLocal() {
    await writeSession(null);
    if (user) {
      await drafts.clear(user.id);
      await saveImportJob(user.id, null);
    }
    setToken(null);
    setUser(null);
    setEnv(null);
    setMessages([]);
    setJob(null);
    setImportJob(null);
    setImportSource(null);
    setImportHistory([]);
    setEditor(null);
    setDraft(null);
    setPreview(null);
    setSettings(false);
    setDocumentsOpen(false);
    setPassword("");
  }

  function open(collection: string, item?: any) {
    if (!state) return;
    let defaults: Record<string, string> = {
      name: "",
      currency: state.profile.baseCurrency,
      balanceDate: today(),
      fundsOwnership: "personal",
      purpose: "daily_spending",
      pattern: "regular",
      frequency: "monthly",
      sourceType: "salary",
      nextExpectedDate: today(),
      receivingAccountId: state.accounts[0]?.id || "",
      accountId: state.accounts[0]?.id || "",
      dueDate: today(),
      recurrence: "monthly",
      category: "other",
      status: "unpaid",
      debtType: "credit_card",
      goalType: "emergency_cushion",
      priority: "medium",
    };
    if (collection === "expenses") item = state.expenseCommitment;
    if (item) {
      defaults = {
        ...defaults,
        ...Object.fromEntries(
          Object.entries(item).map(([k, v]) => [k, v == null ? "" : String(v)]),
        ),
      };
      if (collection === "accounts") {
        const balance = state.balances
          .filter((b) => b.accountId === item.id)
          .sort((a, b) => b.asOf.localeCompare(a.asOf))[0];
        defaults.balance = balance ? String(balance.amount) : "";
        defaults.balanceDate = balance?.asOf.slice(0, 10) || today();
        defaults.purpose = item.purposes[0];
      }
    }
    setEditor({ collection, id: item?.id, values: defaults });
  }

  async function submit() {
    if (!editor || !state || !user) return;
    await run(async () => {
      const next = JSON.parse(JSON.stringify(state));
      const record: any = {
        id: editor.id || uid(),
        userId: user.id,
        createdAt: now(),
        updatedAt: now(),
        notes: "",
      };
      for (const key of fields[editor.collection]) {
        const raw = editor.values[key]?.trim() || "";
        if (["name", "institution"].includes(key) && !raw)
          throw new Error(`${key} is required.`);
        if (numeric.includes(key)) {
          if (!raw && key === "amount")
            throw new Error("Bill amount is required.");
          if (raw && !/^-?\d+(?:[.,]\d+)?$/.test(raw))
            throw new Error(`${key}: enter a valid number.`);
          record[key] = raw ? Number(raw.replace(",", ".")) : null;
          if (raw && key !== "balance" && record[key] < 0)
            throw new Error(`${key} must not be negative.`);
        } else if (key.toLowerCase().includes("date")) {
          if (!raw && ["balanceDate", "dueDate"].includes(key))
            throw new Error("Date is required.");
          if (
            raw &&
            (!/^\d{4}-\d{2}-\d{2}$/.test(raw) ||
              Number.isNaN(Date.parse(raw)) ||
              new Date(raw).toISOString().slice(0, 10) !== raw)
          )
            throw new Error("Enter a valid date in YYYY-MM-DD format.");
          record[key] = raw || null;
        } else record[key] = raw;
      }

      if (editor.collection === "accounts") {
        record.purposes = [record.purpose];
        delete record.purpose;
        record.isPrimary =
          next.accounts.find((a: any) => a.id === record.id)?.isPrimary ||
          next.accounts.length === 0;
        if (record.balance != null)
          next.balances.push({
            id: uid(),
            accountId: record.id,
            amount: record.balance,
            currency: record.currency,
            asOf: record.balanceDate,
            sourceType: "user_reported",
            createdAt: now(),
          });
        delete record.balance;
        delete record.balanceDate;
      }

      if (editor.collection === "debts") record.paymentFrequency = "monthly";
      if (editor.collection === "incomes")
        record.receivingAccountId = record.receivingAccountId || null;
      if (editor.collection === "obligations")
        record.accountId = record.accountId || null;

      if (editor.collection === "expenses") next.expenseCommitment = record;
      else {
        const rows = next[editor.collection];
        const index = rows.findIndex((r: any) => r.id === record.id);
        if (index < 0) rows.push(record);
        else rows[index] = { ...rows[index], ...record };
      }
      await save(next);
      await drafts.clear(user.id);
      setEditor(null);
      setDraft(null);
      setNotice("Saved to your account.");
    });
  }

  function remove(collection: string, item: any) {
    Alert.alert(
      "Delete record?",
      `Remove ${item.name}? Related records may require review.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            void run(async () => {
              if (!state) return;
              const next: any = {
                ...state,
                [collection]: (state as any)[collection].filter(
                  (r: any) => r.id !== item.id,
                ),
              };
              if (collection === "accounts")
                next.balances = state.balances.filter(
                  (b) => b.accountId !== item.id,
                );
              await save(next);
            }),
        },
      ],
    );
  }

  async function changeStep(value: number) {
    if (!state) return;
    await run(async () => {
      await save({
        ...state,
        onboarding: {
          ...state.onboarding,
          currentStep: Math.min(7, value),
          completedSteps: [
            ...new Set([...state.onboarding.completedSteps, step]),
          ],
          status: value > 7 ? "completed" : state.onboarding.status,
          completedAt: value > 7 ? now() : state.onboarding.completedAt,
        },
      });
      if (value > 7) setShowOnboarding(false);
    });
  }

  async function upload() {
    await run(async () => {
      if (!state?.accounts.length) throw new Error("Add an account first.");
      let file: { name: string; size?: number; uri: string; base64?: string; mimeType?: string };
      let pickedFile: File | undefined;
      if (Platform.OS === "android") {
        // Read directly under the Android picker grant instead of a legacy cache path.
        const result = await File.pickFileAsync({ mimeTypes: ["*/*"] });
        if (result.canceled) return;
        pickedFile = result.result;
        file = { name: pickedFile.name, size: pickedFile.size, uri: pickedFile.uri, mimeType: pickedFile.type };
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*",
          copyToCacheDirectory: true,
          base64: true,
        });
        if (result.canceled) return;
        file = result.assets[0];
      }
      if (file.size && file.size > 18 * 1024 * 1024) throw new Error("Choose a statement smaller than 18 MB.");
      let contentBase64: string;
      try {
        const inline = file.base64 || (file.uri.startsWith("data:") ? file.uri.split(",", 2)[1] : undefined);
        contentBase64 = inline || await (pickedFile ?? new File(file.uri)).base64();
        if (!contentBase64) throw new Error("Empty file");
      } catch {
        throw new Error("Could not read this statement. Download it to Files or Downloads and select it again.");
      }
      // Android content providers can expose an opaque URI segment instead of a filename.
      const name = file.name.trim();
      const hasSupportedExtension = /\.(csv|xlsx?|pdf)$/i.test(name);
      const extensionByMime: Readonly<Record<string, string | undefined>> = {
        "text/csv": "csv",
        "application/vnd.ms-excel": "xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
      };
      // The base64 prefix matches the five-byte PDF signature "%PDF-".
      const extension = /^JVBERi[0-3]/.test(contentBase64)
        ? "pdf"
        : extensionByMime[file.mimeType ?? ""];
      const fileName = extension === "pdf" && !/\.pdf$/i.test(name)
        ? "statement.pdf"
        : hasSupportedExtension
          ? name
          : extension && `statement.${extension}`;
      if (!fileName) throw new Error("Choose a CSV, Excel or PDF statement.");
      const source = {
        accountId: importAccount || state.accounts[0].id,
        fileName,
        contentBase64,
      };
      setImportSource(source);
      setCorrectedCsv("");
      setPreview(null);
      setImportJob(await request("/imports", "POST", source));
    });
  }

  const section = (collection: string, title: string) => (
    <View style={s.card}>
      <Text style={s.h2}>{title}</Text>
      <Button
        secondary
        disabled={busy}
        title="+ Add"
        onPress={() => open(collection)}
      />
      {((state as any)?.[collection] || []).map((r: any) => (
        <View key={r.id} style={s.record}>
          <Text style={s.h2}>{r.name}</Text>
          <Text style={s.muted}>
            {collection === "accounts"
              ? `${r.currency} · ${r.fundsOwnership.replaceAll("_", " ")}`
              : money(
                  r.amount ??
                    r.estimatedMonthlyAmount ??
                    r.remainingBalance ??
                    r.targetAmount,
                  r.currency,
                )}
          </Text>
          {collection === "accounts" && (
            <Text>
              {money(
                [...state!.balances]
                  .filter((b) => b.accountId === r.id)
                  .sort((a, b) => b.asOf.localeCompare(a.asOf))[0]?.amount,
                r.currency,
              )}
            </Text>
          )}
          <View style={s.row}>
            <Button
              secondary
              disabled={busy}
              title="Edit"
              onPress={() => open(collection, r)}
            />
            <Button
              secondary
              disabled={busy}
              title="Delete"
              onPress={() => remove(collection, r)}
            />
            {collection === "accounts" && !r.isPrimary && (
              <Button
                secondary
                title="Make primary"
                onPress={() =>
                  void run(async () => {
                    await save({
                      ...state,
                      accounts: state!.accounts.map((a) => ({
                        ...a,
                        isPrimary: a.id === r.id,
                      })),
                    });
                  })
                }
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const consent = () => (
    <View style={s.card}>
      <Text style={s.h2}>Your privacy & preferences</Text>
      <Text style={s.muted}>
        Allow a minimized financial context to be sent to the configured AI
        provider for analysis and chat. Original statement files are not sent as
        whole documents. You can switch this off at any time.
      </Text>
      <View style={s.row}>
        <Text>Allow AI processing</Text>
        <Switch
          disabled={busy}
          value={env?.aiConsent || false}
          onValueChange={(v) =>
            void run(async () => {
              await save(state, v);
            })
          }
        />
      </View>
      <View style={s.divider} />
      <Text style={s.h2}>Experimental recommendations</Text>
      <Text style={s.muted}>
        Enable one suggested next step based on preliminary financial policies.
        Vela checks your data and affordability before publishing. Accepting a
        step saves your intention. Completion is confirmed separately.
      </Text>
      <View style={s.row}>
        <Text style={s.body}>Enable experimental beta</Text>
        <Switch
          disabled={busy}
          value={env?.experimentalRecommendations || false}
          onValueChange={(v) =>
            void run(async () => {
              await save(state, env?.aiConsent || false, v);
            })
          }
        />
      </View>
    </View>
  );

  const imports = () => (
    <View style={s.card}>
      <Text style={s.h2}>Statements</Text>
      <Text style={s.muted}>
        CSV, Excel and text PDF. Review operations before confirming. Scanned
        PDF is not supported.
      </Text>
      {state?.accounts.length ? (
        <Select
          label="Target account"
          value={importAccount || state.accounts[0].id}
          values={state.accounts}
          onChange={setImportAccount}
        />
      ) : (
        <Text>Add an account first.</Text>
      )}
      <Button
        title="Choose statement"
        disabled={busy || !state?.accounts.length}
        onPress={() => void upload()}
      />
      {importJob && <Text style={s.muted}>Import: {importJob.status}</Text>}
      {preview && (
        <>
          <Text style={s.h2}>
            {preview.statement?.fileName || "Import preview"}
          </Text>
          <Text>{preview.status || preview.statement?.status}</Text>
          {!importSource &&
            ["needs_mapping", "needs_sheet_selection"].includes(
              preview.status,
            ) && (
              <Text style={s.muted}>
                Select the original file again to choose a sheet or correct the
                extracted data. The saved preview remains available.
              </Text>
            )}
          {preview.sheetNames?.map((sheetName: string) => (
            <Button
              key={sheetName}
              secondary
              title={`Use sheet: ${sheetName}`}
              disabled={busy || !importSource}
              onPress={() =>
                void run(async () => {
                  setPreview(null);
                  setImportJob(
                    await request("/imports", "POST", {
                      ...importSource,
                      sheetName,
                    }),
                  );
                })
              }
            />
          ))}
          {preview.status === "needs_mapping" && (
            <>
              <Text style={s.muted}>
                Review extracted lines and enter corrected CSV with
                Date,Description,Amount,Currency headers. Confirm only values
                verified in the original.
              </Text>
              <Text style={s.small}>
                {(preview.sourceLines || [])
                  .map((r: any) =>
                    typeof r === "string"
                      ? r
                      : "Page " + r.page + ", line " + r.line + ": " + r.text,
                  )
                  .join("\n")}
              </Text>
              <TextInput
                accessibilityLabel="Corrected CSV"
                multiline
                style={[s.input, { minHeight: 180 }]}
                value={correctedCsv}
                onChangeText={setCorrectedCsv}
              />
              <Button
                secondary
                title="Preview corrected CSV"
                disabled={busy || !correctedCsv.trim() || !importSource}
                onPress={() =>
                  void run(async () => {
                    setPreview(null);
                    setImportJob(
                      await request("/imports", "POST", {
                        ...importSource,
                        correctedCsv,
                      }),
                    );
                  })
                }
              />
            </>
          )}
          {preview.statement?.errorMessage && (
            <Text style={s.error}>{preview.statement.errorMessage}</Text>
          )}
          <Text>
            {preview.transactions?.length || 0} operations ·{" "}
            {preview.statement?.duplicateCountSkipped || 0} duplicates
          </Text>
          {preview.transactions?.map((t: any) => (
            <View key={t.id} style={s.record}>
              <Text>
                {t.date} · {t.description}
              </Text>
              <Text>{money(t.amount, t.currency)}</Text>
              <Text style={s.small}>
                {Object.entries(t.rawRow || {})
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(" · ")}
              </Text>
            </View>
          ))}
          {preview.rejectedRows?.map((r: any, i: number) => (
            <Text key={i} style={s.error}>
              Row {r.rowNumber ?? i + 1}:{" "}
              {r.reason || r.message || "Review required"}
            </Text>
          ))}
          <Button
            title="Confirm import"
            disabled={busy || !preview.transactions?.length}
            onPress={() =>
              void run(async () => {
                await request(`/imports/${preview.id}/confirm`, "POST", {
                  expectedVersion: env?.version,
                });
                setEnv(await request("/state"));
                setPreview(null);
                setNotice("Import confirmed.");
              })
            }
          />
          <Button
            secondary
            title="Dismiss preview"
            onPress={() => setPreview(null)}
          />
        </>
      )}
      {state?.statements.map((st) => (
        <View key={st.id} style={s.record}>
          <Text>{st.fileName}</Text>
          <Text style={s.muted}>
            {st.transactionCount} operations · {st.status.replaceAll("_", " ")}
          </Text>
          {importHistory.find((i) => i.statement?.id === st.id) && (
            <Button
              secondary
              title="Delete statement and its operations"
              disabled={busy}
              onPress={() =>
                Alert.alert(
                  "Delete statement?",
                  "This removes its operations and statement balance. Other data will be kept and analysis refreshed.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () =>
                        void run(async () => {
                          const item = importHistory.find(
                            (i) => i.statement?.id === st.id,
                          );
                          await request(`/imports/${item.id}`, "DELETE", {
                            expectedVersion: env?.version,
                          });
                          setEnv(await request("/state"));
                        }),
                    },
                  ],
                )
              }
            />
          )}
        </View>
      ))}
    </View>
  );

  if (boot)
    return (
      <SafeAreaProvider>
        <SafeAreaView style={s.loading}>
          <ActivityIndicator color="#386641" />
          <Text>Restoring your account…</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#f6f7f3", "#e4e7e0", "#f9f9f6"]} style={s.root}>
        <AmbientBackground />
        <SafeAreaView style={s.root}>
          <KeyboardAvoidingView
            style={s.root}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={s.header}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 11 }}
              >
                <View style={s.brandIcon}>
                  <Icon name="leaf" size={24} />
                </View>
                <Text style={s.brand}>Vela</Text>
              </View>
              {user && (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={
                    settings ? "Close settings" : "Open settings"
                  }
                  style={s.settingsButton}
                  onPress={() => setSettings((v) => !v)}
                >
                  <Icon name="settings" size={23} />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={s.content}
            >
              {busy && <ActivityIndicator color="#386641" />}
              {error ? (
                <View style={s.errorCard}>
                  <Text accessibilityRole="alert" style={s.error}>
                    {error}
                  </Text>
                  {user && (
                    <Button
                      secondary
                      title="Reload saved profile"
                      onPress={() =>
                        void run(async () => {
                          setEnv(await request("/state"));
                        })
                      }
                    />
                  )}
                </View>
              ) : null}
              {notice ? <Text style={s.notice}>{notice}</Text> : null}

              {!user ? (
                <>
                  <Text style={s.h1}>
                    {mode === "register"
                      ? "Your money, one step at a time."
                      : mode === "login"
                        ? "Welcome back."
                        : mode === "forgot"
                          ? "Recover your account."
                          : "Choose a new password."}
                  </Text>
                  <Text style={s.muted}>
                    Your private financial picture, saved to your account.
                  </Text>
                  <View style={s.card}>
                    {mode === "register" && (
                      <Input label="Name" value={name} onChange={setName} />
                    )}
                    {mode !== "reset" && (
                      <Input label="Email" value={email} onChange={setEmail} />
                    )}
                    {mode !== "forgot" && (
                      <Input
                        label="Password (at least 12 characters)"
                        value={password}
                        onChange={setPassword}
                        secure
                      />
                    )}
                    {mode === "reset" && (
                      <Input
                        label="Recovery link token"
                        value={resetToken}
                        onChange={setResetToken}
                      />
                    )}
                    <Button
                      disabled={busy || !base}
                      title={
                        mode === "register"
                          ? "Create account"
                          : mode === "login"
                            ? "Sign in"
                            : mode === "forgot"
                              ? "Send recovery link"
                              : "Save new password"
                      }
                      onPress={() => void authenticate()}
                    />
                    <Button
                      secondary
                      title={
                        mode === "register"
                          ? "Already have an account? Sign in"
                          : "Create a new account"
                      }
                      onPress={() => {
                        setMode(mode === "register" ? "login" : "register");
                        setError("");
                      }}
                    />
                    {mode === "login" && (
                      <>
                        <Button
                          secondary
                          title="Forgot password?"
                          onPress={() => setMode("forgot")}
                        />
                        <Button
                          secondary
                          title="I have a recovery link"
                          onPress={() => setMode("reset")}
                        />
                      </>
                    )}
                  </View>
                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => setConnectionOpen((v) => !v)}
                  >
                    <Text style={s.serviceLink}>
                      {connectionOpen
                        ? "Hide connection settings"
                        : "Connection settings"}
                    </Text>
                  </TouchableOpacity>
                  {connectionOpen && (
                    <View style={s.card}>
                      <Text style={s.h2}>Connection</Text>
                      <Text style={s.muted}>
                        {base
                          ? "Server address configured."
                          : "Ask the host for the HTTPS API address. A localhost address does not work from another phone."}
                      </Text>
                      <Input
                        label="Server address"
                        value={baseDraft}
                        onChange={setBaseDraft}
                      />
                      <Button
                        secondary
                        title="Save server address"
                        onPress={() =>
                          void run(async () => {
                            const url = new URL(baseDraft);
                            if (!["https:", "http:"].includes(url.protocol))
                              throw new Error("Use an HTTPS server address.");
                            if (
                              url.protocol !== "https:" &&
                              !["localhost", "127.0.0.1"].includes(url.hostname)
                            )
                              throw new Error(
                                "Remote connections require HTTPS.",
                              );
                            setBase(baseDraft.replace(/\/$/, ""));
                            await AsyncStorage.setItem(
                              "vela.beta.api",
                              baseDraft.replace(/\/$/, ""),
                            );
                            setNotice("Server address saved.");
                            setConnectionOpen(false);
                          })
                        }
                      />
                    </View>
                  )}
                </>
              ) : null}

              {user && !state && (
                <Button
                  title="Load profile"
                  disabled={busy}
                  onPress={() =>
                    void run(async () => {
                      await hydrate(token!);
                    })
                  }
                />
              )}

              {user && state && settings ? (
                <>
                  <Text style={s.h1}>Your account</Text>
                  <Text>
                    {user.name} · {user.email}
                  </Text>
                  {consent()}
                  <Button
                    secondary
                    title="Continue onboarding"
                    onPress={() => {
                      setShowOnboarding(true);
                      setSettings(false);
                    }}
                  />
                  <Button
                    secondary
                    title="Export my data"
                    disabled={busy}
                    onPress={() =>
                      void run(async () => {
                        const data = await request("/export");
                        await Share.share({
                          message: JSON.stringify(data, null, 2),
                          title: "Vela export",
                        });
                      })
                    }
                  />
                  <Button
                    secondary
                    title="Refresh account"
                    onPress={() =>
                      void run(async () => {
                        await hydrate(token!);
                      })
                    }
                  />
                  <Button
                    secondary
                    title="Sign out"
                    disabled={busy}
                    onPress={() =>
                      void run(async () => {
                        await request("/auth/logout", "POST");
                        await clearLocal();
                      })
                    }
                  />
                  <Button
                    secondary
                    title="Delete my account"
                    disabled={busy}
                    onPress={() =>
                      Alert.alert(
                        "Delete your account?",
                        "This permanently deletes your account and financial data. Export first if you need a copy.",
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Delete account",
                            style: "destructive",
                            onPress: () =>
                              void run(async () => {
                                await request("/account", "DELETE");
                                await clearLocal();
                              }),
                          },
                        ],
                      )
                    }
                  />
                </>
              ) : null}

              {user && state && !settings && onboarding ? (
                <>
                  <GlassCard>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
                      <View style={s.brandIcon}><Icon name={step === 7 ? "statement" : "leaf"} size={23} /></View>
                      <View style={{flex: 1, gap: 4}}>
                        <Text style={s.small}>YOUR SETUP · STEP {step} OF 7</Text>
                        <Text accessibilityRole="header" style={s.h1}>{steps[step - 1]}</Text>
                      </View>
                    </View>
                  </GlassCard>
                  <View style={s.progress}>
                    {steps.map((_, i) => (
                      <View
                        key={i}
                        style={[
                          s.segment,
                          i < step && { backgroundColor: "#386641" },
                        ]}
                      />
                    ))}
                  </View>
                  {step === 1 && (
                    <View style={s.card}>
                      <Text style={s.h2}>Hello, {user.name}.</Text>
                      <Text style={s.muted}>
                        Build your financial picture at your own pace. Leave
                        unknown amounts blank. Progress is saved after every
                        step.
                      </Text>
                    </View>
                  )}
                  {step === 2 && (
                    <View style={s.card}>
                      <Text style={s.h2}>{state.profile.nickname}</Text>
                      <Text>{user.email}</Text>
                      <CurrencyField
                        label="Planning currency"
                        value={state.profile.baseCurrency}
                        onChange={(v) =>
                          void run(async () => {
                            await save({
                              ...state,
                              profile: {
                                ...state.profile,
                                baseCurrency: v,
                                updatedAt: now(),
                              },
                            });
                          })
                        }
                      />
                    </View>
                  )}
                  {step === 3 && (
                    <>
                      <View style={s.card}>
                        <Select
                          label="What matters most?"
                          value={state.preferences.primaryConcern || "not_sure"}
                          values={[
                            "save_more",
                            "debt",
                            "spending_visibility",
                            "payday_short",
                            "specific_goal",
                            "not_sure",
                          ].map((id) => ({ id, name: id }))}
                          onChange={(v) =>
                            void run(async () => {
                              await save({
                                ...state,
                                preferences: {
                                  ...state.preferences,
                                  primaryConcern: v,
                                  updatedAt: now(),
                                },
                              });
                            })
                          }
                        />
                      </View>
                      {section("accounts", "Your accounts")}
                      {section("obligations", "Upcoming bills")}
                      {section("goals", "Your goals")}
                    </>
                  )}
                  {step === 4 && section("accounts", "Your accounts")}
                  {step === 5 && section("incomes", "Money coming in")}
                  {step === 6 && (
                    <>
                      <View style={s.card}>
                        <Text style={s.h2}>Essential monthly expenses</Text>
                        <Text>
                          {money(
                            state.expenseCommitment?.estimatedMonthlyAmount,
                            state.expenseCommitment?.currency,
                          )}
                        </Text>
                        <Button
                          secondary
                          title="Edit monthly estimate"
                          onPress={() => open("expenses")}
                        />
                      </View>
                      {section("obligations", "Upcoming bills")}
                      <View style={s.card}>
                        <Select
                          label="Do you currently owe money?"
                          value={
                            state.onboarding.debtQuestionAnswer || "not_sure"
                          }
                          values={["no", "yes", "not_sure"].map((id) => ({
                            id,
                            name: id,
                          }))}
                          onChange={(v) =>
                            void run(async () => {
                              await save({
                                ...state,
                                onboarding: {
                                  ...state.onboarding,
                                  debtQuestionAnswer: v,
                                },
                              });
                            })
                          }
                        />
                      </View>
                      {section("debts", "Your debts")}
                    </>
                  )}
                  {step === 7 && (
                    <>
                      {imports()}
                      {consent()}
                      <View style={s.card}>
                        <Text style={s.h2}>Ready to review</Text>
                        <Text>
                          {state.accounts.length} accounts ·{" "}
                          {state.incomes.length} income sources ·{" "}
                          {state.transactions.length} operations
                        </Text>
                        <Text style={s.muted}>
                          Missing information can be added later. Vela will
                          explain what is still needed.
                        </Text>
                      </View>
                    </>
                  )}
                  <View style={s.row}>
                    {step > 1 && (
                      <Button
                        secondary
                        disabled={busy}
                        title="Back"
                        onPress={() => void changeStep(step - 1)}
                      />
                    )}
                    <Button
                      disabled={busy}
                      title={step === 7 ? "Open Today" : "Save & continue"}
                      onPress={() => void changeStep(step + 1)}
                    />
                  </View>
                  <Button
                    secondary
                    title="View dashboard"
                    disabled={busy}
                    onPress={() =>
                      void run(async () => {
                        await save({
                          ...state,
                          onboarding: {
                            ...state.onboarding,
                            status: "completed",
                            completedAt: now(),
                          },
                        });
                        setShowOnboarding(false);
                      })
                    }
                  />
                </>
              ) : null}

              {user &&
              state &&
              !settings &&
              !onboarding &&
              !documentsOpen &&
              tab === "Today" ? (
                <TodayScreen
                  snapshot={snapshot}
                  recommendation={recommendation}
                  analysis={analysis}
                  job={job}
                  busy={busy}
                  experimental={env.experimentalRecommendations || false}
                  onReview={() =>
                    void run(async () => {
                      setJob(await request("/review", "POST", { forceRefresh: true, requestId: uid() }));
                    })
                  }
                  onFeedback={(action, amount) => void feedback(action, amount)}
                  onExplain={() => {
                    setQuestion(
                      "Why was this step selected, and what facts support it?",
                    );
                    setTab("Assistant");
                  }}
                  onOpen={open}
                  onUpload={() => setDocumentsOpen(true)}
                  onManage={() => setTab("My Plan")}
                />
              ) : null}
              {user && state && !settings && !onboarding && documentsOpen ? (
                <>
                  <Button
                    secondary
                    title="← Back to Today"
                    onPress={() => setDocumentsOpen(false)}
                  />
                  <Text style={s.h1}>Your statements</Text>
                  {imports()}
                </>
              ) : null}
              {user &&
              state &&
              !settings &&
              !onboarding &&
              !documentsOpen &&
              tab === "My Plan" ? (
                <>
                  <Text style={s.eyebrow}>YOUR FINANCIAL PICTURE</Text>
                  <Text style={s.h1}>A plan that moves with you.</Text>
                  <Text style={s.muted}>
                    Your goals, commitments and accepted next steps.
                  </Text>
                  <Button
                    secondary
                    title="Manage statements"
                    onPress={() => setDocumentsOpen(true)}
                  />
                  {section("accounts", "Your accounts")}
                  {section("obligations", "Upcoming bills")}
                  {section("goals", "Your goals")}
                  {state.recommendations?.length > 0 && (
                    <View style={s.card}>
                      <Text style={s.h2}>Action history</Text>
                      {state.recommendations.map((r) => (
                        <View key={r.id} style={s.record}>
                          <Text style={s.h2}>{r.title}</Text>
                          <Text style={s.muted}>
                            {r.status.replaceAll("_", " ")} ·{" "}
                            {r.updatedAt.slice(0, 10)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  <View style={s.card}>
                    <Text style={s.muted}>
                      You can create and track goals. Suggested goal funding
                      appears on Today when experimental recommendations are
                      enabled and the financial checks pass.
                    </Text>
                  </View>
                  <View style={s.card}>
                    <Text style={s.h2}>Imported operations</Text>
                    <Text style={s.muted}>
                      Confirm the economic meaning of each operation. Internal
                      transfers are not new income.
                    </Text>
                    {state.transactions.map((t) => (
                      <TouchableOpacity
                        key={t.id}
                        style={s.record}
                        onPress={() => {
                          const c = state.classifications.find(
                            (c) => c.transactionId === t.id,
                          );
                          setReviewTransaction(t);
                          setEconomicType(c?.economicType || "unknown");
                          setCategory(c?.category || "other");
                        }}
                      >
                        <Text>
                          {t.date} · {t.description}
                        </Text>
                        <Text>{money(t.amount, t.currency)}</Text>
                        <Text style={s.small}>
                          {state.classifications.find(
                            (c) => c.transactionId === t.id,
                          )?.economicType || "unknown"}{" "}
                          · Tap to review
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {section("debts", "Debts")}
                  {section("incomes", "Income")}
                  <View style={s.card}>
                    <Text style={s.h2}>Essential expenses</Text>
                    <Text>
                      {money(
                        state.expenseCommitment?.estimatedMonthlyAmount,
                        state.expenseCommitment?.currency,
                      )}
                    </Text>
                    <Button
                      secondary
                      title="Edit estimate"
                      onPress={() => open("expenses")}
                    />
                  </View>
                </>
              ) : null}

              {user &&
              state &&
              !settings &&
              !onboarding &&
              !documentsOpen &&
              tab === "Assistant" ? (
                <>
                  <View style={s.assistantHeading}>
                    <View style={s.brandIcon}>
                      <Icon name="chat" />
                    </View>
                    <View>
                      <Text style={s.h1}>Ask Vela.</Text>
                      <Text style={s.small}>YOUR FINANCIAL GUIDE</Text>
                    </View>
                  </View>
                  <Text style={s.muted}>
                    Answers use your saved financial picture. Financial changes
                    require separate confirmation.
                  </Text>
                  {!env.aiConsent && consent()}
                  {messages.map((m, i) => (
                    <View
                      key={m.id || i}
                      style={[
                        s.card,
                        m.role === "user" ? s.userBubble : s.assistantBubble,
                      ]}
                    >
                      <Text style={s.small}>
                        {m.role === "user" ? "You" : "Vela"}
                      </Text>
                      <Text style={s.body}>{m.content || m.text}</Text>
                    </View>
                  ))}
                  <Input
                    label="Your question"
                    value={question}
                    onChange={setQuestion}
                  />
                  <Button
                    title="Send message"
                    disabled={busy || !question.trim() || !env.aiConsent}
                    onPress={() =>
                      void run(async () => {
                        const r = await request("/chat", "POST", {
                          message: question,
                          requestId: chatRequestId,
                        });
                        setMessages(r.messages || []);
                        setQuestion("");
                        setChatRequestId(uid());
                        if (r.status === "PROVIDER_UNAVAILABLE")
                          setError(
                            "The AI provider is unavailable. This is not a completed model response.",
                          );
                      })
                    }
                  />
                </>
              ) : null}

              {draft && !editor && user && (
                <View style={s.card}>
                  <Text style={s.h2}>Unsaved form available</Text>
                  <Button
                    secondary
                    title="Restore form"
                    onPress={() => setEditor(draft)}
                  />
                  <Button
                    secondary
                    title="Discard draft"
                    onPress={() =>
                      void run(async () => {
                        await drafts.clear(user.id);
                        setDraft(null);
                      })
                    }
                  />
                </View>
              )}
            </ScrollView>
            {user && !onboarding && !settings && (
              <FloatingNavigation
                active={tab}
                onChange={(value) => {
                  setDocumentsOpen(false);
                  setTab(value);
                }}
              />
            )}
            {reviewTransaction && (
              <View style={s.overlay}>
                <SafeAreaView style={s.sheet}>
                  <ScrollView contentContainerStyle={{ padding: 22, gap: 16 }}>
                    <Text style={s.h1}>Review operation</Text>
                    <Text>
                      {reviewTransaction.date} · {reviewTransaction.description}
                    </Text>
                    <Text>
                      {money(
                        reviewTransaction.amount,
                        reviewTransaction.currency,
                      )}
                    </Text>
                    <Text style={s.small}>
                      {Object.entries(reviewTransaction.rawRow || {})
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" · ")}
                    </Text>
                    <Select
                      label="Economic type"
                      value={economicType}
                      values={[
                        "income",
                        "expense",
                        "internal_transfer",
                        "external_transfer",
                        "debt_payment",
                        "interest_fee",
                        "refund",
                        "cash_withdrawal",
                        "savings_allocation",
                        "work_business_movement",
                        "unknown",
                      ].map((id) => ({ id, name: id }))}
                      onChange={setEconomicType}
                    />
                    <Select
                      label="Category"
                      value={category}
                      values={[
                        "rent_housing",
                        "utilities_energy",
                        "internet_telecom",
                        "groceries_food",
                        "dining_coffee",
                        "transport",
                        "subscriptions",
                        "shopping",
                        "health",
                        "education",
                        "work_expense",
                        "income",
                        "transfer",
                        "other",
                      ].map((id) => ({ id, name: id }))}
                      onChange={setCategory}
                    />
                    {error && <Text style={s.error}>{error}</Text>}
                    <Button
                      title="Confirm classification"
                      disabled={busy}
                      onPress={() =>
                        void run(async () => {
                          await request(
                            `/transactions/${reviewTransaction.id}/classify`,
                            "POST",
                            {
                              expectedVersion: env?.version,
                              economicType,
                              category,
                            },
                          );
                          setEnv(await request("/state"));
                          setReviewTransaction(null);
                        })
                      }
                    />
                    <Button
                      secondary
                      title="Close"
                      onPress={() => setReviewTransaction(null)}
                    />
                  </ScrollView>
                </SafeAreaView>
              </View>
            )}

            {editor && (
              <Modal animationType="slide" presentationStyle="fullScreen" onRequestClose={() => {setDraft(editor); setEditor(null);}}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#f4f6f1'}}>
                  <AmbientBackground />
                  <KeyboardAvoidingView style={s.sheet} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{flexDirection: 'row', padding: 16, justifyContent: 'space-between'}}>
                      <Button secondary title="Back" onPress={() => {Keyboard.dismiss(); setDraft(editor); setEditor(null);}} />
                      <Button disabled={busy} title={busy ? "Saving…" : "Save"} onPress={() => void submit()} />
                    </View>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ padding: 22, paddingBottom: 44, gap: 16 }}
                  >
                    <Text style={s.h1}>
                      {editor.id ? "Edit" : "Add"}{" "}
                      {collectionNames[editor.collection] || editor.collection}
                    </Text>
                    <Text style={s.muted}>
                      Leave an amount blank when you do not know it yet.
                    </Text>
                    {fields[editor.collection].map((key) => {
                      const list =
                        key.endsWith("AccountId") || key === "accountId"
                          ? state?.accounts.map((a) => ({
                              id: a.id,
                              name: a.name,
                            }))
                          : options[key]?.map((id) => ({ id, name: id }));
                      return key === "currency" ? (
                        <CurrencyField key={key} label="Currency" value={editor.values[key] || ""} onChange={v => setEditor({...editor, values:{...editor.values, [key]:v}})} />
                      ) : list ? (
                        <Select
                          key={key}
                          label={labels[key] || key.replace(/([A-Z])/g, " $1")}
                          value={editor.values[key] || ""}
                          values={list}
                          onChange={(v) =>
                            setEditor({
                              ...editor,
                              values: { ...editor.values, [key]: v },
                            })
                          }
                        />
                      ) : key.toLowerCase().includes("date") ? (
                        <DateField
                          key={key}
                          label={(labels[key] || key).replace(
                            " (YYYY-MM-DD)",
                            "",
                          )}
                          value={editor.values[key] || ""}
                          onChange={(v) =>
                            setEditor({
                              ...editor,
                              values: { ...editor.values, [key]: v },
                            })
                          }
                        />
                      ) : (
                        <Input
                          key={key}
                          label={labels[key] || key.replace(/([A-Z])/g, " $1")}
                          value={editor.values[key] || ""}
                          onChange={(v) =>
                            setEditor({
                              ...editor,
                              values: { ...editor.values, [key]: v },
                            })
                          }
                        />
                      );
                    })}
                    {error && (
                      <Text accessibilityRole="alert" style={s.error}>
                        {error}
                      </Text>
                    )}
                    <Button
                      title={busy ? "Saving…" : "Save to my account"}
                      disabled={busy}
                      onPress={() => void submit()}
                    />
                    <Button
                      secondary
                      title="Close and keep draft"
                      onPress={() => {
                        setDraft(editor);
                        setEditor(null);
                      }}
                    />
                  </ScrollView>
                  </KeyboardAvoidingView>
                </SafeAreaView>
              </Modal>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const collectionNames: Record<string, string> = {
  accounts: "account",
  incomes: "income source",
  obligations: "upcoming bill",
  debts: "debt",
  goals: "goal",
  expenses: "monthly expenses",
};
const friendly: Record<string, string> = {
  save_more: "Build my savings",
  debt: "Manage my debt",
  spending_visibility: "Understand my spending",
  payday_short: "Feel ready for payday",
  specific_goal: "Save for something specific",
  not_sure: "I am not sure yet",
  no: "No",
  yes: "Yes",
  personal: "Personal money",
  mixed: "Personal and work",
  work_business: "Work or business",
  held_for_others: "Held for someone else",
  unknown: "Not sure yet",
  daily_spending: "Everyday spending",
  receiving_income: "Receiving income",
  savings: "Savings",
  other: "Other",
  regular: "Regular",
  irregular: "Varies",
  monthly: "Monthly",
  biweekly: "Every two weeks",
  weekly: "Weekly",
  yearly: "Yearly",
  one_time: "One time",
  salary: "Salary",
  scholarship: "Scholarship",
  freelance: "Freelance",
  part_time: "Part-time work",
  business: "Business",
  rent: "Rent",
  energy: "Energy",
  internet: "Internet",
  tuition: "Tuition",
  insurance: "Insurance",
  unpaid: "Not paid yet",
  paid: "Paid",
  credit_card: "Credit card",
  student_loan: "Student loan",
  personal_loan: "Personal loan",
  overdraft: "Overdraft",
  family_loan: "Family loan",
  emergency_cushion: "Safety cushion",
  specific_purchase: "Something special",
  debt_paydown: "Pay down debt",
  general_savings: "General savings",
  high: "High",
  medium: "Medium",
  low: "Low",
};
const s = StyleSheet.create({
  root: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#f2f3ee",
  },
  header: {
    flexShrink: 0,
    paddingHorizontal: 23,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.22)",
  },
  brand: {
    fontSize: 27,
    fontWeight: "600",
    color: "#292f25",
    letterSpacing: -0.9,
  },
  brandIcon: {
    width: 43,
    height: 43,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,.65)",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButton: { padding: 10, borderRadius: 18 },
  small: { fontSize: 10, color: "#7b8075", letterSpacing: 0.5, lineHeight: 17 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#7b8075",
  },
  content: {
    padding: 20,
    gap: 21,
    paddingBottom: 112,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
  },
  h1: {
    fontSize: 31,
    fontWeight: "600",
    color: "#292f25",
    letterSpacing: -0.8,
    lineHeight: 39,
  },
  h2: { fontSize: 17, fontWeight: "600", color: "#353d2e", lineHeight: 24 },
  body: { fontSize: 15, color: "#353d2e", lineHeight: 24 },
  muted: { fontSize: 13, color: "#7a7f73", lineHeight: 21 },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#7b8075",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    padding: 20,
    gap: 15,
    backgroundColor: "rgba(255,255,255,.43)",
    borderRadius: 26,
    borderWidth: 1.2,
    borderColor: "#fff",
    shadowColor: "#8e9882",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.065,
    shadowRadius: 22,
    elevation: 1,
  },
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,.66)",
    paddingHorizontal: 15,
    paddingVertical: 13,
    minHeight: 50,
    color: "#292f25",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 9,
    flexWrap: "wrap",
  },
  chips: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  chip: {
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,.5)",
  },
  record: {
    borderTopWidth: 1,
    borderColor: "rgba(150,160,136,.22)",
    paddingTop: 15,
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150,160,136,.22)",
    marginVertical: 4,
  },
  error: { color: "#9c4439", fontSize: 13, lineHeight: 21 },
  errorCard: {
    backgroundColor: "#fcf0eb",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#fff",
    gap: 12,
  },
  notice: {
    backgroundColor: "rgba(233,242,222,.85)",
    padding: 15,
    borderRadius: 18,
    color: "#4e6540",
    fontSize: 13,
    lineHeight: 20,
  },
  progress: { flexDirection: "row", gap: 6 },
  segment: { height: 4, flex: 1, borderRadius: 3, backgroundColor: "#d9dfd2" },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#eef1e9f5",
    zIndex: 50,
  },
  sheet: { flex: 1, maxWidth: 560, width: "100%", alignSelf: "center" },
  serviceLink: {
    fontSize: 11,
    color: "#80877a",
    textAlign: "center",
    padding: 8,
  },
  assistantHeading: { flexDirection: "row", alignItems: "center", gap: 13 },
  userBubble: {
    alignSelf: "flex-end",
    maxWidth: "91%",
    backgroundColor: "rgba(219,229,207,.65)",
    borderBottomRightRadius: 8,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    maxWidth: "96%",
    borderBottomLeftRadius: 8,
  },
});

