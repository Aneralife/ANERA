"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChatEmailForm } from "@/components/chat-email-form";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatMode = "chat" | "email";

const AVATAR_SRC = "/chat/any-doctor-avatar.webp";

function AssistantAvatar({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      className="any-chat-avatar"
      src={AVATAR_SRC}
      alt={decorative ? "" : "ANY, Anera Life AI assistant"}
      width={44}
      height={44}
    />
  );
}

function TypingDots() {
  return (
    <span className="any-chat-typing" aria-label="ANY is responding">
      <span />
      <span />
      <span />
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantText += decoder.decode(value, { stream: true });
        setMessages((previous) => {
          const updated = [...previous];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText,
          };
          return updated;
        });
      }
    } catch {
      setMessages((previous) => {
        const updated = [...previous];
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, I could not respond right now. Please try again.",
        };

        if (
          updated[updated.length - 1]?.role === "assistant" &&
          !updated[updated.length - 1].content
        ) {
          updated[updated.length - 1] = errorMessage;
          return updated;
        }

        return [...updated, errorMessage];
      });
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  return (
    <>
      <style>{`
        .any-chat-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 950;
          width: 64px;
          height: 64px;
          padding: 3px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          background: #1685e5;
          box-shadow: 0 10px 28px rgba(14, 86, 153, .35);
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .any-chat-launcher:hover {
          transform: translateY(-2px);
          box-shadow: 0 13px 32px rgba(14, 86, 153, .42);
        }
        .any-chat-launcher:focus-visible,
        .any-chat-header__close:focus-visible,
        .any-chat-send:focus-visible,
        .any-chat-input:focus-visible {
          outline: 3px solid rgba(22, 133, 229, .35);
          outline-offset: 2px;
        }
        .any-chat-launcher img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border-radius: 50%;
        }
        .any-chat-launcher__status {
          position: absolute;
          right: 0;
          bottom: 2px;
          width: 15px;
          height: 15px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          background: #25c66f;
        }

        .any-chat-window {
          position: fixed;
          right: 24px;
          bottom: 100px;
          z-index: 950;
          width: 380px;
          height: min(620px, calc(100vh - 124px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(13, 72, 125, .12);
          border-radius: 14px;
          background: #ffffff;
          color: #1f2937;
          box-shadow: 0 20px 55px rgba(19, 55, 88, .24);
          font-family: inherit;
        }

        .any-chat-header {
          min-height: 80px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          color: #ffffff;
          background: linear-gradient(110deg, #086ed0 0%, #2297ef 100%);
        }
        .any-chat-header__profile {
          display: flex;
          align-items: center;
          gap: 13px;
        }
        .any-chat-avatar {
          width: 44px;
          height: 44px;
          display: block;
          flex: 0 0 auto;
          object-fit: cover;
          border: 3px solid #ffffff;
          border-radius: 50%;
          background: #dbeeff;
        }
        .any-chat-header__title {
          margin: 0 0 2px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -.01em;
        }
        .any-chat-header__subtitle {
          margin: 0;
          color: rgba(255, 255, 255, .82);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        .any-chat-header__close {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #ffffff;
          cursor: pointer;
          transition: background .15s ease;
        }
        .any-chat-header__close:hover {
          background: rgba(255, 255, 255, .14);
        }

        .any-chat-messages {
          flex: 1;
          min-height: 0;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          background: #ffffff;
          scrollbar-color: #b9c4cf transparent;
          scrollbar-width: thin;
        }

        .any-chat-channels {
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          flex-shrink: 0;
          border-bottom: 1px solid #e4e9ee;
          background: #ffffff;
        }
        .any-chat-channel {
          height: 38px;
          padding: 0 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid #d7e0e8;
          border-radius: 8px;
          background: #ffffff;
          color: #526170;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color .15s ease, background .15s ease, color .15s ease;
        }
        .any-chat-channel:hover {
          border-color: #1685e5;
          color: #0875d3;
        }
        .any-chat-channel--active {
          border-color: #1685e5;
          background: #eaf5ff;
          color: #0875d3;
        }

        .any-chat-email-panel {
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #ffffff;
        }
        .any-chat-email-intro {
          margin-bottom: 16px;
          padding: 13px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          border-radius: 10px;
          background: #f0f2f5;
        }
        .any-chat-email-intro__icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: #1685e5;
          color: #ffffff;
        }
        .any-chat-email-intro h3,
        .any-chat-email-success h3 {
          margin: 0 0 3px;
          color: #202b38;
          font-size: 15px;
          font-weight: 700;
        }
        .any-chat-email-intro p,
        .any-chat-email-success p {
          margin: 0;
          color: #657381;
          font-size: 12px;
          line-height: 1.45;
        }
        .any-chat-email-form {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .any-chat-email-form label {
          color: #44515f;
          font-size: 11px;
          font-weight: 700;
        }
        .any-chat-email-form input,
        .any-chat-email-form textarea {
          width: 100%;
          padding: 10px 11px;
          border: 1px solid #d5dde5;
          border-radius: 8px;
          background: #ffffff;
          color: #202b38;
          font: inherit;
          font-size: 13px;
          line-height: 1.45;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .any-chat-email-form textarea {
          min-height: 104px;
          resize: vertical;
        }
        .any-chat-email-form input:focus,
        .any-chat-email-form textarea:focus {
          border-color: #1685e5;
          outline: 0;
          box-shadow: 0 0 0 3px rgba(22, 133, 229, .1);
        }
        .any-chat-email-privacy {
          margin: 4px 0 2px;
          color: #788593;
          font-size: 9px;
          line-height: 1.45;
        }
        .any-chat-email-privacy a {
          color: #0875d3;
          text-decoration: underline;
        }
        .any-chat-email-error {
          margin: 0;
          color: #b42318;
          font-size: 11px;
        }
        .any-chat-email-submit {
          width: 100%;
          height: 42px;
          margin-top: 3px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 8px;
          background: #1685e5;
          color: #ffffff;
          font: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .any-chat-email-submit:hover:not(:disabled) { background: #0875d3; }
        .any-chat-email-submit:disabled { opacity: .55; cursor: default; }
        .any-chat-email-success {
          margin: auto;
          padding: 34px 24px;
          text-align: center;
        }
        .any-chat-email-success__icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 14px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e5f8ed;
          color: #148447;
          font-size: 24px;
          font-weight: 700;
        }
        .any-chat-email-success h3 { font-size: 18px; }
        .any-chat-email-success p { margin: 0 auto; max-width: 270px; }
        .any-chat-email-success button {
          margin-top: 18px;
          padding: 9px 14px;
          border: 1px solid #1685e5;
          border-radius: 8px;
          background: #ffffff;
          color: #0875d3;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .any-chat-message {
          display: flex;
          align-items: flex-end;
          gap: 9px;
        }
        .any-chat-message--user {
          justify-content: flex-end;
        }
        .any-chat-message .any-chat-avatar {
          width: 34px;
          height: 34px;
          border-width: 2px;
          border-color: #e7edf3;
        }
        .any-chat-bubble {
          max-width: 78%;
          padding: 11px 13px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .any-chat-bubble--assistant {
          border-bottom-left-radius: 3px;
          background: #f0f2f5;
          color: #273342;
        }
        .any-chat-bubble--user {
          border-bottom-right-radius: 3px;
          background: #1685e5;
          color: #ffffff;
        }
        .any-chat-typing {
          min-width: 44px;
          min-height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .any-chat-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7a8795;
          animation: any-chat-bounce .9s infinite;
        }
        .any-chat-typing span:nth-child(2) { animation-delay: .15s; }
        .any-chat-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes any-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        .any-chat-composer {
          padding: 12px 14px 14px;
          flex-shrink: 0;
          border-top: 1px solid #e4e9ee;
          background: #ffffff;
        }
        .any-chat-input {
          width: 100%;
          min-height: 86px;
          max-height: 140px;
          padding: 12px;
          display: block;
          resize: none;
          overflow-y: auto;
          border: 1px solid #d5dde5;
          border-radius: 10px;
          background: #ffffff;
          color: #202b38;
          font: inherit;
          font-size: 14px;
          line-height: 1.45;
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .any-chat-input:focus {
          border-color: #1685e5;
          box-shadow: 0 0 0 3px rgba(22, 133, 229, .1);
        }
        .any-chat-input::placeholder { color: #8994a0; }
        .any-chat-actions {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .any-chat-note {
          margin: 0;
          max-width: 210px;
          color: #7b8794;
          font-size: 10px;
          line-height: 1.35;
        }
        .any-chat-send {
          min-width: 104px;
          height: 42px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 8px;
          background: #1685e5;
          color: #ffffff;
          font: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background .15s ease, opacity .15s ease;
        }
        .any-chat-send:hover:not(:disabled) { background: #0875d3; }
        .any-chat-send:disabled {
          opacity: .48;
          cursor: default;
        }

        @media (max-width: 480px) {
          .any-chat-window {
            right: 10px;
            bottom: 88px;
            width: calc(100vw - 20px);
            height: min(620px, calc(100dvh - 108px));
          }
          .any-chat-launcher {
            right: 14px;
            bottom: max(14px, env(safe-area-inset-bottom));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .any-chat-launcher,
          .any-chat-header__close,
          .any-chat-send { transition: none; }
          .any-chat-typing span { animation: none; }
        }
      `}</style>

      {open && (
        <section
          className="any-chat-window"
          role="dialog"
          aria-label="Chat with ANY, Anera Life AI assistant"
          aria-modal="false"
        >
          <header className="any-chat-header">
            <div className="any-chat-header__profile">
              <AssistantAvatar />
              <div>
                <p className="any-chat-header__title">Have a question?</p>
                <p className="any-chat-header__subtitle">ANY · Anera AI assistant</p>
              </div>
            </div>
            <button
              type="button"
              className="any-chat-header__close"
              onClick={() => setOpen(false)}
              aria-label="Collapse chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </header>

          <nav className="any-chat-channels" aria-label="Contact options">
            <button
              type="button"
              className={`any-chat-channel ${mode === "chat" ? "any-chat-channel--active" : ""}`}
              onClick={() => setMode("chat")}
              aria-pressed={mode === "chat"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              Ask ANY
            </button>
            <button
              type="button"
              className={`any-chat-channel ${mode === "email" ? "any-chat-channel--active" : ""}`}
              onClick={() => setMode("email")}
              aria-pressed={mode === "email"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 5h18v14H3V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="m4 6 8 7 8-7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              Email our team
            </button>
          </nav>

          {mode === "chat" ? (
            <>
              <div className="any-chat-messages" aria-live="polite">
            <div className="any-chat-message">
              <AssistantAvatar decorative />
              <div className="any-chat-bubble any-chat-bubble--assistant">
                Enter your question below and I’ll respond right away. You can ask about Anera products, science, or our latest articles.
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                className={`any-chat-message any-chat-message--${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.role === "assistant" && <AssistantAvatar decorative />}
                <div className={`any-chat-bubble any-chat-bubble--${message.role}`}>
                  {message.role === "assistant" && !message.content ? (
                    <TypingDots />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
              </div>

              <div className="any-chat-composer">
            <textarea
              ref={inputRef}
              className="any-chat-input"
              rows={3}
              placeholder="I want to know more about…"
              aria-label="Your question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <div className="any-chat-actions">
              <p className="any-chat-note">
                AI-generated information only. For medical advice, consult a healthcare professional.
              </p>
              <button
                type="button"
                className="any-chat-send"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
              >
                Send
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M7 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
              </div>
            </>
          ) : (
            <ChatEmailForm />
          )}
        </section>
      )}

      <button
        type="button"
        className="any-chat-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <Image src={AVATAR_SRC} alt="" width={52} height={52} />
        <span className="any-chat-launcher__status" aria-hidden="true" />
      </button>
    </>
  );
}
