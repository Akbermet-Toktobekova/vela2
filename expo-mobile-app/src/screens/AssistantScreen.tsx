import { useRef, type ComponentRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlassCard, Icon } from "../components/SoftGlass";
import { colors, fonts, themedStyles } from "../theme";

const prompts = [
  "Explain my current next step",
  "How much is safe to spend right now?",
  "Where did my money go?",
  "Show my accounts and currencies",
  "How much emergency coverage do I have?",
  "What bills are coming up?",
];
type Message = {
  id?: string;
  role: string;
  content?: string;
  text?: string;
  createdAt?: string;
};
export function AssistantScreen({
  messages,
  question,
  onQuestion,
  onSend,
  onNewChat,
  busy,
  consent,
  accounts,
  transactions,
  consentControls,
}: {
  messages: Message[];
  question: string;
  onQuestion: (value: string) => void;
  onSend: () => void;
  onNewChat: () => void;
  busy: boolean;
  consent: boolean;
  accounts: number;
  transactions: number;
  consentControls: React.ReactNode;
}) {
  const history = useRef<ComponentRef<typeof ScrollView>>(null);
  return (
    <GlassCard>
      <View style={s.header}>
        <View style={s.icon}>
          <Icon name="chat" size={18} />
        </View>
        <View style={{ flex: 1 }}>
          <Text accessibilityRole="header" style={s.heading}>
            Vela Financial Assistant
          </Text>
          <Text style={s.caption}>
            Connected to {accounts} accounts & {transactions} transactions
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          disabled={busy || !messages.length}
          onPress={onNewChat}
          style={s.newChat}
        >
          <Text style={s.newChatText}>+ New chat</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.disclosure}>
        Answers use your saved financial picture. Financial changes require
        separate confirmation.{" "}
        {consent ? "AI processing enabled." : "AI processing off."}
      </Text>
      {!consent && consentControls}
      <ScrollView
        ref={history}
        nestedScrollEnabled
        style={s.history}
        contentContainerStyle={{ gap: 14, paddingVertical: 12 }}
        onContentSizeChange={() =>
          history.current?.scrollToEnd({ animated: true })
        }
        keyboardShouldPersistTaps="handled"
      >
        {!messages.length && (
          <View style={s.empty}>
            <Icon name="compass" size={34} color={colors.green} />
            <Text style={s.heading}>
              A clearer picture starts with a question
            </Text>
            <Text style={s.caption}>
              Ask about your balances, bills, cushion, or spending.
            </Text>
          </View>
        )}
        {messages.map((message, index) => (
          <View
            key={message.id || index}
            style={{
              alignItems: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={[s.bubble, message.role === "user" ? s.user : s.assistant]}
            >
              <Text selectable style={s.body}>
                {message.content || message.text}
              </Text>
            </View>
            <Text style={s.caption}>
              {message.role === "user" ? "You" : "Vela"}
              {message.createdAt &&
              Number.isFinite(Date.parse(message.createdAt))
                ? ` · ${new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : ""}
            </Text>
          </View>
        ))}
      </ScrollView>
      {!messages.length && <View
        style={{ gap: 6,flexDirection:'row',flexWrap:'wrap' }}
        accessibilityLabel="Suggested questions"
      >
        {prompts.map((prompt) => (
          <TouchableOpacity
            key={prompt}
            accessibilityRole="button"
            disabled={busy}
            onPress={() => onQuestion(prompt)}
            style={s.prompt}
          >
            <Text style={s.promptText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </View>}
      <View style={s.composer}>
        <TextInput
          accessibilityLabel="Message Vela"
          placeholder="Ask about your finances…"
          placeholderTextColor={colors.muted}
          value={question}
          onChangeText={onQuestion}
          style={s.input}
          onSubmitEditing={() => {
            if (!busy && consent && question.trim()) onSend();
          }}
          returnKeyType="send"
        />
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Send message"
          disabled={busy || !consent || !question.trim()}
          onPress={onSend}
          style={[
            s.send,
            (busy || !consent || !question.trim()) && { opacity: 0.45 },
          ]}
        >
          <Text style={s.sendText}>{busy ? "…" : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}
const s = themedStyles({
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  icon: { padding: 8, borderRadius: 18, backgroundColor: colors.secondary },
  heading: { fontSize: 15, fontWeight: "700", color: colors.ink },
  caption: { fontSize: 10, color: colors.muted, lineHeight: 16 },
  newChat: { backgroundColor: colors.secondary, padding: 8, borderRadius: 12 },
  newChatText: { fontSize: 10, fontWeight: "600", color: colors.ink },
  disclosure: {
    fontSize: 11,
    lineHeight: 17,
    color: colors.muted,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 26,
  },
  history: { minHeight: 210, maxHeight: 330 },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    minHeight: 210,
  },
  bubble: { maxWidth: "88%", padding: 13, borderRadius: 24 },
  user: { backgroundColor: colors.background, borderBottomRightRadius: 4 },
  assistant: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.line,
    borderBottomLeftRadius: 0,
  },
  body: { fontSize: 13, lineHeight: 20, color: colors.ink },
  prompt: {
    maxWidth:'100%',
    flexShrink:1,
    minHeight:44,
    justifyContent:'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.line,
  },
  promptText: { fontSize: 11, fontWeight: "600", color: colors.ink },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 18,
    padding: 7,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.line,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 9,
    color: colors.ink,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  send: { backgroundColor: colors.green, borderRadius: 14, padding: 12 },
  sendText: { color: colors.white, fontSize: 12, fontWeight: "700" },
});
