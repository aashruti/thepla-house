import { NextResponse } from "next/server";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { FRANCHISE_CONTACT, SITE } from "@/data/site";

export const runtime = "nodejs";

/**
 * Enquiry handler for the catering / franchise / contact forms.
 * Delivers each submission as an email via the SMTP helper (see lib/email.ts),
 * routing franchise enquiries to the franchise contact as well.
 */

const KIND_LABEL: Record<string, string> = {
  catering: "Catering enquiry",
  franchise: "Franchise enquiry",
  contact: "Contact form",
};

/** Comma-separated inbox(es) for general enquiries; franchise also CCs the franchise contact. */
function recipientsFor(kind: string): string[] {
  const base = (process.env.ENQUIRY_EMAILS || "info@theplahouse.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (kind === "franchise") base.push(FRANCHISE_CONTACT.email);
  return Array.from(new Set(base));
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

function renderHtml(kind: string, data: Record<string, string>): string {
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

  const recipients = recipientsFor(kind);
  const name = findValue(data, "name");
  const replyTo = findValue(data, "email");
  const subject = `${KIND_LABEL[kind] || "Website enquiry"}${name ? ` — ${name}` : ""}`;
  const html = renderHtml(kind, data);

  try {
    if (isEmailConfigured()) {
      await sendEmail({ to: recipients, subject, html, replyTo });
    } else {
      // No SMTP configured (e.g. local dev) — log so nothing is lost.
      console.warn(`[enquiry:${kind}] SMTP not configured; logging only`, data);
    }
  } catch (err) {
    console.error(`[enquiry:${kind}] email send failed`, err);
    return NextResponse.json(
      { ok: false, error: "Sorry, we couldn't send your enquiry. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
