import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "subscribers.json");
const DISCOUNT_CODE = process.env.DISCOUNT_CODE || "WELCOME10";
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@aneralife.com";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Save to subscribers file
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    let list: { email: string; date: string }[] = [];
    try {
      const raw = await fs.readFile(FILE, "utf-8");
      list = JSON.parse(raw);
    } catch { /* file doesn't exist yet */ }

    if (!list.find((e) => e.email === email)) {
      list.push({ email, date: new Date().toISOString() });
      await fs.writeFile(FILE, JSON.stringify(list, null, 2));
    }
  } catch (err) {
    console.error("Failed to save subscriber:", err);
  }

  // Send discount code to the user
  await sendEmail(
    email,
    "Your 10% off code — Anera Life",
    `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
      <h1 style="font-size:24px;font-weight:800;color:#0a0a0a;margin:0 0 8px;">Here's your 10% off</h1>
      <p style="color:#555;font-size:15px;margin:0 0 24px;">
        Thanks for joining Anera Life. Use the code below at checkout:
      </p>
      <div style="background:#f5f5f5;border-radius:10px;padding:20px;text-align:center;margin-bottom:24px;">
        <span style="font-size:28px;font-weight:800;letter-spacing:0.1em;color:#0a0a0a;">${DISCOUNT_CODE}</span>
      </div>
      <p style="color:#888;font-size:13px;">
        This code gives you 10% off your first order.
        <a href="https://aneralife.com/products" style="color:#0a0a0a;">Shop now →</a>
      </p>
    </div>
    `
  );

  // Notify the client
  await sendEmail(
    NOTIFY_EMAIL,
    `New subscriber: ${email}`,
    `<p>New email subscriber: <strong>${email}</strong></p><p>Discount code sent: <strong>${DISCOUNT_CODE}</strong></p>`
  );

  return NextResponse.json({ ok: true });
}
