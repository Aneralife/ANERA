"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantText,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      <style>{`
        .chat-widget-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 900;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--fg);
          color: var(--bg);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,.2);
          transition: transform .2s, opacity .2s;
        }
        .chat-widget-btn:hover { transform: scale(1.07); }

        .chat-window {
          position: fixed;
          bottom: 90px;
          right: 28px;
          z-index: 900;
          width: 360px;
          max-height: 520px;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          border: 1px solid var(--border);
          box-shadow: 0 8px 40px rgba(0,0,0,.15);
          border-radius: 2px;
          overflow: hidden;
        }

        .chat-header {
          padding: 14px 18px;
          background: var(--fg);
          color: var(--bg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .chat-header__info { display: flex; align-items: center; gap: 10px; }
        .chat-header__dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
        }
        .chat-header__title {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: .04em;
        }
        .chat-header__sub {
          font-size: 10px;
          opacity: .55;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .chat-header__close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          opacity: .6;
          padding: 2px;
          line-height: 1;
          font-size: 18px;
          transition: opacity .15s;
        }
        .chat-header__close:hover { opacity: 1; }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .chat-empty {
          margin: auto;
          text-align: center;
          padding: 24px 16px;
        }
        .chat-empty__icon { font-size: 28px; margin-bottom: 10px; }
        .chat-empty__text {
          font-size: 13px;
          color: var(--fg-secondary);
          line-height: 1.6;
        }

        .chat-bubble {
          max-width: 85%;
          padding: 10px 13px;
          font-size: 13px;
          line-height: 1.65;
          border-radius: 2px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .chat-bubble--user {
          align-self: flex-end;
          background: var(--fg);
          color: var(--bg);
        }
        .chat-bubble--assistant {
          align-self: flex-start;
          background: var(--bg-alt);
          color: var(--fg);
          border: 1px solid var(--border);
        }

        .chat-typing {
          align-self: flex-start;
          background: var(--bg-alt);
          border: 1px solid var(--border);
          padding: 10px 14px;
          border-radius: 2px;
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .chat-typing span {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--fg-muted);
          animation: chat-bounce .9s infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: .15s; }
        .chat-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .chat-footer {
          border-top: 1px solid var(--border);
          padding: 10px 12px;
          display: flex;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
          background: var(--bg);
        }
        .chat-input {
          flex: 1;
          resize: none;
          border: 1px solid var(--border);
          background: var(--bg-alt);
          color: var(--fg);
          font-family: inherit;
          font-size: 13px;
          line-height: 1.5;
          padding: 8px 10px;
          border-radius: 2px;
          outline: none;
          max-height: 96px;
          overflow-y: auto;
          transition: border-color .15s;
        }
        .chat-input:focus { border-color: var(--fg); }
        .chat-input::placeholder { color: var(--fg-muted); }
        .chat-send {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          background: var(--fg);
          color: var(--bg);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity .15s;
        }
        .chat-send:disabled { opacity: .35; cursor: default; }
        .chat-send:not(:disabled):hover { opacity: .8; }

        @media (max-width: 480px) {
          .chat-window {
            right: 12px;
            bottom: 80px;
            width: calc(100vw - 24px);
          }
          .chat-widget-btn { right: 16px; bottom: 16px; }
        }
      `}</style>

      {/* Toggle button */}
      <button
        className="chat-widget-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header__info">
              <div className="chat-header__dot" />
              <div>
                <div className="chat-header__title">ANY</div>
                <div className="chat-header__sub">A New You</div>
              </div>
            </div>
            <button className="chat-header__close" onClick={() => setOpen(false)}>×</button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty__icon">✦</div>
                <p className="chat-empty__text">
                  Ask me anything about Anera Life — our products, science, team, or mission.
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`chat-bubble chat-bubble--${m.role}`}
                >
                  {m.content}
                </div>
              ))
            )}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-footer">
            <textarea
              ref={inputRef}
              className="chat-input"
              rows={1}
              placeholder="Ask about Anera…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={loading}
            />
            <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
