import { NextResponse } from "next/server";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { absUrl } from "@/lib/seo";
import { SITE, ORDER_PHONE, INSTAGRAM_HANDLE, CONTACT_EMAIL } from "@/data/site";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ config */

const KIND_LABEL: Record<string, string> = {
  catering: "Catering enquiry",
  franchise: "Franchise enquiry",
  contact: "Contact form",
};

const HONEYPOT_FIELD = "company"; // hidden field; only bots fill it
const TOKEN_FIELD = "turnstileToken";
const EXCLUDED_KEYS = new Set([HONEYPOT_FIELD, TOKEN_FIELD]);

const MAX_FIELDS = 25;
const MAX_VALUE_LEN = 5000;
const MAX_TOTAL_LEN = 20000;

// Per-IP sliding-window rate limit (best-effort; per warm instance).
const RATE_MAX = 6;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Verify a Cloudflare Turnstile token. Skips (returns true) if no secret set. */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (e.g. local) — skip
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------- email render */

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function humanize(key: string): string {
  return key.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());
}

function findValue(data: Record<string, string>, needle: string): string | undefined {
  const hit = Object.keys(data).find((k) => !EXCLUDED_KEYS.has(k) && k.toLowerCase().includes(needle));
  return hit ? data[hit] : undefined;
}

/** Table of the submitted fields (honeypot/token and empties excluded). */
function fieldsTable(data: Record<string, string>): string {
  const rows = Object.entries(data)
    .filter(([k, v]) => !EXCLUDED_KEYS.has(k) && String(v ?? "").trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;font-weight:600;color:#205340;border-bottom:1px solid #efeae0;vertical-align:top;width:34%;">${escapeHtml(humanize(k))}</td><td style="padding:10px 14px;color:#333;border-bottom:1px solid #efeae0;white-space:pre-wrap;">${escapeHtml(String(v ?? ""))}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #efeae0;border-radius:10px;overflow:hidden;font-size:14px;">${rows}</table>`;
}

/** Branded wrapper used by both emails. */
function emailShell(innerHtml: string): string {
  const logo = absUrl("/logo/theplahouse-logo.png");
  return `<div style="background:#f4f1ea;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e7e1d5;">
      <div style="background:linear-gradient(135deg,#205340,#143026);padding:28px 24px;text-align:center;">
        <img src="${logo}" alt="${escapeHtml(SITE.shortName)}" width="96" height="96" style="display:inline-block;border:0;outline:none;" />
        <div style="font-size:24px;font-weight:800;color:#FFF8EC;letter-spacing:1px;margin-top:10px;">THEPLA HOUSE</div>
        <div style="font-size:13px;color:#F3B53C;font-style:italic;margin-top:3px;">by Tejal's Kitchen &middot; Junk the Junk Food.</div>
      </div>
      <div style="padding:28px;color:#333;font-size:15px;line-height:1.62;">${innerHtml}</div>
      <div style="background:#205340;padding:20px 24px;text-align:center;color:#FFF8EC;font-size:13px;line-height:1.8;">
        Call / WhatsApp: <strong>${escapeHtml(ORDER_PHONE)}</strong><br/>
        <a href="${SITE.url}" style="color:#F3B53C;text-decoration:none;">theplahouse.com</a>
        &middot; Instagram ${escapeHtml(INSTAGRAM_HANDLE)}
        &middot; <a href="mailto:${escapeHtml(CONTACT_EMAIL)}" style="color:#F3B53C;text-decoration:none;">${escapeHtml(CONTACT_EMAIL)}</a>
      </div>
    </div>
    <div style="max-width:600px;margin:12px auto 0;text-align:center;color:#9a8f86;font-size:11px;">7 kitchens across Mumbai, Thane &amp; Navi Mumbai &middot; 100% vegetarian</div>
  </div>`;
}

function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#205340;color:#FFF8EC;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:8px;">${escapeHtml(label)}</a>`;
}

function renderConfirmation(kind: string, data: Record<string, string>): string {
  const name = findValue(data, "name");
  const what = (KIND_LABEL[kind] || "enquiry").toLowerCase();
  return emailShell(
    `<p style="margin:0 0 12px;">Hi ${escapeHtml(name || "there")},</p>
     <p style="margin:0 0 14px;">Thank you for reaching out to <strong>Thepla House by Tejal's Kitchen</strong> — we've received your ${escapeHtml(what)} and a member of our team will get back to you shortly.</p>
     <div style="margin:18px 0 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9a8f86;">What you sent us</div>
     ${fieldsTable(data)}
     <p style="margin:18px 0 14px;">If it's urgent, call or WhatsApp us on <strong>${escapeHtml(ORDER_PHONE)}</strong>.</p>
     <div style="text-align:center;margin:22px 0 6px;">${ctaButton(`${SITE.url}/menu`, "Browse the menu")}</div>
     <p style="margin:18px 0 0;">Warm regards,<br/>Team Thepla House</p>`,
  );
}

function renderNotification(kind: string, data: Record<string, string>, replyTo?: string): string {
  const name = findValue(data, "name");
  const title = KIND_LABEL[kind] || "Website enquiry";
  return emailShell(
    `<p style="margin:0 0 14px;font-size:16px;">New <strong>${escapeHtml(title)}</strong> from the website${name ? ` — <strong>${escapeHtml(name)}</strong>` : ""}.</p>
     ${fieldsTable(data)}
     <p style="margin:16px 0 0;color:#888;font-size:12px;">Reply directly to this email to respond${replyTo ? ` to ${escapeHtml(replyTo)}` : ""}. Sent from the ${escapeHtml(kind)} form on ${escapeHtml(SITE.url)}.</p>`,
  );
}

/* -------------------------------------------------------------- recipients */

function recipients(): string[] {
  return (process.env.ENQUIRY_EMAILS || "management@theplahouse.com,dhaval@datagami.in")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------------------- routes */

/** Diagnostic: booleans only, no secret values. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isEmailConfigured(),
    captcha: Boolean(process.env.TURNSTILE_SECRET_KEY),
  });
}

export async function POST(request: Request) {
  let payload: { kind?: string; data?: Record<string, string> };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { kind, data } = payload;
  if (!kind || !data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "Missing kind or data" }, { status: 422 });
  }

  // 1) Honeypot — bots fill the hidden field. Pretend success, send nothing.
  if (typeof data[HONEYPOT_FIELD] === "string" && data[HONEYPOT_FIELD].trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2) Size / field caps.
  const keys = Object.keys(data);
  let total = 0;
  for (const k of keys) {
    const len = String(data[k] ?? "").length;
    total += len;
    if (len > MAX_VALUE_LEN) {
      return NextResponse.json({ ok: false, error: "A field is too long." }, { status: 422 });
    }
  }
  if (keys.length > MAX_FIELDS || total > MAX_TOTAL_LEN) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 422 });
  }

  // 3) Rate limit per IP.
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  // 4) CAPTCHA (Cloudflare Turnstile) — skipped if no secret configured.
  const passed = await verifyTurnstile(data[TOKEN_FIELD], ip);
  if (!passed) {
    return NextResponse.json(
      { ok: false, error: "Captcha verification failed. Please try again." },
      { status: 403 },
    );
  }

  const name = findValue(data, "name");
  const userEmail = findValue(data, "email");
  const subject = `${KIND_LABEL[kind] || "Website enquiry"}${name ? ` — ${name}` : ""}`;
  const to = recipients();

  if (!isEmailConfigured()) {
    console.warn(`[enquiry:${kind}] SMTP not configured; logging only`, data);
    return NextResponse.json({ ok: true });
  }

  // 5a) Internal notification — must succeed.
  try {
    await sendEmail({ to, subject, html: renderNotification(kind, data, userEmail), replyTo: userEmail });
  } catch (err) {
    console.error(`[enquiry:${kind}] notification send failed`, err);
    return NextResponse.json(
      { ok: false, error: "Sorry, we couldn't send your enquiry. Please try again or call us." },
      { status: 502 },
    );
  }

  // 5b) Confirmation to the enquirer — best effort.
  if (userEmail && userEmail.includes("@")) {
    try {
      await sendEmail({
        to: userEmail,
        subject: `We've received your ${(KIND_LABEL[kind] || "enquiry").toLowerCase()} — ${SITE.shortName}`,
        html: renderConfirmation(kind, data),
        replyTo: to[0],
      });
    } catch (err) {
      console.error(`[enquiry:${kind}] confirmation send failed`, err);
    }
  }

  return NextResponse.json({ ok: true });
}
