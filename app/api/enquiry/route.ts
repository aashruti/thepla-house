import { NextResponse } from "next/server";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { SITE, ORDER_PHONE, INSTAGRAM_HANDLE } from "@/data/site";

export const runtime = "nodejs";

/**
 * Enquiry handler for the catering / franchise / contact forms.
 * Emails every submission to the enquiry inbox(es) and sends the enquirer a
 * confirmation. SMTP is configured via env (see lib/email.ts + .env.example).
 */

const KIND_LABEL: Record<string, string> = {
  catering: "Catering enquiry",
  franchise: "Franchise enquiry",
  contact: "Contact form",
};

/** Inbox(es) that receive all enquiries (catering, franchise and contact). */
function recipients(): string[] {
  return (process.env.ENQUIRY_EMAILS || "management@theplahouse.com,dhaval@datagami.in")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function humanize(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function findValue(data: Record<string, string>, needle: string): string | undefined {
  const hit = Object.keys(data).find((k) => k.toLowerCase().includes(needle));
  return hit ? data[hit] : undefined;
}

/** Internal notification — full table of the submitted fields. */
function renderNotificationHtml(kind: string, data: Record<string, string>): string {
  const rows = Object.entries(data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;font-weight:600;color:#205340;border-bottom:1px solid #eee;vertical-align:top;">${escapeHtml(humanize(k))}</td><td style="padding:8px 14px;color:#333;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(String(v ?? ""))}</td></tr>`,
    )
    .join("");
  const title = KIND_LABEL[kind] || "Website enquiry";
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#205340;color:#FFF8EC;padding:18px 24px;border-radius:8px 8px 0 0;">
      <div style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#F3B53C;">${escapeHtml(SITE.shortName)}</div>
      <h2 style="margin:4px 0 0;font-size:22px;">${escapeHtml(title)}</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-top:none;">${rows}</table>
    <p style="color:#888;font-size:12px;margin:14px 24px;">Sent from the ${escapeHtml(SITE.url)} ${escapeHtml(kind)} form.</p>
  </div>`;
}

/** Confirmation sent to the person who submitted the form. */
function renderConfirmationHtml(kind: string, data: Record<string, string>): string {
  const name = findValue(data, "name");
  const what = (KIND_LABEL[kind] || "enquiry").toLowerCase();
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#205340;color:#FFF8EC;padding:22px 24px;border-radius:8px 8px 0 0;text-align:center;">
      <div style="font-size:24px;font-weight:800;letter-spacing:1px;">THEPLA HOUSE</div>
      <div style="font-size:13px;color:#F3B53C;font-style:italic;margin-top:2px;">by Tejal's Kitchen · Junk the Junk Food.</div>
    </div>
    <div style="background:#fff;border:1px solid #eee;border-top:none;padding:24px;color:#333;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 12px;">Hi ${escapeHtml(name || "there")},</p>
      <p style="margin:0 0 12px;">Thank you for reaching out to <strong>Thepla House by Tejal's Kitchen</strong> — we've received your ${escapeHtml(what)} and a member of our team will get back to you shortly.</p>
      <p style="margin:0 0 12px;">If it's urgent, call or WhatsApp us on <strong>${escapeHtml(ORDER_PHONE)}</strong>.</p>
      <p style="margin:18px 0 0;">Warm regards,<br/>Team Thepla House</p>
    </div>
    <p style="color:#888;font-size:12px;text-align:center;margin:14px 24px;">${escapeHtml(SITE.url)} · Instagram ${escapeHtml(INSTAGRAM_HANDLE)}</p>
  </div>`;
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

  if (!isEmailConfigured()) {
    // No SMTP configured (e.g. local dev without .env.local) — log so nothing is lost.
    console.warn(`[enquiry:${kind}] SMTP not configured; logging only`, data);
    return NextResponse.json({ ok: true });
  }

  const to = recipients();
  const name = findValue(data, "name");
  const userEmail = findValue(data, "email");
  const subject = `${KIND_LABEL[kind] || "Website enquiry"}${name ? ` — ${name}` : ""}`;

  // 1) Internal notification — must succeed.
  try {
    await sendEmail({ to, subject, html: renderNotificationHtml(kind, data), replyTo: userEmail });
  } catch (err) {
    console.error(`[enquiry:${kind}] notification send failed`, err);
    return NextResponse.json(
      { ok: false, error: "Sorry, we couldn't send your enquiry. Please try again or call us." },
      { status: 502 },
    );
  }

  // 2) Confirmation to the enquirer — best effort, never fails the request.
  if (userEmail && userEmail.includes("@")) {
    try {
      await sendEmail({
        to: userEmail,
        subject: `We've received your ${(KIND_LABEL[kind] || "enquiry").toLowerCase()} — ${SITE.shortName}`,
        html: renderConfirmationHtml(kind, data),
        replyTo: to[0],
      });
    } catch (err) {
      console.error(`[enquiry:${kind}] confirmation send failed`, err);
    }
  }

  return NextResponse.json({ ok: true });
}
