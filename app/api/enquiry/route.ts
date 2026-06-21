import { NextResponse } from "next/server";

/**
 * Enquiry handler for the catering / franchise / contact forms.
 * TODO: wire to a real destination — email (Resend/SES), a CRM, or a sheet.
 * For now it validates the payload and logs it server-side.
 */
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

  // TODO: replace with real delivery (email/CRM/webhook).
  console.log(`[enquiry:${kind}]`, data);

  return NextResponse.json({ ok: true });
}
