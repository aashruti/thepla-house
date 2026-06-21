import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, productLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { WHATSAPP_LINK } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Vacuum-packed methi thepla travel packs — fresh 7+ days | Thepla House",
  description:
    "Vacuum-packed methi thepla travel packs — 100% whole wheat, no preservatives, fresh for 7+ days. Made to carry on any journey. Buy at any Thepla House kitchen in Mumbai.",
  path: "/travel-packs",
});

const FEATURES = [
  { t: "7+ days fresh", s: "Stays soft and fresh for over a week, unopened." },
  { t: "Vacuum-sealed", s: "Food-grade packing locks in freshness for travel." },
  { t: "No preservatives", s: "100% whole wheat, sunflower oil — nothing artificial." },
  { t: "Made to carry", s: "Light and sealed — travel-ready for any journey." },
];

const PACKS = [
  {
    t: "Methi Thepla · Classic",
    s: "A handy stack of methi theplas, vacuum-sealed for the road.",
    subject: "Classic methi thepla travel pack, vacuum-sealed",
    alt: "Classic methi thepla travel pack",
    img: "travelpack:classic",
  },
  {
    t: "Methi Thepla · Family",
    s: "A bigger pack for longer trips or the whole family.",
    subject: "Family-size methi thepla travel pack",
    alt: "Family methi thepla travel pack",
    img: "travelpack:family",
  },
  {
    t: "Traveller's Combo",
    s: "Methi theplas paired with dry garlic chutney and chhundo.",
    subject: "Traveller combo pack — theplas with chutney and chhundo jars",
    alt: "Traveller's combo travel pack",
    img: "travelpack:combo",
  },
];

const STEPS = [
  { n: "1", t: "Order on WhatsApp", s: "Pick your pack and tell us when you'll collect." },
  { n: "2", t: "Rolled fresh", s: "Made the same day, never from frozen stock." },
  { n: "3", t: "Vacuum-sealed", s: "Packed in food-grade, travel-ready packaging." },
  { n: "4", t: "Pick up & go", s: "Collect from your nearest kitchen and carry it wherever you're headed." },
];

const FAQS = [
  {
    q: "How long do the travel packs stay fresh?",
    a: "Unopened and vacuum-sealed, the theplas stay fresh for 7+ days. Once opened, refrigerate and finish within a few days.",
  },
  {
    q: "How do I eat them?",
    a: "Warm each thepla on a tawa for about 30 seconds a side, or microwave briefly. They taste just-made.",
  },
  {
    q: "Do you ship the travel packs?",
    a: "We don't ship — travel packs are made to carry. Buy them at any Thepla House kitchen (or order on WhatsApp for pickup) and take them with you. Vacuum-sealed, they stay fresh 7+ days, so customers regularly carry them across India and abroad.",
  },
  {
    q: "Is the packaging food-safe?",
    a: "Yes — we use food-grade vacuum packaging designed to keep the theplas soft and hygienic in transit.",
  },
];

function CheckIcon({ size = 9 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: Math.round(size * 1.65),
        border: "solid var(--green-600)",
        borderWidth: `0 ${size > 7 ? 2.5 : 2}px ${size > 7 ? 2.5 : 2}px 0`,
        transform: "rotate(45deg)",
        marginBottom: 3,
      }}
    />
  );
}

const tagPill = (bg: string, color: string): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  fontWeight: 600,
  padding: "4px 11px",
  borderRadius: 999,
  background: bg,
  color,
});

const orderBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 48,
  padding: 13,
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  fontWeight: 600,
  color: "var(--color-on-primary)",
  background: "var(--color-primary)",
  borderRadius: "var(--radius-md)",
  textDecoration: "none",
};

export default function TravelPacksPage() {
  return (
    <>
      <JsonLd
        data={[
          productLd({
            name: "Methi thepla travel packs",
            description:
              "Vacuum-packed methi thepla travel packs — 100% whole wheat, no preservatives, fresh for 7+ days. Made to carry on any journey.",
            path: "/travel-packs",
          }),
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Travel Packs", path: "/travel-packs" },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(155deg, var(--green-700), var(--green-800))", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -26, left: -18, width: 200, opacity: 0.3 }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="seglabel" style={{ color: "var(--gold-300)" }}>Travel packs · fresh for 7+ days</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 18px" }}>
                Theplas that travel as far as you do
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-200)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 520 }}>
                Vacuum-packed methi thepla stays fresh 7+ days — 100% whole wheat, sunflower oil, no preservatives. Pick up a stack for the journey, or carry a taste of home to family abroad.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="#packs" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-secondary)", background: "var(--color-secondary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", textDecoration: "none" }}>
                  Order travel packs
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 26px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--cream-50)", border: "1.5px solid var(--cream-100)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 420 }}>
              <PhotoSlot
                subject="Vacuum-packed methi thepla travel packs stacked, with brand label, studio light"
                alt="Vacuum-sealed methi thepla travel packs"
                src={img("travel-pack")}
                priority
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "var(--gold-50)" }}>
        <TrimBorder pattern="blockprint" color="var(--gold-400)" size={16} />
        <div className="th-container" style={{ paddingTop: 44, paddingBottom: 44 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.t} className="text-center md:text-center">
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <CheckIcon size={9} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.1875rem" }}>{f.t}</div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: 4 }}>{f.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs */}
      <section id="packs" style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">Choose your pack</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>Pack options</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKS.map((p) => (
              <article key={p.t} style={{ display: "flex", flexDirection: "column", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                <div style={{ height: 200 }}>
                  <PhotoSlot subject={p.subject} alt={p.alt} src={img(p.img)} style={{ height: "100%", width: "100%" }} />
                </div>
                <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.375rem", margin: "0 0 4px" }}>{p.t}</h3>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", marginBottom: 12, flex: 1 }}>{p.s}</div>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
                    <span style={tagPill("var(--gold-100)", "var(--gold-700)")}>100% whole wheat</span>
                    <span style={tagPill("var(--leaf-100)", "var(--leaf-700)")}>7+ days fresh</span>
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={orderBtn}>
                    Order this pack
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it reaches you fresh */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>Freshness, sealed in</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>How it reaches you fresh</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((st) => (
              <div key={st.n} style={{ textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "var(--gold-400)", color: "var(--ink-900)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.375rem", marginBottom: 14 }}>
                  {st.n}
                </span>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontWeight: 600, fontSize: "1.125rem", marginBottom: 5 }}>{st.t}</div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.9375rem", lineHeight: 1.5 }}>{st.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 20px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 24px" }}>Travel pack FAQs</h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={FAQS} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Going somewhere?"
            title="Pack a taste of home"
            body="Pick up vacuum-packed theplas — fresh for 7+ days, made to carry wherever you're headed, across India or abroad."
            primaryLabel="Order travel packs"
            primaryHref={WHATSAPP_LINK}
            secondaryLabel="WhatsApp us"
            secondaryHref={WHATSAPP_LINK}
          />
        </div>
      </section>
    </>
  );
}
