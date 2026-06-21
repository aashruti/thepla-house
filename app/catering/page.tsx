import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { EnquiryForm, type EnquiryField } from "@/components/blocks/EnquiryForm";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, breadcrumbLd } from "@/lib/seo";
import { ORDER_PHONE, ORDER_PHONE_TEL, WHATSAPP_LINK } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Catering for events & pooja — full Jain menus | Thepla House",
  description:
    "Home-style Gujarati catering in Mumbai for poojas, weddings, corporate events and house parties. Full Jain menus, 100% vegetarian, cooked fresh. Plan your order with Thepla House.",
  path: "/catering",
});

const OCCASIONS = [
  {
    t: "Poojas & festivals",
    s: "Satvik and full Jain menus for home ceremonies and festivals.",
    subject: "Satvik pooja thali spread on a banana leaf",
    alt: "Pooja catering spread",
    img: "catering:pooja",
  },
  {
    t: "Weddings & functions",
    s: "Generous Gujarati spreads that scale to a full hall.",
    subject: "Large wedding buffet of Gujarati dishes",
    alt: "Wedding catering buffet",
    img: "catering:wedding",
  },
  {
    t: "Corporate & office",
    s: "Wholesome boxed thalis and snack platters for teams.",
    subject: "Boxed office thalis stacked neatly",
    alt: "Corporate thali boxes",
    img: "catering:corporate",
  },
  {
    t: "House parties",
    s: "Farsan, chaat and live counters for get-togethers.",
    subject: "Farsan and chaat platters for a house party",
    alt: "House party farsan platters",
    img: "catering:houseparty",
  },
];

const STEPS = [
  { n: "1", t: "Tell us the details", s: "Date, headcount, occasion and any Jain or vegan needs." },
  { n: "2", t: "We craft the menu", s: "A home-style spread tailored to you — full Jain menus available." },
  { n: "3", t: "Fresh on the day", s: "Cooked the morning of, delivered hot and ready to serve." },
];

const INCLUDED = [
  "Full Jain menus — no onion, garlic or root vegetables",
  "100% vegetarian, whole wheat, no palm oil",
  "Vegan and fasting (farali) options",
  "Scales from 25 to 250+ guests",
];

const CATERING_FIELDS: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, placeholder: "e.g. Priya Shah" },
  { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  {
    name: "occasion",
    label: "Occasion",
    type: "select",
    placeholder: "Select an occasion",
    options: ["Pooja / festival", "Wedding / function", "Corporate / office", "House party", "Other"],
  },
  { name: "eventDate", label: "Event date", type: "text", placeholder: "e.g. 12 Aug 2026" },
  {
    name: "guests",
    label: "Approx. guests",
    type: "select",
    placeholder: "How many?",
    options: ["Up to 25", "25–50", "50–100", "100–250", "250+"],
  },
  {
    name: "message",
    label: "Anything else?",
    type: "textarea",
    placeholder: "Date, Jain menu, delivery area, favourite dishes…",
    full: true,
  },
];

export default function CateringPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Event & pooja catering",
            description:
              "Home-style Gujarati catering in Mumbai for poojas, weddings, corporate events and house parties. Full Jain menus, 100% vegetarian, cooked fresh.",
            path: "/catering",
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Catering", path: "/catering" },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="seglabel">Catering</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 18px" }}>
                Catering for events &amp; pooja
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 520 }}>
                Home-style Gujarati spreads cooked fresh for gatherings of any size — with full Jain menus available, 100% vegetarian, made with whole-wheat atta and no preservatives.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  href="#cater-form"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}
                >
                  Plan a catering order
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 26px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="hero-photo" style={{ height: 420, boxShadow: "var(--shadow-lg)", borderRadius: "var(--radius-2xl)" }}>
              <PhotoSlot
                subject="Catering spread — large brass platters of thali items, sweets and farsan for an event"
                alt="Thepla House catering platters laid out for an event"
                src={img("catering")}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">We cater</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              For every kind of gathering
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OCCASIONS.map((o) => (
              <div
                key={o.t}
                style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}
              >
                <div style={{ height: 150 }}>
                  <PhotoSlot subject={o.subject} alt={o.alt} src={img(o.img)} style={{ height: "100%", width: "100%" }} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.25rem" }}>{o.t}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: 4 }}>{o.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, left: -16, width: 150, opacity: 0.3 }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>How it works</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              Three easy steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((st) => (
              <div key={st.n} style={{ textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "var(--gold-400)", color: "var(--ink-900)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 14 }}>
                  {st.n}
                </span>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontWeight: 600, fontSize: "1.25rem", marginBottom: 6 }}>{st.t}</div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.9375rem", lineHeight: 1.55 }}>{st.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="cater-form" style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="seglabel">Plan your order</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 16px" }}>
                Tell us about your event
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 20px" }}>
                Share a few details and we&apos;ll come back with a fresh, home-style menu tailored to your occasion — Jain, vegan or mixed.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {INCLUDED.map((i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "1rem" }}>
                    <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ display: "inline-block", width: 6, height: 11, border: "solid var(--green-600)", borderWidth: "0 2px 2px 0", transform: "rotate(45deg)", marginBottom: 2 }} />
                    </span>
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", padding: 28 }}>
              <EnquiryForm kind="catering" fields={CATERING_FIELDS} submitLabel="Send enquiry" />
              <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.875rem", textAlign: "center", marginTop: 12 }}>
                Prefer to talk?{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
                  WhatsApp
                </a>{" "}
                or call{" "}
                <a href={ORDER_PHONE_TEL} style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
                  {ORDER_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Big day coming up?"
            title="Let's plan your menu together"
            body="Full Jain menus available, cooked fresh on the day — for poojas, weddings and corporate events."
            primaryLabel="Plan a catering order"
            primaryHref="#cater-form"
            secondaryLabel="WhatsApp us"
            secondaryHref={WHATSAPP_LINK}
          />
        </div>
      </section>
    </>
  );
}
