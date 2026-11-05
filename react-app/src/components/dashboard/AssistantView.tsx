import React, { useState, useRef, useEffect } from 'react';
import { usePI } from '../../context/PIContext';

const SUGGESTED_QUESTIONS = [
  'Why €40 for my Safety Cushion?',
  'How much is safe to spend right now?',
  'Where did my money go in October?',
  'Show my accounts and currencies',
  'How many days of emergency coverage do I have?',
  'What bills and obligations are coming up?',
];

export const AssistantView: React.FC = () => {
  const { piState, snapshot, sendAssistantMessage, clearAssistantMessages } = usePI();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = piState.assistantMessages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAssistantMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col space-y-3 pb-6">
      {/* Assistant Header Card & Disclosure */}
      <section className="glass-card rounded-[22px] p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="icon-tile flex h-9 w-9 items-center justify-center rounded-full">
              <img
                src="./assets/aed26.svg"
                alt=""
                aria-hidden="true"
                className="glass-icon h-4 w-4"
              />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[15px] font-bold text-[#272e23]">Vela Financial Assistant</h1>
                <span className="rounded-full bg-[#386641]/15 px-2 py-0.5 text-[9px] font-bold text-[#386641]">
                  Live PI Data
                </span>
              </div>
              <p className="text-[11px] text-[#74766d]">
                Connected to {snapshot.accountSummaries.length} accounts &{' '}
                {snapshot.transactions.length} transactions
              </p>
            </div>
          </div>

          {messages.length > 1 && (
            <button
              type="button"
              onClick={clearAssistantMessages}
              className="secondary-action rounded-xl px-2.5 py-1 text-[10px] font-semibold text-[#74766d]"
            >
              Clear Chat
            </button>
          )}
        </div>

        <div className="mt-2.5 rounded-xl bg-white/45 px-3 py-1.5 text-[10px] text-[#74766d] border border-white/70">
          <strong className="font-semibold text-[#272e23]">Local Prototype Mode:</strong> Answers
          are computed deterministically from your saved Personal Intelligence (PI) Database on
          this device.
        </div>
      </section>

      {/* Suggested Question Chips */}
      <section aria-label="Suggested questions" className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => sendAssistantMessage(q)}
            className="secondary-action shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#272e23] whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </section>

      {/* Conversation History */}
      <section className="glass-card flex flex-col rounded-[24px] p-4 min-h-[340px] max-h-[430px] overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-[18px] px-3.5 py-2.5 text-[12.5px] leading-[18.5px] ${
                  isUser
                    ? 'bg-[#272e23] text-white rounded-br-xs'
                    : 'bg-white/80 text-[#272e23] border border-white rounded-bl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>
                {!isUser && msg.toolUsed && (
                  <div className="mt-1.5 flex items-center gap-1 border-t border-black/6 pt-1 text-[9.5px] font-medium text-[#74766d]">
                    <span>⚡ Source: {msg.toolUsed}</span>
                  </div>
                )}
              </div>
              <span className="mt-1 px-1 text-[9px] text-[#74766d]">
                {isUser ? 'You' : 'Vela'} ·{' '}
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </section>

      {/* Message Input Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-card flex items-center gap-2 rounded-[20px] p-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about your balances, bills, cushion, or spending..."
          className="flex-1 bg-transparent px-3 py-2 text-[13px] text-[#272e23] placeholder-[#74766d] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="primary-action rounded-[14px] px-4 py-2 text-[12px] font-bold disabled:opacity-45"
        >
          Send
        </button>
      </form>
    </div>
  );
};
