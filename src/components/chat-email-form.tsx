"use client";

import { useState } from "react";

type FormStatus = "idle" | "sending" | "sent";

export function ChatEmailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      let recaptchaToken: string | undefined;

      if (siteKey && window.grecaptcha) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        recaptchaToken = await window.grecaptcha.execute(siteKey, {
          action: "contact",
        });
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, recaptchaToken }),
      });

      if (!response.ok) throw new Error("Email request failed");

      setStatus("sent");
    } catch {
      setError("Your message could not be sent. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="any-chat-email-success" role="status">
        <span className="any-chat-email-success__icon" aria-hidden="true">
          ✓
        </span>
        <h3>Message sent</h3>
        <p>
          Thanks, {name}. Anera Life received your message and will reply to
          <strong> {email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setName("");
            setEmail("");
            setMessage("");
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="any-chat-email-panel">
      <div className="any-chat-email-intro">
        <span className="any-chat-email-intro__icon" aria-hidden="true">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h18v14H3V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="m4 6 8 7 8-7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h3>Email the Anera team</h3>
          <p>Send a support request and we’ll reply to your email.</p>
        </div>
      </div>

      <form className="any-chat-email-form" onSubmit={submit}>
        <label htmlFor="any-chat-email-name">Name</label>
        <input
          id="any-chat-email-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />

        <label htmlFor="any-chat-email-address">Email</label>
        <input
          id="any-chat-email-address"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="any-chat-email-message">How can we help?</label>
        <textarea
          id="any-chat-email-message"
          name="message"
          rows={5}
          minLength={10}
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="I want to know more about…"
          required
        />

        <p className="any-chat-email-privacy">
          By sending this form, you agree that Anera Life may reply to your
          email about this request. See our <a href="/privacy-policy">privacy policy</a>.
        </p>

        {error && (
          <p className="any-chat-email-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="any-chat-email-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send email"}
          {status !== "sending" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M7 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
