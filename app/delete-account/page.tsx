import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";
import { SITE, PRIVACY_CONTACT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Delete your account | Thepla House",
    description:
      "How to delete your Thepla House app account — in the app under Profile → Delete account, or by emailing us. What gets erased, what is retained anonymized, and the 7-day processing window.",
    path: "/delete-account",
  }),
  robots: { index: false, follow: true },
};

const deletePageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Delete your account — Thepla House",
  url: absUrl("/delete-account"),
  description:
    "Request deletion of your Thepla House customer app account, with or without access to the app.",
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  color: "var(--color-headline)",
  fontSize: "1.5rem",
  margin: "36px 0 12px",
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  color: "var(--ink-700)",
  fontSize: "1rem",
  lineHeight: 1.7,
  margin: "0 0 14px",
};

const list: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  color: "var(--ink-700)",
  fontSize: "1rem",
  lineHeight: 1.7,
  margin: "0 0 14px",
  paddingLeft: 22,
};

const MAILTO = `mailto:${PRIVACY_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Account deletion request — Thepla House app"
)}&body=${encodeURIComponent(
  "Please delete my Thepla House account.\n\nEmail on the account: \nPhone number on the account: \n"
)}`;

export default function DeleteAccountPage() {
  return (
    <>
      <JsonLd
        data={[
          deletePageLd,
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Delete your account", path: "/delete-account" },
          ]),
        ]}
      />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)" }}>
        <div className="th-container" style={{ paddingTop: 48, paddingBottom: 36 }}>
          <div className="seglabel">Legal</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 10px" }}>
            Delete your account
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1rem", margin: 0, maxWidth: 560 }}>
            How to delete your {SITE.shortName} app account — from inside the app, or right here if you no longer have access to it.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 20px 64px" }}>
          <h2 style={heading}>Option 1 — delete in the app (fastest)</h2>
          <p style={body}>
            Open the {SITE.shortName} app and go to <strong>Profile → Delete account</strong>. Confirm, and your account is deleted.
          </p>

          <h2 style={heading}>Option 2 — request deletion by email</h2>
          <p style={body}>
            If you can&rsquo;t access the app (lost phone, uninstalled, can&rsquo;t sign in), email us at{" "}
            <a href={MAILTO} style={{ color: "var(--color-primary)", fontWeight: 600 }}>{PRIVACY_CONTACT_EMAIL}</a> with the email
            address and/or phone number registered on your account, so we can find and verify it. Or use this pre-filled request:
          </p>
          <p style={{ margin: "0 0 14px" }}>
            <a
              href={MAILTO}
              style={{
                display: "inline-block",
                background: "var(--color-primary)",
                color: "var(--cream-50)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                padding: "12px 22px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
              }}
            >
              Email a deletion request
            </a>
          </p>
          <p style={body}>
            We may reply to the registered email or phone to confirm it&rsquo;s really you before deleting anything.
          </p>

          <h2 style={heading}>What happens when your account is deleted</h2>
          <ul style={list}>
            <li>Your profile (name, email, phone) and saved delivery addresses are permanently erased.</li>
            <li>You are signed out of the app on all devices.</li>
            <li>
              Order and payment records are retained for billing, tax and legal purposes, but they are anonymized — no longer linked
              to you or any live identity. We never store card or UPI credentials at any point.
            </li>
          </ul>

          <h2 style={heading}>How long it takes</h2>
          <p style={body}>
            In-app deletion takes effect immediately. Email requests are verified and processed <strong>within 7 days</strong> of
            receiving them. Deletion is permanent and cannot be undone.
          </p>

          <p style={body}>
            For anything else about your data, see our{" "}
            <a href="/privacy-policy" style={{ color: "var(--color-primary)" }}>privacy policy</a>.
          </p>
        </div>
      </section>
    </>
  );
}
