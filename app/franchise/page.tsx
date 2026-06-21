import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { EnquiryForm } from "@/components/blocks/EnquiryForm";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd } from "@/lib/seo";
import { FRANCHISE_CONTACT } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Open a Thepla House franchise — Tejal's Kitchen | Franchise opportunity",
  description:
    "Partner with Thepla House by Tejal's Kitchen — a proven 100% vegetarian, founder-led cloud-kitchen brand from Mumbai. Explore franchise opportunities. Contact Mr. Dhaval Shah.",
  path: "/franchise",
});

const STATS = [
  { n: "2018", l: "Founder-led, since" },
  { n: "7", l: "Kitchens in Mumbai" },
  { n: "250+", l: "Proven menu dishes" },
  { n: "100%", l: "Vegetarian brand" },
];

const REASONS = [
  {
    t: "A trusted, founder-led brand",
    s: "Built by Tejal since 2018, with a loyal Mumbai following and a clear, health-first story.",
  },
  {
    t: "A proven, repeatable menu",
    s: "250+ standardised dishes with recipes, SOPs and training you can rely on.",
  },
  {
    t: "Cloud-kitchen efficiency",
    s: "A lean footprint built for delivery — Swiggy, Zomato and WhatsApp from day one.",
  },
  {
    t: "Health-first positioning",
    s: "100% whole wheat, no palm oil, no preservatives — exactly what diners are looking for.",
  },
];

const STEPS = [
  { n: "1", t: "Enquire", s: "Send the form or call our franchise lead." },
  { n: "2", t: "Discovery call", s: "We discuss your city, format and fit." },
  { n: "3", t: "Set up", s: "Site, kitchen, supply chain and training." },
  { n: "4", t: "Launch", s: "Go live with ongoing brand and ops support." },
];

const FORMATS = ["Cloud kitchen (delivery)", "Dine-in outlet", "Both", "Not sure yet"];

const FRANCHISE_FAQS = [
  {
    q: "What franchise formats are available?",
    a: "Thepla House offers a delivery-first cloud-kitchen format as well as dine-in outlets. You can also start with a combination — tell us your city and we'll talk through what fits best.",
  },
  {
    q: "Which cities are you expanding to?",
    a: "We're a founder-led brand from Mumbai looking to bring Tejal's kitchen to new cities. Share your city or region in the enquiry form and our franchise lead will discuss the opportunity.",
  },
  {
    q: "What support do franchise partners receive?",
    a: "Partners get our proven 250+ dish menu with recipes and SOPs, training, supply-chain setup and ongoing brand and operations support — from enquiry right through to launch.",
  },
  {
    q: "Who do I contact about a franchise?",
    a: `Reach out to ${FRANCHISE_CONTACT.name} at ${FRANCHISE_CONTACT.phone} or ${FRANCHISE_CONTACT.email}, or send the enquiry form on this page and we'll get back to you.`,
  },
];

export default function FranchisePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Thepla House franchise opportunity",
            description:
              "Partner with Thepla House by Tejal's Kitchen — a proven 100% vegetarian, founder-led cloud-kitchen brand from Mumbai. Explore franchise formats, support and the path to launch.",
            path: "/franchise",
          }),
          faqPageLd(FRANCHISE_FAQS),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="seglabel">Franchise opportunity</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 18px" }}>
                Open a Thepla House franchise
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 520 }}>
                Bring Tejal&apos;s kitchen to your city. Partner with a proven, founder-led 100% vegetarian cloud-kitchen brand that&apos;s been winning Mumbai&apos;s trust since 2018 — with a 250+ dish menu and a health-first story that sells.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="#fr-form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Franchise enquiry
                </Link>
                <a href={FRANCHISE_CONTACT.phoneTel} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 26px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Call {FRANCHISE_CONTACT.name}
                </a>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 420 }}>
              <PhotoSlot
                subject="A bright Thepla House outlet counter / cloud-kitchen interior, branded"
                alt="Thepla House outlet counter"
                src={img("franchise")}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--gold-50)" }}>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} />
        <div className="th-container" style={{ paddingTop: 44, paddingBottom: 44 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" style={{ textAlign: "center" }}>
            {STATS.map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "2.75rem", fontWeight: 600, lineHeight: 1 }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", marginTop: 6 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} flip />
      </section>

      {/* Why partner with us */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">Why partner with us</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              A brand people already trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REASONS.map((r) => (
              <div key={r.t} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "var(--gold-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 15, height: 15, borderRadius: "50% 50% 50% 0", background: "var(--gold-600)", transform: "rotate(45deg)" }} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.25rem" }}>
                    {r.t}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55, marginTop: 4 }}>
                    {r.s}
                  </div>
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
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>How it works</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              From enquiry to launch
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((st) => (
              <div key={st.n} style={{ textAlign: "center", paddingTop: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "var(--gold-400)", color: "var(--ink-900)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.375rem", marginBottom: 14 }}>
                  {st.n}
                </span>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontWeight: 600, fontSize: "1.125rem", marginBottom: 5 }}>
                  {st.t}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  {st.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="fr-form" style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="seglabel">Get in touch</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 16px" }}>
                Franchise enquiry
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 24px" }}>
                Tell us a little about yourself and where you&apos;d like to open. Our franchise lead will get back to you to talk through formats, support and next steps.
              </p>
              <div style={{ background: "var(--green-700)", borderRadius: "var(--radius-xl)", padding: 24, color: "var(--cream-100)" }}>
                <div className="seglabel" style={{ color: "var(--gold-300)", fontSize: "0.6875rem" }}>Franchise contact</div>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "1.5rem", margin: "8px 0 4px" }}>
                  {FRANCHISE_CONTACT.name}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", marginBottom: 2 }}>
                  <a href={FRANCHISE_CONTACT.phoneTel} style={{ color: "var(--cream-100)", textDecoration: "none" }}>
                    {FRANCHISE_CONTACT.phone}
                  </a>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                  <a href={`mailto:${FRANCHISE_CONTACT.email}`} style={{ color: "var(--cream-100)", textDecoration: "none" }}>
                    {FRANCHISE_CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", padding: 28 }}>
              <EnquiryForm
                kind="franchise"
                fields={[
                  { name: "name", label: "Your name", type: "text", required: true, placeholder: "e.g. Dhaval Shah" },
                  { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91" },
                  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                  { name: "city", label: "City / region", type: "text", placeholder: "e.g. Pune" },
                  { name: "format", label: "Preferred format", type: "select", options: FORMATS, placeholder: "Select a format", full: true },
                  { name: "about", label: "Tell us about yourself", type: "textarea", placeholder: "Background, location, why Thepla House…", full: true },
                ]}
                submitLabel="Send enquiry"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 56 }}>
          <CTABanner
            tone="gold"
            align="split"
            eyebrow="Ready to talk?"
            title="Let's build something together"
            body={`Reach out to ${FRANCHISE_CONTACT.name} and we'll walk you through formats, support and the path to launch.`}
            primaryLabel="Franchise enquiry"
            primaryHref="#fr-form"
            secondaryLabel={`Call ${FRANCHISE_CONTACT.phone}`}
            secondaryHref={FRANCHISE_CONTACT.phoneTel}
          />
        </div>
      </section>
    </>
  );
}
