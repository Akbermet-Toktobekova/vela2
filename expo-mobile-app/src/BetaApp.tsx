import { themedStyles } from './theme';
import React,{ useEffect,useRef,useState } from "react";
import { ActionHistory } from "./components/ActionHistory";
import { StatementReview } from "./components/StatementReview";

import {
ActivityIndicator,
Alert,
AppState,
Keyboard,
KeyboardAvoidingView,
Linking,
Modal,
Platform,
ScrollView,
Share,
Switch,
Text,
TextInput,
TouchableOpacity,
View,
} from "react-native";

import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

import * as DocumentPicker from "expo-document-picker";

import { File } from "expo-file-system";
import { CurrencyField } from "./components/CurrencyField";

import AsyncStorage from "@react-native-async-storage/async-storage";

import type { BetaPdfMapping,BetaPdfReview } from "../../shared/contracts/betaPdf";
import {
api,
ApiError,
BetaUser,
drafts,
readImportJob,
readSession,
saveImportJob,
StateEnvelope,
writeSession,
} from "./api";
import { DateField } from "./components/DateField";
import {
AmbientBackground,
GlassButton as Button,
FloatingNavigation,
GlassCard,
Icon,
Field as Input,
} from "./components/SoftGlass";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { AssistantScreen } from "./screens/AssistantScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { colors } from "./theme";
import { TodayScreen } from "./screens/TodayScreen";

type Editor = {
  collection: string;
  values: Record<string, string>;
  id?: string;
  version?: number;
};

const now = () => new Date().toISOString();
const today = () => now().slice(0, 10);
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`;

const money = (v: any, c = "EUR") =>
  v == null ? "Unknown" : `${c} ${Number(v).toLocaleString()}`;

const steps = [
  "Welcome",
  "Profile & essential costs",
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

function PdfImportReview({
  preview, accounts, busy, addAccount, saveMapping, confirm,
}: {
  preview: {pdf: BetaPdfReview; status: string; transactions: unknown[]};
  accounts: {id: string; name: string; currency: string}[];
  busy: boolean;
  addAccount: (currency: string) => void;
  saveMapping: (mapping: Omit<BetaPdfMapping, "expectedVersion">) => void;
  confirm: () => void;
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [excluded, setExcluded] = useState<string[]>(preview.pdf.excludedRows ?? []);
  const [edits, setEdits] = useState<Record<string, {date: string; description: string; amount: string}>>(
    () => Object.fromEntries(Object.entries(preview.pdf.corrections ?? {}).map(([id, value]) =>
      [id, {...value, amount: String(value.amount)}])),
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingMapping, setEditingMapping] = useState(false);
  useEffect(() => setEditingMapping(false), [preview]);
  const {groups, issues} = preview.pdf;
  const mapped = preview.status === "parsed_successfully" && !editingMapping;
  const corrections = Object.fromEntries(Object.entries(edits)
    .filter(([id, value]) => !excluded.includes(id) && /^\d{4}-\d{2}-\d{2}$/.test(value.date) && value.description.trim() && value.amount.trim() && Number.isFinite(Number(value.amount.replace(",", "."))))
    .map(([id, value]) => [id, {...value, amount: Number(value.amount.replace(",", "."))}]));
  const currencies = [...new Set<string>([
    ...groups.map(group => group.currency),
    ...issues.filter(issue => corrections[issue.id]).map(issue => issue.currency),
  ])];
  const mapping = Object.fromEntries(currencies.map(currency => {
    const options = accounts.filter(account => account.currency === currency);
    const saved = groups.find(group => group.currency === currency)?.accountId;
    const preferred = selected[currency] || saved || (options.length === 1 ? options[0].id : "");
    return [currency, options.some(account => account.id === preferred) ? preferred : ""];
  }));
  return <>
    {!currencies.length && !issues.length && <Text>No completed operations in this PDF.</Text>}
    {Object.entries(preview.pdf.excluded).map(([currency, counts]) => {
      const {pending, summary} = counts;
      return <Text key={currency} style={s.muted}>{currency} · {pending} pending · {summary} summary rows skipped</Text>;
    })}
    {currencies.map(currency => {
      const group = groups.find(item => item.currency === currency);
      const options = accounts.filter(account => account.currency === currency);
      return <View key={currency} style={s.record}>
        <Text style={s.h2}>{currency} · {group?.operations.length ?? 0} operations</Text>
        {mapped ? <Text>{options.find(account => account.id === group?.accountId)?.name} · {group?.duplicates ?? 0} duplicates</Text> : <>
          <Select label={`${currency} account`} value={mapping[currency]} values={options}
            onChange={id => setSelected(old => ({...old,[currency]:id}))} />
          <Button secondary title={`Add ${currency} account`} disabled={busy} onPress={() => addAccount(currency)} />
        </>}
        {Boolean(group?.operations.length) && <Button secondary title={expanded === currency ? "Hide operations" : "Review operations"}
          onPress={() => setExpanded(expanded === currency ? null : currency)} />}
        {expanded === currency && group?.operations.map(row => <Text key={`${row.page}:${row.line}`}>
          {row.date} · {row.description} · {money(row.amount, currency)} · p. {row.page}, line {row.line}
        </Text>)}
      </View>;
    })}
    {mapped ? <>
      <Text>{preview.transactions.length} new operations ready to save</Text>
      <Button title="Confirm import" disabled={busy} onPress={confirm} />
      <Button secondary title="Change mapping" disabled={busy} onPress={() => setEditingMapping(true)} />
    </> : <>
      {issues.map(issue => {
        const value = edits[issue.id];
        const skipped = excluded.includes(issue.id);
        return <View key={issue.id} style={s.record}>
          <Text style={s.error}>Page {issue.page}, line {issue.line} · {issue.reason}</Text>
          <Text>{issue.text}</Text>
          <Button secondary title={skipped ? "Include row" : "Exclude row"} onPress={() => setExcluded(old => skipped ? old.filter(id => id !== issue.id) : [...old, issue.id])} />
          {!skipped && <Button secondary title="Correct row" onPress={() => setEdits(old => ({...old, [issue.id]: value ?? {date:"",description:"",amount:""}}))} />}
          {!skipped && value && (["date","description","amount"] as const).map(field =>
            <Input key={field} label={field === "date" ? "Date (YYYY-MM-DD)" : field === "amount" ? "Signed amount" : "Description"}
              value={value[field]} onChange={input => setEdits(old => ({...old,[issue.id]:{...value,[field]:input}}))} />)}
        </View>;
      })}
      <Button title="Check accounts and duplicates" disabled={busy || !currencies.length || currencies.some(currency => !mapping[currency]) ||
        issues.some(issue => !excluded.includes(issue.id) && !corrections[issue.id])}
        onPress={() => saveMapping({accounts:mapping, excludedRows:excluded, corrections})} />
    </>}
  </>;
}

export default function App() {
  const [base, setBase] = useState(process.env.EXPO_PUBLIC_API_URL || "");
  const [baseDraft, setBaseDraft] = useState(base);
  const [token, setToken] = useState<string | null>(null);
  const activeSession = useRef<string | null>(null);
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
  const [authError, setAuthError] = useState("");
  const nameInput = useRef<React.ComponentRef<typeof TextInput>>(null);
  const emailInput = useRef<React.ComponentRef<typeof TextInput>>(null);
  const passwordInput = useRef<React.ComponentRef<typeof TextInput>>(null);
  const authScroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [resetToken, setResetToken] = useState("");

  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(!base);
  const [tab, setTab] = useState("Today");
  const [settingsSectionOpen,setSettingsSectionOpen]=useState(false);
  useEffect(() => { authScroll.current?.scrollTo({y: 0, animated: false}); }, [tab, documentsOpen]);
  const [manualReviewMessage,setManualReviewMessage]=useState("");
  const [settings, setSettings] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const [importDetails, setImportDetails] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [draft, setDraft] = useState<Editor | null>(null);
  const [importAccount, setImportAccount] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [importJob, setImportJob] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [reviewTransaction, setReviewTransaction] = useState<any>(null);
  const [economicType, setEconomicType] = useState("unknown");
  const [category, setCategory] = useState("other");
  const [importHistory, setImportHistory] = useState<any[]>([]);
  const [chatRequestId, setChatRequestId] = useState(uid());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState<string | null>(null);
  const [transactionCurrency, setTransactionCurrency] = useState<string | null>(null);
  const [transactionMonth, setTransactionMonth] = useState<string | null>(null);
  const [versionConflict, setVersionConflict] = useState(false);
  const [profileName, setProfileName] = useState("");
  const profileNameDirty = useRef(false);
  const refreshLock = useRef(false);
  const feedbackRequests = useRef(new Map<string, {id: string; version: number}>());
  const chatClearRequest = useRef<string | null>(null);
  const reviewStartRequest = useRef<string | null>(null);
  const currentActivity = useRef({job, importJob, editor});
  currentActivity.current = {job, importJob, editor};

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {show.remove(); hide.remove();};
  }, []);

  const state = env?.state;
  const candidateAnalysis = env?.analysis || job?.result;
  const analysis =
    candidateAnalysis?.version === env?.version ? candidateAnalysis : undefined;
  const recommendation = env?.recommendation || analysis?.recommendation;
  const snapshot: any = env?.snapshot || analysis?.snapshot;
  const onboarding =
    !!state && (showOnboarding || (!onboardingDismissed && state.onboarding.status !== "completed"));
  const step = Math.min(7, state?.onboarding.currentStep || 1);

  async function discardExpiredSession(expectedToken: string) {
    // A delayed rejection from an old request must not sign out a newer session.
    if (activeSession.current !== expectedToken) return;
    activeSession.current = null;
    setToken(null);
    setUser(null);
    setEnv(null);
    setMessages([]);
    setJob(null);
    setImportJob(null);
    setPreview(null);
    setSettings(false);
    setDocumentsOpen(false);
    setEditor(null);
    setDraft(null);
    profileNameDirty.current = false;
    feedbackRequests.current.clear();
    chatClearRequest.current = null;
    reviewStartRequest.current = null;
    setMode("login");
    setAuthError("Your saved session is no longer valid. Sign in again; your saved records and saved drafts are preserved.");
    // Do not use clearLocal: it also removes saved form drafts/import progress.
    await writeSession(null);
  }
  const request = async <T = any,>(path: string, method = "GET", data?: unknown): Promise<T> => {
    try {
      const result = await api<T>(base, path, token, method, data);
      if (token && activeSession.current !== token) throw new Error("The active account changed. Reload before continuing.");
      return result;
    }
    catch (e) {
      if (token && activeSession.current !== token) throw new Error("The active account changed. Reload before continuing.");
      if (token && e instanceof ApiError && e.status === 401 &&
          !["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"].includes(path)) {
        await discardExpiredSession(token);
      }
      if (e instanceof ApiError && e.code === "VERSION_CONFLICT") {
        setVersionConflict(true);
        throw new ApiError("Your account changed on another device. Reload the latest records; your form is kept as a draft so you can compare before saving.", e.code, e.status, e.fields);
      }
      throw e;
    }
  };

  function updateEnvelope(next: StateEnvelope) {
    setEnv(current => current?.state.user.id === next.state.user.id && current.version > next.version ? current : next);
  }

  async function run(action: () => Promise<void>) {
    const startingSession = activeSession.current;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (e) {
      if (startingSession === activeSession.current) setError(
        e instanceof Error ? e.message : "Something went wrong. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function hydrate(session: string, address = base) {
    const me = await api<any>(address, "/auth/me", session);
    const [fresh, historyResponse, savedDraft, pending] = await Promise.all([
      api<StateEnvelope>(address, "/state", session),
      api<any>(address, "/imports", session),
      drafts.get(me.user.id),
      readImportJob(me.user.id),
    ]);
    let pendingJob: any = null;
    if (pending) {
      try {pendingJob = await api<any>(address, "/jobs/" + pending, session);}
      catch (e) {if (!(e instanceof ApiError && e.status === 404)) throw e;}
    }
    if (activeSession.current !== session) return;
    setUser(me.user);
    if (!profileNameDirty.current) setProfileName(me.user.name);
    updateEnvelope(fresh);
    if (!currentActivity.current.editor) setDraft(savedDraft);
    const history = historyResponse.imports || [];
    setImportHistory(history);
    if (pendingJob) {
      setImportJob(pendingJob);
      if (pendingJob.status === "completed") {
        const saved = history.find((item: any) => item.id === pendingJob.result?.id);
        if (saved && !saved.confirmed) setPreview(saved);
      }
    }
  }

  async function refreshAccount() {
    if (!token || refreshLock.current) return;
    refreshLock.current = true;
    const session = token;
    try {
      await hydrate(session);
      if (activeSession.current !== session) return;
      const current = currentActivity.current;
      for (const [pending, setter, isImport] of [[current.job, setJob, false], [current.importJob, setImportJob, true]] as const) {
        if (!pending?.id) continue;
        try {
          const latest = await request(`/jobs/${pending.id}`);
          if (activeSession.current !== session) return;
          setter(latest);
          if (isImport && ["completed", "COMPLETED", "succeeded"].includes(latest.status)) {
            const result = await request(`/imports/${latest.result?.id}`);
            if (!result.confirmed) setPreview(result);
          }
        } catch (e) {
          if (e instanceof ApiError && e.status === 404) setter(null);
          else throw e;
        }
      }
      setNotice("Account refreshed. Saved forms are preserved.");
    } finally { refreshLock.current = false; }
  }

  useEffect(() => {
    const listener = AppState.addEventListener("change", status => {
      if (status === "active" && token && !busy) void run(refreshAccount);
    });
    return () => listener.remove();
  }, [token, base, busy]);

  useEffect(() => {
    void (async () => {
      try {
        const address =
          (await AsyncStorage.getItem("vela.beta.api")) ||
          process.env.EXPO_PUBLIC_API_URL ||
          "";
        setBase(address);
        setBaseDraft(address);
        const session = await readSession();
        if (session && address) {
          activeSession.current = session;
          setToken(session);
          try { await hydrate(session, address); }
          catch (e) {
            if (e instanceof ApiError && e.status === 401) await discardExpiredSession(session);
            else throw e;
          }
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
      setJob((current: any) => ((current?.origin || current?.args?.origin) === "manual" && ["queued","running","connection_lost"].includes(current.status)) || current?.id === automatic.id ? current : automatic);
    }
  }, [env?.reviewJob?.id, env?.reviewJob?.status]);

  useEffect(() => {
    if (
      !token || !job?.id ||
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
        .then(async (r) => {
          if (stop) return;
          if (["completed", "COMPLETED", "succeeded"].includes(r.status)) {
            const fresh = await request<StateEnvelope>("/state");
            if (stop) return;
            updateEnvelope(fresh);
            if(r.origin === "manual")setManualReviewMessage(r.result?.manualReviewResult === "action_saved" ? "Your suggestion is saved in Action history." : "No new action to suggest right now. Your financial picture is up to date.");
          }
          setJob(r);
        })
        .catch((e) => {
          if (!stop) {
            if((job?.origin || job?.args?.origin) === "manual")setError(e.message);
            setJob((j: any) => ({ ...j, status: "connection_lost" }));
          }
        });
    }, 2000);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, [job?.id, job?.status, token, base]);

  useEffect(() => {
    if (
      !token || !importJob?.id ||
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
  }, [importJob?.id, importJob?.status, token, base]);

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
    expectedVersion = env?.version,
  ) {
    if (!env) throw new Error("Load your profile first.");
    await request<StateEnvelope>("/state", "PUT", {
      expectedVersion,
      state: next,
      aiConsent: consent,
      experimentalRecommendations: experimental,
    });
    const fresh = await request<StateEnvelope>("/state");
    updateEnvelope(fresh);
    return fresh;
  }

  async function feedback(action: string, amount?: number) {
    if (!recommendation || !env) return;
    const key = JSON.stringify([recommendation.id, action, amount ?? null]);
    const pending = feedbackRequests.current.get(key) || {id: uid(), version: env.version};
    feedbackRequests.current.set(key, pending);
    await run(async () => {
      try {
        const result = await request("/feedback", "POST", {
          recommendationId: recommendation.id, action, adjustedAmount: amount, amount,
          expectedVersion: pending.version, requestId: pending.id,
        });
        if (result.accepted === false || ["ADJUSTMENT_REJECTED", "VERIFICATION_REQUIRED"].includes(result.status)) {
          feedbackRequests.current.delete(key);
          throw new Error(result.rejectionReason || result.message || "This action was not saved. Review the required verification.");
        }
        if (result.accepted !== true || !["ACCEPTED", "ADJUSTED", "DECLINED_AND_RERUN", "COMPLETED"].includes(result.status)) {
          throw new Error("The server did not confirm this response. Refresh Today before trying again.");
        }
        updateEnvelope(await request("/state"));
        feedbackRequests.current.delete(key);
        setNotice(result.message || "Your response has been saved.");
      } catch (e) {
        if (e instanceof ApiError && e.status < 500) feedbackRequests.current.delete(key);
        throw e;
      }
    });
  }

  function reviewTransactions(filter?: string, currency?: string, month?: string) {
    setTransactionFilter(filter || null);
    setTransactionCurrency(currency || null);
    setTransactionMonth(month || null);
    setSettings(false); setDocumentsOpen(false); setShowOnboarding(false);
    setOnboardingDismissed(true); setTab("Transactions");
    requestAnimationFrame(() => authScroll.current?.scrollTo({y: 0, animated: false}));
  }
  async function clearChat() {
    await run(async () => {
      chatClearRequest.current ||= uid();
      const result = await request("/chat", "DELETE", {requestId: chatClearRequest.current});
      setMessages(result.messages || []);
      setQuestion("");
      setChatRequestId(uid());
      chatClearRequest.current = null;
      setNotice("Chat history cleared.");
    });
  }
  function showAuthError(message: string, field?: string) {
    setAuthError(message);
    ({name: nameInput, email: emailInput, password: passwordInput} as const)[field as "name" | "email" | "password"]?.current?.focus();
    setTimeout(() => authScroll.current?.scrollTo({y: 0, animated: true}), 150);
  }
  async function authenticate() {
    setAuthError("");
    const cleanEmail = email.trim();
    if (mode === "register" && (!name.trim() || name.trim().length > 100)) return showAuthError("Enter a name between 1 and 100 characters.", "name");
    if (mode !== "reset" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return showAuthError("Enter a valid email address.", "email");
    if (mode !== "forgot" && (password.length < 12 || password.length > 128)) return showAuthError("Password must be between 12 and 128 characters.", "password");
    await run(async () => {
      try {
      const health = await api<any>(base, "/health", null);
      if (health.runtime !== "authenticated-beta") throw new Error("This address is not the Vela account server. Check Connection settings.");
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
        name: name.trim(),
        email: cleanEmail,
        password,
      });
      await writeSession(r.token);
      activeSession.current = r.token;
      setToken(r.token);
      setPassword("");
      try { await hydrate(r.token); }
      catch (e) {
        if (e instanceof ApiError && e.status === 401) await discardExpiredSession(r.token);
        throw e;
      }
      } catch (e) {
        const field = e instanceof ApiError ? Object.keys(e.fields)[0] : undefined;
        showAuthError(e instanceof Error ? e.message : "Sign-in could not finish. Try again.", field);
      }
    });
  }

  async function clearLocal() {
    activeSession.current = null;
    await writeSession(null);
    if (user) {
      await drafts.clear(user.id);
      await saveImportJob(user.id, null);
    }
    setOnboardingDismissed(false);
    setShowOnboarding(false);
    profileNameDirty.current = false;
    feedbackRequests.current.clear();
    chatClearRequest.current = null;
    reviewStartRequest.current = null;
    setToken(null);
    setUser(null);
    setEnv(null);
    setMessages([]);
    setJob(null);
    setImportJob(null);
    setImportHistory([]);
    setEditor(null);
    setDraft(null);
    setPreview(null);
    setSettings(false);
    setDocumentsOpen(false);
    setPassword("");
  }

  function open(collection: string, item?: any, currency?: string) {
    if (!state) return;
    let defaults: Record<string, string> = {
      name: "",
      currency: currency ?? state.profile.baseCurrency,
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
        defaults.purpose = item.purposes.join(",");
      }
    }
    setVersionConflict(false);
    setEditor({ collection, id: item?.id, values: defaults, version: env?.version });
  }

  const staleEditor = !!editor && !!env && editor.version !== env.version;
  const latestEditorRecord = editor && state ? editor.collection === "expenses" ? state.expenseCommitment : (state as any)[editor.collection]?.find((r: any) => r.id === editor.id) : null;
  function latestFieldValue(key: string) {
    if (!editor || !state) return "Unknown";
    if (editor.collection === "accounts" && ["balance", "balanceDate"].includes(key)) {
      const latest = state.balances.filter(b => b.accountId === editor.id).sort((a,b) => b.asOf.localeCompare(a.asOf))[0];
      return key === "balance" ? String(latest?.amount ?? "Unknown") : latest?.asOf.slice(0,10) || "Unknown";
    }
    if (key === "purpose") return latestEditorRecord?.purposes?.join(", ") || "Unknown";
    return String(latestEditorRecord?.[key] ?? "Unknown");
  }
  async function submit() {
    if (!editor || !state || !user) return;
    if (staleEditor) {setError("Review the latest saved values before reapplying this draft."); return;}
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
        record.purposes = String(record.purpose || "").split(",").filter(Boolean);
        if (!record.purposes.length) throw new Error("Choose at least one account purpose.");
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
      await save(next, env?.aiConsent, env?.experimentalRecommendations, editor.version ?? env?.version);
      setVersionConflict(false);
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

  async function upload(selectedAccountId?: string) {
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
        accountId: selectedAccountId || importAccount || state.accounts[0].id,
        fileName,
        contentBase64,
      };
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

  const confirmImport = () => void run(async () => {
    await request(`/imports/${preview.id}/confirm`, "POST", {expectedVersion: env?.version});
    updateEnvelope(await request("/state"));
    setPreview(null);
    setImportDetails(false);
    setDocumentsOpen(false);
    setSettings(false);
    setShowOnboarding(false);
    setOnboardingDismissed(true);
    setTab("Today");
    setNotice(env?.aiConsent ? "Statement imported. Review your financial picture on Today; analysis status appears there." : "Statement imported. Deterministic findings are ready on Today. Optional AI processing stays off.");
  });
  const sourceImport = (statementId: string) => importHistory.find(
    item => item.statement?.id === statementId || item.statements?.some((statement: any) => statement.id === statementId),
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
      {importJob && <Text style={s.muted}>{["queued", "running", "processing"].includes(importJob.status) ? "Preparing your statement…" : importJob.status === "connection_lost" ? "Connection interrupted. Reload your profile to resume." : importJob.status === "failed" ? "Statement needs attention. Review the error below." : "Statement ready for review"}</Text>}
      {preview && (
        <>
          <Text style={s.h2}>
            {preview.statement?.fileName || preview.fileName || "Import preview"}
          </Text>
          {preview.pdf ? preview.confirmed ? <Text>This PDF was already confirmed.</Text> :
            <PdfImportReview key={preview.id} preview={preview} accounts={state?.accounts ?? []} busy={busy}
              addAccount={currency => open("accounts", undefined, currency)}
              saveMapping={mapping => void run(async () => setPreview(await request(`/imports/${preview.id}/accounts`, "PUT", {
                ...mapping, expectedVersion: env?.version,
              })))}
              confirm={confirmImport} />
          : <>
          <Text style={s.muted}>Review the summary before adding these records to your account.</Text>
          <StatementReview key={`${preview.id}:${JSON.stringify(preview.parsing?.options)}`} preview={preview} busy={busy}
            revise={body => void run(async () => setPreview(await request(`/imports/${preview.id}/review`, "PUT", {...body, expectedVersion: env?.version})))} />
          {preview.statement?.errorMessage && (
            <Text style={s.error}>{preview.statement.errorMessage}</Text>
          )}
          <Text>
            {preview.transactions?.length || 0} operations ·{" "}
            {preview.statement?.duplicateCountSkipped || 0} duplicates
          </Text>
          <Button secondary title={importDetails ? "Hide transaction details" : "Inspect transactions and technical details"} onPress={() => setImportDetails(v => !v)} />
          {importDetails && preview.transactions?.map((t: any) => (
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
            disabled={busy || !preview.transactions?.length || !["parsed_successfully", "ready_to_confirm"].includes(preview.status)}
            onPress={confirmImport}
          />
          </>}
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
          {sourceImport(st.id) && (
            <Button
              secondary
              title="Delete source file and its operations"
              disabled={busy}
              onPress={() =>
                Alert.alert(
                  "Delete statement?",
                  "This removes the source file and all operations and balances imported from it, across its currencies.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () =>
                        void run(async () => {
                          const item = sourceImport(st.id);
                          await request(`/imports/${item.id}`, "DELETE", {
                            expectedVersion: env?.version,
                          });
                          updateEnvelope(await request("/state"));
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
      <LinearGradient colors={[colors.background, colors.background]} style={s.root}>
        <AmbientBackground />
        <SafeAreaView style={s.root}>
          <KeyboardAvoidingView
            style={s.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={s.header}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 11 }}
              >
                <View style={s.brandIcon}>
                  <Icon name="compass" size={24} color={colors.white} />
                </View>
                <Text style={s.brand}>Vela</Text>
              </View>
              {user && (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={
                    "Open profile and settings"
                  }
                  style={s.settingsButton}
                  onPress={() => {setSettings(false); setDocumentsOpen(false); setTab("Profile"); setOnboardingDismissed(true); setShowOnboarding(false);}}
                >
                  <Icon name="settings" size={23} />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView
              ref={authScroll}
              automaticallyAdjustKeyboardInsets={false}
              keyboardDismissMode="on-drag"
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
                          updateEnvelope(await request("/state"));
                        })
                      }
                    />
                  )}
                </View>
              ) : null}
              {notice ? <Text style={s.notice}>{notice}</Text> : null}

              {user && state && (error || importJob?.status === "connection_lost") && <Button secondary disabled={busy} title="Refresh account & resume pending work" onPress={() => void run(refreshAccount)} />}
              {versionConflict && user && <View style={s.card}>
                <Text style={s.error}>A newer version exists. Your draft has not been overwritten.</Text>
                <Button secondary disabled={busy} title="Reload records; keep my draft" onPress={() => void run(async () => {
                  if (editor) {await drafts.set(user.id, editor); setDraft(editor); setEditor(null);}
                  await refreshAccount(); setVersionConflict(false);
                })} />
              </View>}

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
                    {authError ? <Text accessibilityRole="alert" style={s.error}>{authError}</Text> : null}
                    {mode === "register" && (
                      <Input label="Name" value={name} onChange={setName} inputRef={nameInput} />
                    )}
                    {mode !== "reset" && (
                      <Input label="Email" value={email} onChange={setEmail} inputRef={emailInput} />
                    )}
                    {mode !== "forgot" && (
                      <Input
                        label="Password (at least 12 characters)"
                        value={password}
                        onChange={setPassword}
                        secure
                        inputRef={passwordInput}
                      />
                    )}
                    {mode === "reset" && (
                      <Input
                        label="Recovery link token"
                        value={resetToken}
                        onChange={setResetToken}
                      />
                    )}
                    {authError ? <Text accessibilityRole="alert" style={s.error}>{authError}</Text> : null}
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
                        setAuthError("");
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
                        : "Advanced connection settings"}
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
                            const normalized = baseDraft.trim().replace(/\/$/, "");
                            const url = new URL(normalized);
                            if (!["https:", "http:"].includes(url.protocol))
                              throw new Error("Use an HTTPS server address.");
                            if (
                              url.protocol !== "https:" &&
                              !["localhost", "127.0.0.1"].includes(url.hostname)
                            )
                              throw new Error(
                                "Remote connections require HTTPS.",
                              );
                            const health = await api<any>(normalized, "/health", null);
                            if (health.runtime !== "authenticated-beta") throw new Error("This is not the Vela account server.");
                            if (base !== normalized) {
                              // A session belongs to its server; never forward it to a newly selected endpoint.
                              activeSession.current = null;
                              await writeSession(null);
                              setToken(null); setUser(null); setEnv(null); setMessages([]);
                              setJob(null); setImportJob(null); setPreview(null); setEditor(null); setDraft(null);
                              feedbackRequests.current.clear(); chatClearRequest.current = null; reviewStartRequest.current = null;
                              profileNameDirty.current = false;
                              setMode("login"); setAuthError("");
                            }
                            setBase(normalized);
                            await AsyncStorage.setItem(
                              "vela.beta.api",
                              normalized,
                            );
                            setNotice("Connected to Vela. Server address saved.");
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

              {user && state && !onboarding && tab === "Profile" && !documentsOpen ? (
                <ProfileScreen name={user.name || state.profile.nickname} email={user.email} currency={state.profile.baseCurrency} sections={[
{title: 'Profile details', content: (<View style={{gap:12}}>
                    <Text style={s.h2}>Your profile</Text>
                    <Text style={s.body}>{user.email}</Text>
                    <Input label="Display name" value={profileName} onChange={v => {profileNameDirty.current = true; setProfileName(v);}} />
                    <Button secondary disabled={busy || !profileName.trim()} title="Save display name" onPress={() => void run(async () => {
                      const result = await request("/profile", "PUT", {name: profileName.trim()});
                      profileNameDirty.current = false;
                      setUser(result.user); await refreshAccount(); setNotice("Display name saved.");
                    })} />
                    <Text style={s.small}>Your sign-in email is unchanged.</Text>
                    <CurrencyField label="Planning currency" value={state.profile.baseCurrency} onChange={v => void run(async () => {await save({...state, profile: {...state.profile, baseCurrency: v, updatedAt: now()}});})} />
                    <Text style={s.muted}>Setup {state.onboarding.status === "completed" ? "completed" : `in progress · step ${step} of 7`}</Text>
                    <Button secondary title="Continue onboarding" onPress={() => {setShowOnboarding(true); setOnboardingDismissed(false); setSettings(false);}} />
                  </View>)},
{title: 'Accounts', content: (section("accounts", "Your accounts"))},
{title: 'Statements', content: (<>{imports()}<Button secondary title="Review imported transactions" onPress={() => {setSettings(false); setDocumentsOpen(false); setOnboardingDismissed(true); setShowOnboarding(false); reviewTransactions();}} /></>)},
{title: 'Privacy & AI', content: (consent())},
{title: "Data & account", content: (<View style={{gap:12}}>
                    <Text style={s.h2}>Your data & account</Text>
                    <Text style={s.muted}>Export a copy before deleting. Sign out only affects this device's session.</Text>
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
                        await refreshAccount();
                      })
                    }
                  />
                  <Button
                    secondary
                    title="Log out"
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
                  </View>)}
                ]} />
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
                  {step === 2 && <View style={s.card}>
                    <Text style={s.h2}>Your essential monthly costs</Text>
                    <Text style={s.muted}>Estimate rent, food, utilities and transport. This total includes your regular bills; adding bill records later does not mean adding them to this estimate again. Unknown is different from zero.</Text>
                    <Text style={s.body}>{money(state.expenseCommitment?.estimatedMonthlyAmount, state.expenseCommitment?.currency || state.profile.baseCurrency)}</Text>
                    <Button secondary title="Add or edit essential costs" onPress={() => open("expenses")} />
                    <Text style={s.small}>Not sure yet? Continue and complete the estimate later. Vela will explain which calculations need it.</Text>
                  </View>}
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
                      <Text style={s.eyebrow}>CONNECT STATEMENTS · STEP 7</Text>
                      <Text style={s.h1}>Let Vela connect the dots</Text>
                      <Text style={s.body}>Upload bank statements so Vela can uncover subscriptions, internal transfers, and real spending patterns.</Text>
                      {state.accounts.map(account => <GlassCard key={account.id}>
                        <View style={s.row}><View style={{flex:1}}><Text style={s.h2}>{account.name} ({account.currency})</Text><Text style={s.muted}>{account.institution} · {state.statements.filter(statement => statement.accountId === account.id).length} statement(s)</Text></View><Button title="+ Upload" disabled={busy} onPress={() => void upload(account.id)} /></View>
                        {state.statements.filter(statement => statement.accountId === account.id).map(statement => <View key={statement.id} style={{backgroundColor:colors.secondary,borderRadius:20,padding:14}}><Text style={s.h2} numberOfLines={1}>{statement.fileName}</Text><Text style={s.muted}>Status: {statement.status.replaceAll("_"," ")} · {statement.transactionCount} txns</Text></View>)}
                        {!state.statements.some(statement => statement.accountId === account.id) && <Text style={[s.muted,{backgroundColor:colors.secondary,borderRadius:20,padding:16,textAlign:"center"}]}>No statements uploaded yet.</Text>}
                      </GlassCard>)}
                      {(preview || importJob) && imports()}
                      <GlassCard><Text style={s.muted}>🛡 You stay in control: review parsed operations before confirming. Importing a statement cannot move your money.</Text></GlassCard>
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
                      title={step === 7 ? `See What Vela Found in Today (${state.transactions.length} txns) →` : "Save & continue"}
                      onPress={() => void changeStep(step + 1)}
                    />
                  </View>
                  <Button
                    secondary
                    title="Finish setup later · View Today"
                    disabled={busy}
                    onPress={() => {setShowOnboarding(false); setOnboardingDismissed(true); setTab("Today");}}

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
                  findings={env.findings}
                  onFindingResponse={async (finding, body) => {
                    await request(`/findings/${finding.id}/respond`, "POST", {...body, expectedVersion: env.version, evidenceVersion: finding.evidenceVersion});
                    updateEnvelope(await request("/state"));
                    setNotice(body.response === "unsure" ? "Deferred—saved for later review." : body.response === "dismiss" ? "✓ Dismissed and saved." : "✓ Classification saved. Your progress is updated.");
                  }}
                  recommendation={recommendation}
                  analysis={analysis}
                  job={(job?.origin || job?.args?.origin) === "manual" ? job : null}
                  manualReviewMessage={manualReviewMessage}
                  busy={busy}
                  experimental={env.experimentalRecommendations || false}
                  onReview={() => void run(async () => {
                    if ((job?.origin || job?.args?.origin) === "manual" && job?.id && ["connection_lost", "queued", "running"].includes(job.status)) {
                      await refreshAccount();
                    } else {
                      setManualReviewMessage("");
                      reviewStartRequest.current ||= uid();
                      setJob(await request("/review", "POST", {forceRefresh: true, requestId: reviewStartRequest.current}));
                      reviewStartRequest.current = null;
                    }
                  })}
                  onFeedback={(action, amount) => void feedback(action, amount)}
                  onExplain={() => {
                    setQuestion(
                      "Why was this step selected, and what facts support it?",
                    );
                    setTab("Assistant");
                  }}
                  onOpen={open}
                  onUpload={() => setDocumentsOpen(true)}
                  onManage={() => setTab("Profile")}
                  onReviewTransactions={() => reviewTransactions()}
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
              {user && state && !settings && !onboarding && !documentsOpen && tab === "Transactions" ? (
                <>
                  <Button secondary title="← Back to Analytics" onPress={() => setTab("Analytics")} />
                  <Text accessibilityRole="header" style={s.h1}>Review transactions</Text>
                  {!state.transactions.length && <Text style={s.muted}>No imported transactions yet. Confirm a statement import to review its transactions.</Text>}
                  <View style={s.card}>
                    <Text style={s.h2}>Imported operations</Text>
                    <Text style={s.muted}>
                      Confirm the economic meaning of each operation. Internal
                      transfers are not new income.
                    </Text>
                    {(transactionFilter || transactionCurrency || transactionMonth) && <><Text style={s.small}>Showing {[transactionFilter?.replaceAll("_", " "), transactionCurrency, transactionMonth].filter(Boolean).join(" · ")}</Text><Button secondary title="Show all transactions" onPress={() => {setTransactionFilter(null); setTransactionCurrency(null); setTransactionMonth(null);}} /></>}
                    {state.transactions.filter(t => (!transactionFilter || state.classifications.find(c => c.transactionId === t.id)?.category === transactionFilter) && (!transactionCurrency || t.currency === transactionCurrency) && (!transactionMonth || t.date.startsWith(transactionMonth))).map((t) => (
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
                          · {state.classifications.find(c => c.transactionId === t.id)?.status === "user_confirmed" ? "✓ Approved" : state.classifications.find(c => c.transactionId === t.id)?.confidence === "high" ? "Automatically classified" : "Needs review"} · Tap to review
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : null}
              {user &&
              state &&
              !settings &&
              !onboarding &&
              !documentsOpen &&
              tab === "Analytics" ? (
                <>
                  <AnalyticsScreen snapshot={snapshot} onReviewTransactions={reviewTransactions} onEditGoal={goal => open("goals", goal)} onEssentials={() => open("expenses")} onUpdateBalance={() => open("accounts", state.accounts.find(account => account.isPrimary) || state.accounts[0])} />
                  {section("debts", "Debts & credit")}
                  <Button secondary title="Manage goals, income & bills" onPress={() => setSettingsSectionOpen(value => !value)} />
                  {settingsSectionOpen && <>{section("goals", "Your goals")}{section("incomes", "Income")}{section("obligations", "Upcoming bills")}</>}
                  <ActionHistory items={env.actionHistory || []}
                    refresh={async()=>{const result=await request("/action-history");setEnv(current=>current?{...current,actionHistory:result.items}:current);}}
                    save={async(id,body)=>{await request(`/action-history/${id}/outcome`,"PUT",body);const result=await request("/action-history");setEnv(current=>current?{...current,actionHistory:result.items}:current);}} />
                </>
              ) : null}

              {user &&
              state &&
              !settings &&
              !onboarding &&
              !documentsOpen &&
              tab === "Assistant" ? (
                <AssistantScreen messages={messages} question={question} onQuestion={setQuestion}
                  accounts={state.accounts.length} transactions={state.transactions.length} busy={busy} consent={!!env.aiConsent} consentControls={consent()}
                  onNewChat={() => Alert.alert("Start a new chat?", "This clears the saved conversation on all devices.", [{text: "Cancel", style: "cancel"}, {text: "New chat", style: "destructive", onPress: () => void clearChat()}])}
                  onSend={() => void run(async () => {
                    const r = await request("/chat", "POST", {message: question, requestId: chatRequestId});
                    setMessages(r.messages || []); setQuestion(""); setChatRequestId(uid());
                    if (r.status === "PROVIDER_UNAVAILABLE") setError("The AI provider is unavailable. This is not a completed model response.");
                  })}
                />
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
            {user && !onboarding && !settings && !keyboardVisible && (
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
                          updateEnvelope(await request("/state"));
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

            {editor && user && (
              <Modal animationType="slide" presentationStyle="fullScreen" onRequestClose={() => {setDraft(editor); setEditor(null);}}>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
                  <AmbientBackground />
                  <KeyboardAvoidingView style={s.sheet} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{flexDirection: 'row', padding: 16, justifyContent: 'space-between'}}>
                      <Button secondary title="Back" onPress={() => {Keyboard.dismiss(); setDraft(editor); setEditor(null);}} />
                      <Button disabled={busy || staleEditor} title={busy ? "Saving…" : "Save"} onPress={() => void submit()} />
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
                      return key === "purpose" ? (
                        <View key={key} style={{gap: 8}}><Text style={s.h2}>Account purposes</Text>
                          {options.purpose.map(purpose => {
                            const selected = (editor.values.purpose || "").split(",").filter(Boolean);
                            const checked = selected.includes(purpose);
                            return <TouchableOpacity key={purpose} accessibilityRole="checkbox" accessibilityState={{checked}} onPress={() => setEditor({...editor, values: {...editor.values, purpose: (checked ? selected.filter(p => p !== purpose) : [...selected, purpose]).join(",")}})} style={s.row}>
                              <Text style={s.body}>{checked ? "☑" : "☐"} {purpose.replaceAll("_", " ")}</Text>
                            </TouchableOpacity>;
                          })}
                        </View>
                      ) : key === "currency" ? (
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
                    {staleEditor && <View style={s.card}>
                      <Text style={s.h2}>Compare with your latest saved records</Text>
                      <Text style={s.muted}>This draft was started on an older version. Nothing is saved until you review, reapply and tap Save.</Text>
                      {editor.id && !latestEditorRecord ? <Text style={s.error}>This record was deleted. Keep this draft for reference or close it and create a new record.</Text> : <>
                        {(fields[editor.collection] || []).map(key => <View key={key} style={{paddingVertical: 6}}>
                          <Text style={s.small}>{key}</Text>
                          <Text style={s.body}>Saved: {latestFieldValue(key)}</Text>
                          <Text style={s.body}>Your draft: {editor.values[key] || "Unknown"}</Text>
                        </View>)}
                        <Button secondary disabled={busy} title="I reviewed these changes · Reapply my draft" onPress={() => {setEditor({...editor, version: env?.version}); setVersionConflict(false); setError("");}} />
                      </>}
                    </View>}
                    {versionConflict && <Button secondary disabled={busy} title="Reload latest records; keep draft" onPress={() => void run(async () => {
                      await drafts.set(user.id, editor); setDraft(editor); setEditor(null);
                      await refreshAccount(); setVersionConflict(false);
                    })} />}
                    <Button
                      title={busy ? "Saving…" : "Save to my account"}
                      disabled={busy || staleEditor}
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
const s = themedStyles({
  root: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexShrink: 0,
    paddingHorizontal: 23,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.22)",
  },
  brand: {
    fontSize: 20,
    fontWeight: "600",
    color: "#272e23",
    letterSpacing: -0.9,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButton: { padding: 10, borderRadius: 18 },
  small: { fontSize: 10, color: "#74766d", letterSpacing: 0.5, lineHeight: 17 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#74766d",
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 112,
    maxWidth: 430,
    width: "100%",
    alignSelf: "center",
  },
  h1: {
    fontSize: 24,
    fontWeight: "600",
    color: "#272e23",
    letterSpacing: -0.8,
    lineHeight: 31,
  },
  h2: { fontSize: 17, fontWeight: "600", color: "#353d2e", lineHeight: 24 },
  body: { fontSize: 15, color: "#353d2e", lineHeight: 24 },
  muted: { fontSize: 13, color: "#74766d", lineHeight: 21 },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#74766d",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    padding: 16,
    gap: 12,
    backgroundColor: colors.secondary,
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: colors.line,
    shadowColor: "#8e9882",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.065,
    shadowRadius: 22,
    elevation: 1,
  },
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "rgba(255,255,255,.66)",
    paddingHorizontal: 15,
    paddingVertical: 13,
    minHeight: 50,
    color: "#272e23",
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
    borderColor: colors.line,
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
    borderColor: colors.line,
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
  sheet: { flex: 1, maxWidth: 430, width: "100%", alignSelf: "center" },
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

