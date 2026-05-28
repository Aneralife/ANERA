"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const STORAGE_KEY = "anera_popup_dismissed";

export function PopupModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  function handleClose() { setVisible(false); }
  function handleDoNotShow() { localStorage.setItem(STORAGE_KEY, "true"); setVisible(false); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      let recaptchaToken: string | undefined;
      if (siteKey && window.grecaptcha) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "subscribe" });
      }
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken }),
      });
      if (res.ok) {
        setSubmitted(true);
        localStorage.setItem(STORAGE_KEY, "true");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>

        {/* Close button — top-right of entire popup */}
        <button className="popup__close" onClick={handleClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Top — video */}
        <div className="popup__left">
          <video src="/popup-video.webm" autoPlay muted loop playsInline className="popup__video" />
        </div>

        {/* Bottom — content */}
        <div className="popup__right">

          {submitted ? (
            <div className="popup__body">
              <p className="popup__eyebrow">You&apos;re all set!</p>
              <h2 className="popup__headline">Check your email!</h2>
              <p className="popup__sub">We&apos;ve sent your 10% off code to <strong>{email}</strong>. Use it at checkout on your first order.</p>
              <button className="popup__submit" onClick={handleClose}>Shop Now</button>
            </div>
          ) : (
            <div className="popup__body">
              <p className="popup__eyebrow">More Energy. Better Aging</p>
              <h2 className="popup__headline">10% OFF TO START</h2>
              <p className="popup__sub">Join thousands transforming their daily lives with Anera NMN. Pure. Proven. Life-changing.</p>
              <form className="popup__form" onSubmit={handleSubmit}>
                <input
                  className="popup__input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="popup__submit" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Send My Code"}
                </button>
              </form>
              {error && <p style={{ color: "#c0392b", fontSize: 13, margin: 0 }}>{error}</p>}
              <button className="popup__skip" onClick={handleDoNotShow}>No thanks</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
