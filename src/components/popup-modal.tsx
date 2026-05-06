"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "anera_popup_dismissed";

export function PopupModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  function handleCancel() {
    setVisible(false);
  }

  function handleDoNotShow() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  return (
    <div className="popup-overlay" onClick={handleCancel}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="popup__close" onClick={handleCancel} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video */}
        <div className="popup__video-wrap">
          <video
            src="/popup-video.webm"
            autoPlay
            muted
            loop
            playsInline
            className="popup__video"
          />
          {/* Gradient overlay for text legibility */}
          <div className="popup__video-gradient" />

          {/* Brand text on video */}
          <div className="popup__video-text">
            <div className="popup__brand">ANERA</div>
            <p className="popup__tagline">Pharmaceutical-grade NMN.<br />Pure. Proven. Life-changing.</p>
            <p className="popup__offer-text">Get 10% off your first order — send us your email at <strong>info@aneralife.com</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="popup__footer">
          <button className="popup__btn-dismiss" onClick={handleDoNotShow}>
            Don&apos;t show this again
          </button>
          <button className="popup__btn-cta" onClick={handleCancel}>
            Shop Now
          </button>
        </div>

      </div>
    </div>
  );
}
