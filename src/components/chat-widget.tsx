"use client";

import { useEffect, useRef, useState } from "react";
import { ChatEmailForm } from "@/components/chat-email-form";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatMode = "chat" | "email";

function AneraMark({ decorative = false }: { decorative?: boolean }) {
  return (
    <span className="any-chat-mark" aria-hidden={decorative ? true : undefined}>
      ANERA
    </span>
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      <style dangerouslySetInnerHTML={{ __html: `
        .any-chat-window,
        .any-chat-launcher {
          --any-ink: #1d1d1f;
          --any-muted: rgba(29, 29, 31, .58);
          --any-line: rgba(29, 29, 31, .12);
          --any-gold: #c9a96e;
          --any-canvas: #ffffff;
          --any-shadow: rgba(0, 0, 0, .12);
          font-family: "SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        [data-theme="dark"] .any-chat-window,
        [data-theme="dark"] .any-chat-launcher {
          --any-ink: #ffffff;
          --any-muted: rgba(255, 255, 255, .58);
          --any-line: rgba(255, 255, 255, .14);
          --any-canvas: #0a0a0a;
          --any-shadow: rgba(0, 0, 0, .4);
        }

        .any-chat-mark {
          display: inline-block;
          color: inherit;
          font-weight: 700;
          letter-spacing: .3em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .any-chat-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 950;
          width: 56px;
          height: 56px;
          padding: 0;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--any-ink);
          box-shadow: none;
          cursor: pointer;
        }
        .any-chat-launcher:focus-visible,
        .any-chat-header__close:focus-visible,
        .any-chat-channel:focus-visible,
        .any-chat-email-submit:focus-visible,
        .any-chat-email-success button:focus-visible,
        .any-chat-send:focus-visible,
        .any-chat-email-privacy a:focus-visible {
          outline: 2px solid #0071e3;
          outline-offset: 3px;
        }
        .any-chat-orb {
          width: 56px;
          height: 56px;
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 50%;
          background: #161210;
          box-shadow:
            inset 0 0 0 1px rgba(255, 244, 226, .22),
            inset 0 -14px 18px rgba(16, 10, 8, .42),
            0 10px 24px rgba(0, 0, 0, .22);
          animation: any-orb-breathe 8.5s ease-in-out infinite;
          contain: paint;
        }
        .any-chat-orb__wash,
        .any-chat-orb__mist,
        .any-chat-orb__grain,
        .any-chat-orb__shade {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
        }
        .any-chat-orb__wash,
        .any-chat-orb__mist {
          inset: -46%;
          border-radius: 50%;
          will-change: transform;
        }
        .any-chat-orb__wash {
          background:
            radial-gradient(circle at 36% 34%, rgba(236, 214, 164, .96) 0 16%, transparent 42%),
            radial-gradient(circle at 68% 46%, rgba(214, 156, 146, .78) 0 18%, transparent 46%),
            radial-gradient(circle at 42% 74%, rgba(90, 74, 104, .62) 0 20%, transparent 48%),
            radial-gradient(circle at 24% 64%, rgba(36, 28, 24, .92) 0 22%, transparent 50%);
          animation: any-orb-drift 22s ease-in-out infinite alternate;
        }
        .any-chat-orb__mist {
          background:
            radial-gradient(circle at 58% 32%, rgba(201, 169, 110, .55) 0 14%, transparent 40%),
            radial-gradient(circle at 30% 58%, rgba(176, 122, 124, .5) 0 18%, transparent 44%),
            radial-gradient(circle at 62% 70%, rgba(48, 36, 52, .55) 0 16%, transparent 42%);
          mix-blend-mode: soft-light;
          animation: any-orb-drift 31s ease-in-out infinite alternate-reverse;
        }
        .any-chat-orb__grain {
          opacity: .34;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          background-size: 80px 80px;
        }
        .any-chat-orb__shade {
          background:
            radial-gradient(circle at 34% 28%, rgba(255, 248, 236, .78) 0%, rgba(255, 248, 236, 0) 24%),
            radial-gradient(circle at 50% 54%, transparent 46%, rgba(14, 9, 8, .5) 100%);
          animation: any-orb-sheen 13s ease-in-out infinite alternate;
        }
        .any-chat-launcher:hover .any-chat-orb {
          box-shadow:
            inset 0 0 0 1px rgba(255, 244, 226, .34),
            inset 0 -14px 18px rgba(16, 10, 8, .42),
            0 14px 28px rgba(0, 0, 0, .28);
        }
        @keyframes any-orb-drift {
          0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          100% { transform: translate3d(-10%, -8%, 0) rotate(36deg) scale(1.14); }
        }
        @keyframes any-orb-sheen {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(5%, 3%, 0); }
        }
        @keyframes any-orb-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }
        .any-chat-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .any-chat-window {
          position: fixed;
          right: 24px;
          bottom: 96px;
          z-index: 950;
          width: 400px;
          height: min(640px, calc(100vh - 112px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--any-line);
          border-radius: 2px;
          background: var(--any-canvas);
          color: var(--any-ink);
          box-shadow: 0 16px 48px var(--any-shadow);
        }

        .any-chat-header {
          position: relative;
          padding: 18px 16px 16px 18px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-shrink: 0;
          background: var(--any-canvas);
          border-bottom: 1px solid var(--any-gold);
        }
        .any-chat-header__identity {
          min-width: 0;
        }
        .any-chat-header__eyebrow {
          margin: 0 0 8px;
          display: flex;
          align-items: baseline;
          gap: 10px;
          color: var(--any-muted);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .any-chat-header__eyebrow .any-chat-mark {
          color: var(--any-ink);
          font-size: 13px;
          letter-spacing: .3em;
        }
        .any-chat-header__title {
          margin: 0 0 4px;
          color: var(--any-ink);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -.025em;
        }
        .any-chat-header__subtitle {
          margin: 0;
          color: var(--any-muted);
          font-size: 12px;
          font-weight: 500;
          line-height: 1.35;
        }
        .any-chat-header__close {
          width: 32px;
          height: 32px;
          margin-top: 1px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid var(--any-line);
          border-radius: 50%;
          background: transparent;
          color: var(--any-ink);
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease;
        }
        .any-chat-header__close:hover {
          border-color: var(--any-ink);
          background: transparent;
        }

        .any-chat-channels {
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          flex-shrink: 0;
          border-bottom: 1px solid var(--any-line);
          background: var(--any-canvas);
        }
        .any-chat-channel {
          height: 36px;
          padding: 0 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          background: transparent;
          color: var(--any-muted);
          font: inherit;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color .18s ease, background .18s ease, border-color .18s ease;
        }
        .any-chat-channel:hover {
          color: var(--any-ink);
        }
        .any-chat-channel--active {
          border-color: #1d1d1f;
          background: #1d1d1f;
          color: #ffffff;
        }
        [data-theme="dark"] .any-chat-channel--active {
          border-color: #ffffff;
          background: #ffffff;
          color: #1d1d1f;
        }

        .any-chat-messages {
          flex: 1;
          min-height: 0;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          background: var(--any-canvas);
          scrollbar-color: var(--any-line) transparent;
          scrollbar-width: thin;
        }
        .any-chat-message {
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }
        .any-chat-message--user {
          justify-content: flex-end;
        }
        .any-chat-message .any-chat-mark {
          flex: 0 0 auto;
          padding-bottom: 4px;
          color: var(--any-muted);
          font-size: 8px;
          letter-spacing: .14em;
        }
        .any-chat-bubble {
          max-width: 82%;
          padding: 12px 14px;
          border-radius: 2px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .any-chat-bubble--assistant {
          border: 1px solid var(--any-line);
          background: transparent;
          color: var(--any-ink);
        }
        .any-chat-bubble--user {
          background: #1d1d1f;
          color: #ffffff;
        }
        [data-theme="dark"] .any-chat-bubble--user {
          background: #ffffff;
          color: #1d1d1f;
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
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: .45;
          animation: any-chat-bounce .9s infinite;
        }
        .any-chat-typing span:nth-child(2) { animation-delay: .15s; }
        .any-chat-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes any-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-3px); }
        }

        .any-chat-composer {
          padding: 14px 16px 16px;
          flex-shrink: 0;
          border-top: 1px solid var(--any-line);
          background: var(--any-canvas);
        }
        .any-chat-input,
        .any-chat-email-form input,
        .any-chat-email-form textarea {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid var(--any-line);
          border-radius: 2px;
          background: transparent;
          color: var(--any-ink);
          font: inherit;
          font-size: 14px;
          line-height: 1.45;
          box-shadow: none;
          transition: border-color .18s ease;
        }
        .any-chat-input {
          min-height: 88px;
          max-height: 140px;
          display: block;
          resize: none;
          overflow-y: auto;
        }
        .any-chat-input:focus,
        .any-chat-email-form input:focus,
        .any-chat-email-form textarea:focus {
          outline: 2px solid #0071e3;
          outline-offset: 2px;
        }
        .any-chat-input::placeholder,
        .any-chat-email-form input::placeholder,
        .any-chat-email-form textarea::placeholder {
          color: var(--any-muted);
        }
        .any-chat-actions {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .any-chat-note {
          margin: 0;
          max-width: 220px;
          color: var(--any-muted);
          font-size: 10px;
          line-height: 1.4;
        }
        .any-chat-send,
        .any-chat-email-submit {
          min-width: 108px;
          height: 40px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #1d1d1f;
          border-radius: 2px;
          background: #1d1d1f;
          color: #ffffff;
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: .04em;
          cursor: pointer;
          box-shadow: none;
          transition: opacity .18s ease, background .18s ease, color .18s ease;
        }
        .any-chat-email-submit {
          width: 100%;
          margin-top: 4px;
          text-transform: none;
          letter-spacing: .02em;
        }
        [data-theme="dark"] .any-chat-send,
        [data-theme="dark"] .any-chat-email-submit {
          border-color: #ffffff;
          background: #ffffff;
          color: #1d1d1f;
        }
        .any-chat-send:hover:not(:disabled),
        .any-chat-email-submit:hover:not(:disabled) {
          opacity: .82;
        }
        .any-chat-send:disabled,
        .any-chat-email-submit:disabled {
          opacity: .4;
          cursor: default;
        }

        .any-chat-email-panel {
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: var(--any-canvas);
          scrollbar-color: var(--any-line) transparent;
          scrollbar-width: thin;
        }
        .any-chat-email-intro {
          margin-bottom: 16px;
          padding: 0 0 14px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border: 0;
          border-bottom: 1px solid var(--any-line);
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .any-chat-email-intro__icon {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border: 1px solid var(--any-line);
          border-radius: 50%;
          background: transparent;
          color: var(--any-ink);
          box-shadow: none;
        }
        .any-chat-email-intro h3,
        .any-chat-email-success h3 {
          margin: 0 0 4px;
          color: var(--any-ink);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -.015em;
        }
        .any-chat-email-intro p,
        .any-chat-email-success p {
          margin: 0;
          color: var(--any-muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .any-chat-email-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .any-chat-email-form label {
          color: var(--any-muted);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .any-chat-email-form textarea {
          min-height: 112px;
          resize: vertical;
        }
        .any-chat-email-privacy {
          margin: 4px 0 2px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: var(--any-muted);
          font-size: 10px;
          line-height: 1.5;
        }
        .any-chat-email-privacy a {
          color: var(--any-ink);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .any-chat-email-error {
          margin: 0;
          color: #b42318;
          font-size: 11px;
        }
        .any-chat-email-success {
          margin: auto;
          padding: 34px 24px;
          text-align: center;
        }
        .any-chat-email-success__icon {
          width: 44px;
          height: 44px;
          margin: 0 auto 14px;
          display: grid;
          place-items: center;
          border: 1px solid var(--any-ink);
          border-radius: 50%;
          background: transparent;
          color: var(--any-ink);
          font-size: 18px;
          font-weight: 600;
        }
        .any-chat-email-success h3 { font-size: 18px; }
        .any-chat-email-success p { margin: 0 auto; max-width: 270px; }
        .any-chat-email-success button {
          margin-top: 18px;
          padding: 10px 16px;
          border: 1px solid var(--any-line);
          border-radius: 2px;
          background: transparent;
          color: var(--any-ink);
          font: inherit;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .04em;
          cursor: pointer;
        }
        .any-chat-email-success button:hover {
          border-color: var(--any-ink);
        }

        @media (max-width: 640px) {
          .any-chat-launcher,
          .any-chat-orb {
            width: 52px;
            height: 52px;
          }
          .any-chat-launcher {
            right: 16px;
            bottom: max(16px, env(safe-area-inset-bottom));
          }
        }
        @media (max-width: 480px) {
          .any-chat-window {
            right: 10px;
            bottom: 84px;
            width: calc(100vw - 20px);
            height: min(620px, calc(100dvh - 108px));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .any-chat-launcher,
          .any-chat-header__close,
          .any-chat-channel,
          .any-chat-send,
          .any-chat-email-submit { transition: none; }
          .any-chat-typing span,
          .any-chat-orb,
          .any-chat-orb__wash,
          .any-chat-orb__mist,
          .any-chat-orb__shade { animation: none; }
        }
      ` }} />

      <button
        type="button"
        className="any-chat-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close ANY, A New You" : "Open ANY, A New You"}
        title="ANY, A New You"
        aria-expanded={open}
      >
        <span className="any-chat-orb" aria-hidden="true">
          <span className="any-chat-orb__wash" />
          <span className="any-chat-orb__mist" />
          <span className="any-chat-orb__grain" />
          <span className="any-chat-orb__shade" />
        </span>
      </button>

      {open && (
        <section
          className="any-chat-window"
          role="dialog"
          aria-label="Chat with ANY, A New You"
          aria-modal="false"
        >
          <header className="any-chat-header">
            <div className="any-chat-header__identity">
              <p className="any-chat-header__eyebrow">
                <AneraMark />
                <span>Concierge</span>
              </p>
              <p className="any-chat-header__title">
                ANY
                <span className="any-chat-sr">, A New You</span>
              </p>
              <p className="any-chat-header__subtitle">Product guidance, science notes, and article support.</p>
            </div>
            <button
              type="button"
              className="any-chat-header__close"
              onClick={() => setOpen(false)}
              aria-label="Collapse chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              Ask ANY
            </button>
            <button
              type="button"
              className={`any-chat-channel ${mode === "email" ? "any-chat-channel--active" : ""}`}
              onClick={() => setMode("email")}
              aria-pressed={mode === "email"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 5h18v14H3V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="m4 6 8 7 8-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              Email our team
            </button>
          </nav>

          {mode === "chat" ? (
            <>
              <div className="any-chat-messages" aria-live="polite">
            <div className="any-chat-message">
              <AneraMark decorative />
              <div className="any-chat-bubble any-chat-bubble--assistant">
                Hi, I’m ANY. I’m Anera’s product and article assistant. Ask me about NMN, product quality, the science, or our latest articles.
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                className={`any-chat-message any-chat-message--${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.role === "assistant" && <AneraMark decorative />}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M7 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
    </>
  );
}
