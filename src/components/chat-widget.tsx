"use client";

import { useEffect, useRef, useState } from "react";
import { parseAssistantMessage } from "@/lib/chat-links";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function PrismOrb({ avatar = false }: { avatar?: boolean }) {
  return (
    <span className={`any-chat-orb${avatar ? " any-chat-orb--avatar" : ""}`} aria-hidden="true">
      <span className="any-chat-orb__blades" />
      <span className="any-chat-orb__glow" />
    </span>
  );
}

function AssistantText({ content }: { content: string }) {
  return renderChatParts(parseAssistantMessage(content), "msg");
}

function renderChatParts(parts: ReturnType<typeof parseAssistantMessage>, keyPrefix: string) {
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.type === "bold") {
      return <strong key={key}>{renderChatParts(part.parts, key)}</strong>;
    }
    if (part.type === "link") {
      if (part.href.startsWith("mailto:")) {
        return (
          <a key={key} href={part.href}>
            {part.label}
          </a>
        );
      }
      return (
        <a key={key} href={part.href} target="_blank" rel="noopener noreferrer">
          {part.label}
        </a>
      );
    }
    return <span key={key}>{part.value}</span>;
  });
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
          --any-muted: rgba(29, 29, 31, .46);
          --any-line: rgba(29, 29, 31, .12);
          --any-canvas: #f6f6f7;
          --any-field: #ffffff;
          font-family: "SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        [data-theme="dark"] .any-chat-window,
        [data-theme="dark"] .any-chat-launcher {
          --any-ink: #f5f5f7;
          --any-muted: rgba(255, 255, 255, .5);
          --any-line: rgba(255, 255, 255, .14);
          --any-canvas: #141416;
          --any-field: #1c1c1f;
        }

        .any-chat-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 950;
          width: 64px;
          height: 64px;
          padding: 0;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
        }
        .any-chat-launcher:focus-visible,
        .any-chat-close:focus-visible,
        .any-chat-input:focus-visible {
          outline: 2px solid #0071e3;
          outline-offset: 3px;
        }
        .any-chat-orb {
          width: 64px;
          height: 64px;
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 50%;
          background: #08306e;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, .35),
            0 10px 24px rgba(10, 40, 90, .28);
          contain: paint;
        }
        .any-chat-orb--avatar {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .4);
        }
        .any-chat-orb__blades,
        .any-chat-orb__glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .any-chat-orb__blades {
          inset: -18%;
          background: conic-gradient(
            from 0deg,
            #ffffff 0deg,
            #b8fbff 16deg,
            #3ad8ee 38deg,
            #1a74ee 62deg,
            #0a357f 86deg,
            #5eebf6 112deg,
            #ffffff 132deg,
            #7af3ff 150deg,
            #1680ea 176deg,
            #062a68 202deg,
            #2ec8e4 228deg,
            #f4feff 250deg,
            #1566d8 278deg,
            #0c3c86 304deg,
            #49e4f0 330deg,
            #ffffff 360deg
          );
          animation: any-orb-spin 7s linear infinite;
          will-change: transform;
        }
        .any-chat-orb__glow {
          inset: 0;
          background:
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, .92) 0 7%, rgba(255, 255, 255, .28) 16%, transparent 34%),
            radial-gradient(circle at 30% 26%, rgba(255, 255, 255, .55), transparent 28%),
            radial-gradient(circle at 50% 50%, transparent 58%, rgba(4, 24, 64, .28) 100%);
        }
        @keyframes any-orb-spin {
          to { transform: rotate(360deg); }
        }

        .any-chat-window {
          position: fixed;
          right: 24px;
          bottom: 104px;
          z-index: 950;
          width: 360px;
          max-height: min(520px, calc(100vh - 140px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 0;
          border-radius: 28px;
          background: var(--any-canvas);
          color: var(--any-ink);
          box-shadow: 0 18px 50px rgba(0, 0, 0, .12);
        }
        .any-chat-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 1;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--any-muted);
          font: inherit;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
        }
        .any-chat-close:hover { color: var(--any-ink); }
        .any-chat-messages {
          flex: 1;
          min-height: 0;
          padding: 48px 22px 8px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          overflow-y: auto;
          background: transparent;
          scrollbar-width: thin;
        }
        .any-chat-message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .any-chat-message--user {
          justify-content: flex-end;
        }
        .any-chat-message--follow {
          padding-left: 40px;
        }
        .any-chat-text {
          margin: 2px 0 0;
          max-width: 100%;
          color: var(--any-ink);
          font-size: 15px;
          font-weight: 400;
          line-height: 1.45;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .any-chat-text a {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .any-chat-text a:hover { text-decoration-thickness: 2px; }
        .any-chat-text a:focus-visible {
          outline: 2px solid #0071e3;
          outline-offset: 2px;
        }
        .any-chat-pill {
          max-width: 80%;
          margin: 0;
          padding: 10px 16px;
          border-radius: 999px;
          background: var(--any-field);
          color: var(--any-ink);
          font-size: 15px;
          line-height: 1.4;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
        }
        .any-chat-typing {
          min-height: 18px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .any-chat-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: .4;
          animation: any-chat-bounce .9s infinite;
        }
        .any-chat-typing span:nth-child(2) { animation-delay: .15s; }
        .any-chat-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes any-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-3px); }
        }
        .any-chat-composer {
          padding: 8px 16px 16px;
          flex-shrink: 0;
          background: transparent;
        }
        .any-chat-input {
          width: 100%;
          min-height: 48px;
          max-height: 120px;
          padding: 13px 18px;
          display: block;
          resize: none;
          overflow-y: auto;
          border: 1px solid var(--any-line);
          border-radius: 999px;
          background: var(--any-field);
          color: var(--any-ink);
          font: inherit;
          font-size: 15px;
          line-height: 1.4;
          box-shadow: none;
        }
        .any-chat-input::placeholder { color: var(--any-muted); }
        .any-chat-input:focus {
          outline: 2px solid #0071e3;
          outline-offset: 2px;
        }
        .any-chat-note {
          margin: 8px 8px 0;
          color: var(--any-muted);
          font-size: 11px;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .any-chat-launcher,
          .any-chat-launcher .any-chat-orb {
            width: 56px;
            height: 56px;
          }
          .any-chat-launcher {
            right: 16px;
            bottom: max(16px, env(safe-area-inset-bottom));
          }
        }
        @media (max-width: 480px) {
          .any-chat-window {
            right: 10px;
            bottom: 88px;
            width: calc(100vw - 20px);
            border-radius: 24px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .any-chat-orb__blades,
          .any-chat-typing span { animation: none; }
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
        <PrismOrb />
      </button>

      {open && (
        <section
          className="any-chat-window"
          role="dialog"
          aria-label="Chat with ANY, A New You"
          aria-modal="false"
        >
          <button
            type="button"
            className="any-chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close ANY, A New You"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="any-chat-messages" aria-live="polite">
            <div className="any-chat-message">
              <PrismOrb avatar />
              <p className="any-chat-text">
                Hi, I’m ANY. I’m Anera’s product and article assistant.
              </p>
            </div>

            {messages.map((message, index) => (
              <div
                className={`any-chat-message any-chat-message--${message.role}${message.role === "assistant" ? " any-chat-message--follow" : ""}`}
                key={`${message.role}-${index}`}
              >
                {message.role === "user" ? (
                  <p className="any-chat-pill">{message.content}</p>
                ) : (
                  <p className="any-chat-text">
                    {message.content ? <AssistantText content={message.content} /> : <TypingDots />}
                  </p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="any-chat-composer">
            <textarea
              className="any-chat-input"
              rows={1}
              placeholder="Type a message..."
              aria-label="Message to ANY, A New You"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <p className="any-chat-note">
              AI generated information only. For medical advice, consult a healthcare professional.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
