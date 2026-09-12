import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";
import {
  SITE,
  LEGAL_ENTITY_NAME,
  LEGAL_REGISTERED_ADDRESS,
  PRIVACY_CONTACT_EMAIL,
} from "@/data/site";

const EFFECTIVE_DATE = "29 July 2026";
const LAST_UPDATED = "29 July 2026";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy policy | Thepla House by Tejal's Kitchen",
    description:
      "How the Thepla House by Tejal's Kitchen app collects, uses and protects your data — account details, delivery addresses, location, payments via Razorpay, and your rights under India's DPDP Act 2023.",
    path: "/privacy-policy",
  }),
  robots: { index: false, follow: true },
};

const privacyPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy policy — Thepla House by Tejal's Kitchen",
  url: absUrl("/privacy-policy"),
  description:
    "Privacy policy for the Thepla House by Tejal's Kitchen customer app and website, governed by the Digital Personal Data Protection Act, 2023 (India).",
  dateModified: "2026-07-29",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          privacyPageLd,
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy-policy" },
          ]),
        ]}
      />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)" }}>
        <div className="th-container" style={{ paddingTop: 48, paddingBottom: 36 }}>
          <div className="seglabel">Legal</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 10px" }}>
            Privacy policy
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", margin: 0 }}>
            Effective date: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "8px 20px 64px" }}>
          <p style={body}>
            This policy explains how <strong>{LEGAL_ENTITY_NAME}</strong> (&ldquo;{SITE.shortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), registered at{" "}
            <strong>{LEGAL_REGISTERED_ADDRESS}</strong>, collects and uses your personal data when you use the {SITE.name} customer
            app and website to order food. It is governed by Indian law, including the Digital Personal Data Protection Act, 2023
            (&ldquo;DPDP Act&rdquo;).
          </p>

          <h2 style={heading}>What we collect, and why</h2>
          <p style={body}>We only collect data the service actually needs:</p>
          <ul style={list}>
            <li>
              <strong>Account data</strong> — your name, email address and phone number, used to create your account, sign you in and
              contact you about your orders.
            </li>
            <li>
              <strong>Delivery addresses and precise location (GPS)</strong> — used to deliver your order and to work out the nearest
              kitchen that can serve you. Address autocomplete is powered by the Google Places API, so the text you type in the address
              search is sent to Google to return suggestions.
            </li>
            <li>
              <strong>Contacts (optional)</strong> — only if you tap &ldquo;pick from contacts&rdquo; to pre-fill a delivery
              receiver&rsquo;s name and number. The app reads just the single contact you pick; your contact list is never uploaded in
              bulk, and you can always type the details manually instead.
            </li>
            <li>
              <strong>Payment information</strong> — online payments are processed by Razorpay. We never see or store your card
              number, CVV or UPI credentials; we keep only payment references (such as a payment ID) and amounts to match payments to
              orders and handle refunds. Cash on delivery is available if you prefer not to pay online.
            </li>
            <li>
              <strong>Order history and wallet</strong> — your past orders, wallet balance and wallet transactions, kept so the app
              can show your history, credit refunds and apply wallet payments.
            </li>
          </ul>

          <h2 style={heading}>Third parties we share data with</h2>
          <p style={body}>We share data only with the processors needed to run the service:</p>
          <ul style={list}>
            <li>
              <strong>Razorpay</strong> — payment processing. Razorpay handles your payment instrument under its own privacy policy.
            </li>
            <li>
              <strong>Google Maps / Google Places</strong> — maps display and address autocomplete.
            </li>
            <li>
              <strong>Microsoft Azure</strong> — our servers and databases are hosted on Microsoft Azure in an India region.
            </li>
          </ul>
          <p style={body}>We do not sell your personal data, and we do not share it with advertisers.</p>

          <h2 style={heading}>How long we keep your data</h2>
          <ul style={list}>
            <li>
              <strong>Profile data</strong> (name, email, phone, saved addresses) is erased when you delete your account.
            </li>
            <li>
              <strong>Order and payment records</strong> are retained for billing, tax and other legal obligations, but after account
              deletion they are anonymized — they are no longer linked to a live identity.
            </li>
          </ul>

          <h2 style={heading}>Your rights</h2>
          <p style={body}>
            Under the DPDP Act you can ask us to access, correct or delete the personal data we hold about you. You can delete your
            account yourself in the app (Profile → Delete account) or via our{" "}
            <a href="/delete-account" style={{ color: "var(--color-primary)" }}>account deletion page</a>. For any other privacy
            request, email{" "}
            <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} style={{ color: "var(--color-primary)" }}>{PRIVACY_CONTACT_EMAIL}</a> from the
            email address on your account, and we will respond as required under Indian law.
          </p>

          <h2 style={heading}>Changes to this policy</h2>
          <p style={body}>
            If we change how we handle your data, we will update this page and the &ldquo;last updated&rdquo; date above. Material
            changes will also be announced in the app.
          </p>

          <h2 style={heading}>Contact</h2>
          <p style={body}>
            {LEGAL_ENTITY_NAME}
            <br />
            {LEGAL_REGISTERED_ADDRESS}
            <br />
            Email: <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} style={{ color: "var(--color-primary)" }}>{PRIVACY_CONTACT_EMAIL}</a>
          </p>
        </div>
      </section>
    </>
  );
}
