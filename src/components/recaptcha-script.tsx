"use client";

import { useEffect } from "react";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export function RecaptchaScript() {
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || LOCAL_HOSTS.has(window.location.hostname)) return;
    if (document.querySelector("script[data-recaptcha-script]")) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.dataset.recaptchaScript = "true";
    document.head.appendChild(script);
  }, []);

  return null;
}
