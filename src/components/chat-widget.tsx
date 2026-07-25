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
        .any-chat-window,
        .any-chat-launcher {
          --any-ink: #1d1d1f;
          --any-muted: rgba(29, 29, 31, .58);
          --any-soft: #f5f5f7;
          --any-line: rgba(29, 29, 31, .1);
          --any-blue: #0071e3;
          --any-gold: #c9a96e;
          --any-shadow: rgba(6, 14, 30, .24);
          font-family: var(--font, "SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif);
        }
        [data-theme="dark"] .any-chat-window,
        [data-theme="dark"] .any-chat-launcher {
          --any-ink: #ffffff;
          --any-muted: rgba(255, 255, 255, .58);
          --any-soft: #111111;
          --any-line: rgba(255, 255, 255, .1);
          --any-shadow: rgba(0, 0, 0, .42);
        }

        .any-chat-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 950;
          min-width: 138px;
          height: 58px;
          padding: 5px 14px 5px 5px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, .2);
          border-radius: 999px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, .04)),
            rgba(12, 14, 18, .82);
          color: #ffffff;
          box-shadow: 0 18px 42px rgba(0, 0, 0, .26), inset 0 1px 0 rgba(255,255,255,.16);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          cursor: pointer;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .any-chat-launcher:hover {
          transform: translateY(-3px);
          border-color: rgba(201, 169, 110, .48);
          box-shadow: 0 22px 48px rgba(0, 0, 0, .32), inset 0 1px 0 rgba(255,255,255,.18);
        }
        .any-chat-launcher:focus-visible,
        .any-chat-header__close:focus-visible,
        .any-chat-channel:focus-visible,
        .any-chat-email-submit:focus-visible,
        .any-chat-email-success button:focus-visible,
        .any-chat-send:focus-visible,
        .any-chat-input:focus-visible,
        .any-chat-email-form input:focus-visible,
        .any-chat-email-form textarea:focus-visible {
          outline: 3px solid rgba(0, 113, 227, .2);
          outline-offset: 2px;
        }
        .any-chat-launcher img {
          width: 46px;
          height: 46px;
          display: block;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, .68);
          border-radius: 50%;
        }
        .any-chat-launcher__copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }
        .any-chat-launcher__label {
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -.01em;
        }
        .any-chat-launcher__sub {
          margin-top: 5px;
          color: rgba(255,255,255,.62);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .any-chat-launcher__status {
          position: absolute;
          left: 40px;
          bottom: 7px;
          width: 12px;
          height: 12px;
          border: 2px solid #101217;
          border-radius: 50%;
          background: #3ddc84;
        }

        .any-chat-window {
          position: fixed;
          right: 24px;
          bottom: 96px;
          z-index: 950;
          width: 408px;
          height: min(660px, calc(100vh - 124px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .56);
          border-radius: 28px;
          background:
            radial-gradient(circle at 18% -12%, rgba(0, 113, 227, .16), transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,248,250,.94));
          color: var(--any-ink);
          box-shadow: 0 28px 80px var(--any-shadow), 0 0 0 1px rgba(29,29,31,.04);
          backdrop-filter: blur(24px) saturate(145%);
          -webkit-backdrop-filter: blur(24px) saturate(145%);
        }
        [data-theme="dark"] .any-chat-window {
          border-color: rgba(255,255,255,.1);
          background:
            radial-gradient(circle at 18% -12%, rgba(0, 113, 227, .18), transparent 28%),
            linear-gradient(180deg, rgba(18,18,20,.96), rgba(10,10,10,.94));
          box-shadow: 0 28px 80px var(--any-shadow), 0 0 0 1px rgba(255,255,255,.04);
        }

        .any-chat-header {
          position: relative;
          min-height: 112px;
          padding: 18px 20px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 12%, rgba(201, 169, 110, .34), transparent 28%),
            radial-gradient(circle at 85% -20%, rgba(0, 113, 227, .32), transparent 34%),
            linear-gradient(135deg, #07090d 0%, #17191f 58%, #101823 100%);
          border-bottom: 1px solid rgba(255,255,255,.08);
          isolation: isolate;
        }
        .any-chat-header::after {
          content: "";
          position: absolute;
          inset: auto 20px 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,.8), transparent);
          opacity: .62;
          z-index: -1;
        }
        .any-chat-header__profile {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .any-chat-avatar {
          width: 48px;
          height: 48px;
          display: block;
          flex: 0 0 auto;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,.84);
          border-radius: 50%;
          background: #f1f4f8;
          box-shadow: 0 0 0 1px rgba(201,169,110,.48), 0 8px 20px rgba(0,0,0,.18);
        }
        .any-chat-header__eyebrow {
          margin: 0 0 5px;
          color: var(--any-gold);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .any-chat-header__title {
          margin: 0 0 4px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 750;
          letter-spacing: -.025em;
        }
        .any-chat-header__subtitle {
          margin: 0;
          color: rgba(255, 255, 255, .64);
          font-size: 12px;
          font-weight: 500;
          line-height: 1.3;
        }
        .any-chat-header__close {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 50%;
          background: rgba(255, 255, 255, .06);
          color: rgba(255,255,255,.78);
          cursor: pointer;
          transition: background .18s ease, color .18s ease, border-color .18s ease;
        }
        .any-chat-header__close:hover {
          border-color: rgba(255,255,255,.22);
          background: rgba(255, 255, 255, .12);
          color: #ffffff;
        }

        .any-chat-messages {
          flex: 1;
          min-height: 0;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          background:
            linear-gradient(180deg, rgba(255,255,255,.76), rgba(250,250,251,.88)),
            radial-gradient(circle at 0 0, rgba(201,169,110,.1), transparent 34%);
          scrollbar-color: rgba(29,29,31,.22) transparent;
          scrollbar-width: thin;
        }
        [data-theme="dark"] .any-chat-messages,
        [data-theme="dark"] .any-chat-email-panel {
          background:
            linear-gradient(180deg, rgba(16,16,18,.78), rgba(10,10,10,.9)),
            radial-gradient(circle at 0 0, rgba(201,169,110,.12), transparent 34%);
          scrollbar-color: rgba(255,255,255,.24) transparent;
        }

        .any-chat-channels {
          padding: 12px 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(29,29,31,.08);
          background: rgba(255,255,255,.72);
        }
        [data-theme="dark"] .any-chat-channels {
          border-bottom-color: rgba(255,255,255,.08);
          background: rgba(15,15,16,.76);
        }
        .any-chat-channel {
          height: 40px;
          padding: 0 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: rgba(29,29,31,.045);
          color: rgba(29,29,31,.62);
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease, transform .18s ease;
        }
        [data-theme="dark"] .any-chat-channel {
          background: rgba(255,255,255,.07);
          color: rgba(255,255,255,.62);
        }
        .any-chat-channel:hover {
          color: var(--any-ink);
          transform: translateY(-1px);
        }
        .any-chat-channel--active {
          border-color: rgba(29,29,31,.08);
          background: #1d1d1f;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(29,29,31,.18);
        }
        [data-theme="dark"] .any-chat-channel--active {
          border-color: rgba(255,255,255,.12);
          background: #ffffff;
          color: #1d1d1f;
          box-shadow: 0 10px 24px rgba(0,0,0,.26);
        }

        .any-chat-email-panel {
          flex: 1;
          min-height: 0;
          padding: 18px;
          overflow-y: auto;
          background:
            linear-gradient(180deg, rgba(255,255,255,.82), rgba(250,250,251,.92)),
            radial-gradient(circle at 0 0, rgba(201,169,110,.1), transparent 34%);
        }
        .any-chat-email-intro {
          margin-bottom: 18px;
          padding: 15px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border: 1px solid rgba(29,29,31,.07);
          border-radius: 18px;
          background: rgba(255,255,255,.78);
          box-shadow: 0 12px 30px rgba(0,0,0,.05);
        }
        [data-theme="dark"] .any-chat-email-intro,
        [data-theme="dark"] .any-chat-bubble--assistant {
          border-color: rgba(255,255,255,.09);
          background: rgba(255,255,255,.07);
          box-shadow: 0 12px 30px rgba(0,0,0,.18);
        }
        .any-chat-email-intro__icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #1d1d1f, #34363d);
          color: #ffffff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18);
        }
        .any-chat-email-intro h3,
        .any-chat-email-success h3 {
          margin: 0 0 4px;
          color: var(--any-ink);
          font-size: 15px;
          font-weight: 750;
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
          color: rgba(29,29,31,.72);
          font-size: 11px;
          font-weight: 750;
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        [data-theme="dark"] .any-chat-email-form label {
          color: rgba(255,255,255,.72);
        }
        .any-chat-email-form input,
        .any-chat-email-form textarea {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid rgba(29,29,31,.1);
          border-radius: 14px;
          background: rgba(255,255,255,.86);
          color: var(--any-ink);
          font: inherit;
          font-size: 13px;
          line-height: 1.45;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8);
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        [data-theme="dark"] .any-chat-email-form input,
        [data-theme="dark"] .any-chat-email-form textarea,
        [data-theme="dark"] .any-chat-input {
          border-color: rgba(255,255,255,.11);
          background: rgba(255,255,255,.065);
          color: #ffffff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }
        .any-chat-email-form textarea {
          min-height: 112px;
          resize: vertical;
        }
        .any-chat-email-form input:focus,
        .any-chat-email-form textarea:focus {
          border-color: rgba(0, 113, 227, .44);
          outline: 0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, .08), inset 0 1px 0 rgba(255,255,255,.8);
        }
        [data-theme="dark"] .any-chat-email-form input:focus,
        [data-theme="dark"] .any-chat-email-form textarea:focus,
        [data-theme="dark"] .any-chat-input:focus {
          border-color: rgba(0, 113, 227, .6);
          background: rgba(255,255,255,.09);
          box-shadow: 0 0 0 4px rgba(0, 113, 227, .16), inset 0 1px 0 rgba(255,255,255,.06);
        }
        .any-chat-email-privacy {
          margin: 6px 0 4px;
          padding: 10px 12px;
          border: 1px solid rgba(29,29,31,.06);
          border-radius: 14px;
          background: rgba(29,29,31,.035);
          color: rgba(29,29,31,.5);
          font-size: 10px;
          line-height: 1.5;
        }
        [data-theme="dark"] .any-chat-email-privacy {
          border-color: rgba(255,255,255,.07);
          background: rgba(255,255,255,.055);
          color: rgba(255,255,255,.5);
        }
        .any-chat-email-privacy a {
          color: var(--any-ink);
          font-weight: 700;
          text-decoration: none;
        }
        .any-chat-email-error {
          margin: 0;
          color: #b42318;
          font-size: 11px;
        }
        .any-chat-email-submit {
          width: 100%;
          height: 46px;
          margin-top: 3px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #1d1d1f, #36383f);
          color: #ffffff;
          font: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(29,29,31,.18), inset 0 1px 0 rgba(255,255,255,.14);
          transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
        }
        .any-chat-email-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(29,29,31,.22), inset 0 1px 0 rgba(255,255,255,.16);
        }
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
          background: rgba(61, 220, 132, .14);
          color: #157347;
          font-size: 24px;
          font-weight: 700;
        }
        .any-chat-email-success h3 { font-size: 18px; }
        .any-chat-email-success p { margin: 0 auto; max-width: 270px; }
        .any-chat-email-success button {
          margin-top: 18px;
          padding: 10px 16px;
          border: 1px solid rgba(29,29,31,.12);
          border-radius: 999px;
          background: #ffffff;
          color: var(--any-ink);
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        [data-theme="dark"] .any-chat-email-success button {
          border-color: rgba(255,255,255,.12);
          background: rgba(255,255,255,.08);
          color: #ffffff;
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
          width: 36px;
          height: 36px;
          border-width: 1px;
          border-color: rgba(255,255,255,.9);
          box-shadow: 0 6px 16px rgba(0,0,0,.1);
        }
        .any-chat-bubble {
          max-width: 80%;
          padding: 12px 14px;
          border-radius: 20px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .any-chat-bubble--assistant {
          border-bottom-left-radius: 6px;
          border: 1px solid rgba(29,29,31,.075);
          background: rgba(255,255,255,.86);
          color: rgba(29,29,31,.88);
          box-shadow: 0 10px 24px rgba(0,0,0,.055);
        }
        [data-theme="dark"] .any-chat-bubble--assistant {
          color: rgba(255,255,255,.86);
        }
        .any-chat-bubble--user {
          border-bottom-right-radius: 6px;
          background:
            linear-gradient(135deg, rgba(0,113,227,.98), rgba(11,18,32,.98));
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(0,113,227,.18);
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
          background: rgba(29,29,31,.45);
          animation: any-chat-bounce .9s infinite;
        }
        .any-chat-typing span:nth-child(2) { animation-delay: .15s; }
        .any-chat-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes any-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        .any-chat-composer {
          padding: 14px 16px 16px;
          flex-shrink: 0;
          border-top: 1px solid rgba(29,29,31,.08);
          background: rgba(255,255,255,.84);
        }
        [data-theme="dark"] .any-chat-composer {
          border-top-color: rgba(255,255,255,.08);
          background: rgba(15,15,16,.84);
        }
        .any-chat-input {
          width: 100%;
          min-height: 92px;
          max-height: 140px;
          padding: 13px 14px;
          display: block;
          resize: none;
          overflow-y: auto;
          border: 1px solid rgba(29,29,31,.1);
          border-radius: 18px;
          background: rgba(255,255,255,.9);
          color: var(--any-ink);
          font: inherit;
          font-size: 14px;
          line-height: 1.45;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8);
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .any-chat-input:focus {
          border-color: rgba(0, 113, 227, .44);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, .08), inset 0 1px 0 rgba(255,255,255,.8);
        }
        .any-chat-input::placeholder { color: rgba(29,29,31,.42); }
        [data-theme="dark"] .any-chat-input::placeholder {
          color: rgba(255,255,255,.4);
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
          max-width: 210px;
          color: rgba(29,29,31,.45);
          font-size: 10px;
          line-height: 1.4;
        }
        [data-theme="dark"] .any-chat-note {
          color: rgba(255,255,255,.46);
        }
        .any-chat-send {
          min-width: 108px;
          height: 46px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #1d1d1f, #36383f);
          color: #ffffff;
          font: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(29,29,31,.18), inset 0 1px 0 rgba(255,255,255,.14);
          transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
        }
        .any-chat-send:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(29,29,31,.22), inset 0 1px 0 rgba(255,255,255,.16);
        }
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
            border-radius: 22px;
          }
          .any-chat-launcher {
            right: 14px;
            bottom: max(14px, env(safe-area-inset-bottom));
            min-width: 58px;
            width: 58px;
            padding: 5px;
          }
          .any-chat-launcher__copy {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .any-chat-launcher,
          .any-chat-header__close,
          .any-chat-channel,
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
                <p className="any-chat-header__eyebrow">ANERA CONCIERGE</p>
                <p className="any-chat-header__title">Ask ANY</p>
                <p className="any-chat-header__subtitle">Product guidance, science notes, and article support.</p>
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
                Hi, I’m ANY — Anera’s product and article assistant. Ask me about NMN, product quality, the science, or our latest articles.
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
        <span className="any-chat-launcher__copy" aria-hidden="true">
          <span className="any-chat-launcher__label">Ask ANY</span>
          <span className="any-chat-launcher__sub">Anera concierge</span>
        </span>
        <span className="any-chat-launcher__status" aria-hidden="true" />
      </button>
    </>
  );
}
