import type { Metadata } from "next";
import { EnquiryForm } from "@/components/blocks/EnquiryForm";
import { MapSlot } from "@/components/blocks/MapSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, organizationLd, breadcrumbLd, absUrl } from "@/lib/seo";
import {
  SITE,
  ORDER_PHONE,
  ORDER_PHONE_TEL,
  WHATSAPP_LINK,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINK,
  FRANCHISE_CONTACT,
} from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact us — order line, kitchens & enquiries | Thepla House",
  description:
    "Get in touch with Thepla House by Tejal's Kitchen — order line +91 98195 55065, WhatsApp, catering and franchise enquiries. Seven kitchens across Mumbai.",
  path: "/contact",
});

const CONTACT_METHODS: { label: string; value: string; href: string; external?: boolean }[] = [
  { label: "Order line", value: ORDER_PHONE, href: ORDER_PHONE_TEL },
  { label: "WhatsApp", value: ORDER_PHONE, href: WHATSAPP_LINK, external: true },
  {
    label: "Catering & franchise",
    value: `${FRANCHISE_CONTACT.name} · ${FRANCHISE_CONTACT.phone}`,
    href: FRANCHISE_CONTACT.phoneTel,
  },
  { label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_LINK, external: true },
];

const TOPICS = ["General enquiry", "Order help", "Catering", "Travel packs", "Franchise", "Feedback"];

function MethodCard({
  method,
}: {
  method: { label: string; value: string; href: string; external?: boolean };
}) {
  const ext = method.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={method.href}
      {...ext}
      style={{
        display: "flex",
        gap: 13,
        alignItems: "center",
        textDecoration: "none",
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xs)",
        padding: 16,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "var(--green-100)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            width: 13,
            height: 13,
            borderRadius: "50% 50% 50% 0",
            background: "var(--green-600)",
            transform: "rotate(45deg)",
          }}
        />
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--ink-500)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {method.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-headline)",
            fontWeight: 600,
            fontSize: "1.0625rem",
          }}
        >
          {method.value}
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  const contactPageLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact us — Thepla House by Tejal's Kitchen",
    url: absUrl("/contact"),
    description:
      "Get in touch with Thepla House by Tejal's Kitchen — order line, WhatsApp, catering and franchise enquiries.",
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: ORDER_PHONE,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi", "gu"],
        },
        {
          "@type": "ContactPoint",
          telephone: FRANCHISE_CONTACT.phone,
          email: FRANCHISE_CONTACT.email,
          contactType: "sales",
          areaServed: "IN",
        },
      ],
      sameAs: [INSTAGRAM_LINK, WHATSAPP_LINK],
    },
  };

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          contactPageLd,
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 36 }}>
          <div className="seglabel">Say hello</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-headline)",
              fontSize: "var(--fs-display-lg)",
              lineHeight: 1.08,
              margin: "10px 0 12px",
            }}
          >
            Contact us
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--ink-600)",
              fontSize: "var(--fs-body-lg)",
              lineHeight: 1.6,
              maxWidth: 620,
              margin: 0,
            }}
          >
            Order, ask about catering or franchising, or just tell us what you&apos;d love to see on the
            menu — we read every message.
          </p>
        </div>
      </section>

      {/* Methods + form (left) · map + hours (right) */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* left: methods + form */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 28 }}>
                {CONTACT_METHODS.map((m) => (
                  <MethodCard key={m.label} method={m} />
                ))}
              </div>

              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-outline-variant)",
                  borderRadius: "var(--radius-2xl)",
                  boxShadow: "var(--shadow-md)",
                  padding: 28,
                }}
              >
                <div className="seglabel">Drop us a line</div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-headline)",
                    fontSize: "1.5rem",
                    margin: "6px 0 16px",
                  }}
                >
                  Send a message
                </h2>
                <EnquiryForm
                  kind="contact"
                  submitLabel="Send message"
                  fields={[
                    { name: "name", label: "Your name", type: "text", required: true, placeholder: "e.g. Priya" },
                    {
                      name: "contact",
                      label: "Email or phone",
                      type: "text",
                      required: true,
                      placeholder: "How can we reach you?",
                    },
                    {
                      name: "topic",
                      label: "Topic",
                      type: "select",
                      options: TOPICS,
                      placeholder: "What's this about?",
                      full: true,
                    },
                    {
                      name: "message",
                      label: "Message",
                      type: "textarea",
                      placeholder: "Tell us a little more…",
                      full: true,
                    },
                  ]}
                />
              </div>
            </div>

            {/* right: map + hours */}
            <div style={{ position: "sticky", top: 20 }}>
              <div
                style={{
                  borderRadius: "var(--radius-2xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  height: 380,
                  marginBottom: 20,
                }}
              >
                <MapSlot
                  label="Map: Thepla House flagship kitchen, Chandivali (Andheri East)"
                  lat={19.1145}
                  lng={72.8889}
                />
              </div>
              <div
                style={{
                  background: "var(--green-700)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  color: "var(--cream-100)",
                }}
              >
                <div className="seglabel" style={{ color: "var(--gold-300)", fontSize: "0.6875rem" }}>
                  Kitchen hours
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cream-50)",
                    fontSize: "1.25rem",
                    margin: "8px 0 4px",
                  }}
                >
                  Mon–Sun · 9am – 10pm
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--green-200)",
                  }}
                >
                  Order before 11am for same-day lunch. Kandivali dine-in opens 8am.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Hungry already?"
            title="Skip the form — just order"
            body={`Order on Swiggy, Zomato or WhatsApp — or call ${ORDER_PHONE}.`}
            primaryLabel="Order now"
            primaryHref="/menu"
            secondaryLabel="See the menu"
            secondaryHref="/menu"
          />
        </div>
      </section>
    </>
  );
}
