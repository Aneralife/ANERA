import { NextRequest, NextResponse } from "next/server";
import { Agent } from "undici";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@aneralife.com";
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_THRESHOLD = 0.5;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ipv4Agent = new Agent({ connect: { family: 4 } });

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

function isLocalHost(host: string | null) {
  if (!host) return false;
  const hostname = host.startsWith("[")
    ? host.slice(1, host.indexOf("]"))
    : host.split(":")[0];
  return LOCAL_HOSTS.has(hostname);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

async function verifyRecaptcha(token: string) {
  if (!RECAPTCHA_SECRET) return true;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: RECAPTCHA_SECRET,
      response: token,
    }).toString(),
    // @ts-expect-error undici dispatcher is not part of the standard RequestInit type
    dispatcher: ipv4Agent,
  });

  if (!response.ok) return false;

  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  return Boolean(
    result.success &&
      (result.score ?? 0) >= RECAPTCHA_THRESHOLD &&
      result.action === "contact"
  );
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    // @ts-expect-error undici dispatcher is not part of the standard RequestInit type
    dispatcher: ipv4Agent,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "Unknown Resend error");
    console.error("[contact] Resend request failed:", response.status, body);
    throw new Error("Resend request failed");
  }
}

export async function POST(request: NextRequest) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name =
    typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const recaptchaToken =
    typeof body.recaptchaToken === "string" ? body.recaptchaToken : "";

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const maySkipRecaptcha =
    process.env.NODE_ENV !== "production" && isLocalHost(request.headers.get("host"));

  if (RECAPTCHA_SECRET && !maySkipRecaptcha) {
    if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await sendEmail({
      to: NOTIFY_EMAIL,
      subject: `Website support request from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px;color:#17202a;">
          <h1 style="font-size:22px;margin:0 0 24px;">New website support request</h1>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="margin-top:24px;padding:20px;background:#f4f6f8;border-radius:10px;line-height:1.6;">${safeMessage}</div>
          <p style="margin-top:24px;color:#69737d;font-size:12px;">Sent from the Anera Life website chat widget.</p>
        </div>
      `,
    });

  } catch {
    return NextResponse.json(
      { error: "Email service unavailable" },
      { status: 502 }
    );
  }

  // The support notification is the required delivery. A confirmation failure
  // should not tell the visitor to retry and create a duplicate support email.
  try {
    await sendEmail({
      to: email,
      subject: "We received your message — Anera Life",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#17202a;">
          <h1 style="font-size:22px;margin:0 0 12px;">Thanks for contacting Anera Life</h1>
          <p style="line-height:1.6;">Hi ${safeName},</p>
          <p style="line-height:1.6;">We received your message and a member of our team will reply as soon as possible.</p>
          <div style="margin:24px 0;padding:18px;background:#f4f6f8;border-radius:10px;line-height:1.6;">${safeMessage}</div>
          <p style="color:#69737d;font-size:13px;">Anera Life · Richmond, BC, Canada</p>
        </div>
      `,
    });
  } catch {
    console.error("[contact] Customer confirmation email failed");
  }

  return NextResponse.json({ ok: true });
}
