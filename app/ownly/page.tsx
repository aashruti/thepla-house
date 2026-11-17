import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AggregatorLink } from "@/components/blocks/AggregatorLink";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { KITCHENS } from "@/data/kitchens";
import { ORDER_NOW_LINK, OWNLY_SAVING, SWIGGY_LINK, ZOMATO_LINK, WHATSAPP_LINK } from "@/data/site";

const PATH = "/ownly";

// The indexable home for the Ownly partnership. /order is the noindex hand-off
// that sends phones straight to the app; this page is the one people find in
// search and read, so it must work on a phone without redirecting.
export const metadata: Metadata = pageMetadata({
  title: `Thepla House on Ownly — order online, pay ${OWNLY_SAVING} less`,
  description: `Order Thepla House by Tejal's Kitchen on the Ownly app — usually ${OWNLY_SAVING} less than other delivery apps. Same kitchens across Mumbai & Thane.`,
  path: PATH,
});

const FAQS = [
  {
    q: "What is Ownly?",
    a: "Ownly is a food delivery app for iPhone and Android. Thepla House by Tejal's Kitchen is on Ownly, so you can order our home-style Gujarati food through it.",
  },
  {
    q: "Is Thepla House cheaper on Ownly?",
    a: `Yes — our food on Ownly is usually ${OWNLY_SAVING} less than on other delivery apps. Same dishes, same kitchens.`,
  },
  {
    q: "How do I order Thepla House on Ownly?",
    a: "Tap Order on Ownly on your phone and Thepla House opens in the app — or install Ownly from the App Store or Google Play first. On a computer, you'll get a QR code to scan with your phone.",
  },
  {
    q: "Can I order on Ownly from a computer?",
    a: "No — Ownly works only in its iPhone and Android apps. Scan the QR code on our order page with your phone's camera to open Thepla House there.",
  },
  {
    q: "Which areas does Thepla House deliver to on Ownly?",
    a: "All our delivery kitchens across Mumbai and Thane take Ownly orders — Chandivali (Andheri East), Kalina (Santacruz East), Lower Parel, Mulund, Thane, Thane Stadium (Naupada) and Kandivali West. The app picks the kitchen nearest your address.",
  },
  {
    q: "Can I still order on Swiggy, Zomato or WhatsApp?",
    a: "Yes — all three still work. Ownly is simply where you'll usually pay the least.",
  },
];

/** Kitchens that deliver — the airport counter is airside and takes no orders. */
const deliveryKitchens = KITCHENS.filter((k) => !k.airside);

const button = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  minHeight: 52,
  padding: "14px 28px",
  fontFamily: "var(--font-body)",
  fontSize: "1.0625rem",
  fontWeight: 600,
  borderRadius: "var(--radius-md)",
  textDecoration: "none",
} as const;

export default function OwnlyPage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Order on Ownly", path: PATH },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)" }}>
        <div className="th-container" style={{ paddingTop: 28, paddingBottom: 48 }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 16, flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>Order on Ownly</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <div>
              <div className="seglabel">Ownly × Thepla House</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Order Thepla House on Ownly and pay {OWNLY_SAVING} less
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 540 }}>
                The same home-style theplas, thalis and farsan from the same kitchens — usually {OWNLY_SAVING} less
                than on other delivery apps. Order in the Ownly app on your iPhone or Android phone.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={ORDER_NOW_LINK} style={{ ...button, color: "var(--color-on-primary)", background: "var(--color-primary)", boxShadow: "var(--shadow-sm)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- local vector brand mark */}
                  <img src="/brands/ownly.svg" alt="" width={24} height={24} style={{ background: "var(--white)", borderRadius: 6, flexShrink: 0 }} />
                  Order on Ownly
                </Link>
                <Link href="/menu" style={{ ...button, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)" }}>
                  See the menu
                </Link>
              </div>
            </div>
            <Image
              src="/images/marketing/ownly-x-thepla-hero.webp"
              alt="Ownly × Thepla House — methi theplas, curd, pickle and masala chai beside a phone showing the Ownly app"
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              style={{ width: "100%", height: "auto", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-lg)" }}
            />
          </div>
        </div>
      </section>

      {/* Why Ownly */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <Image
              src="/images/marketing/ownly-x-thepla-card.webp"
              alt={`Usually ${OWNLY_SAVING} less on Ownly than on other delivery apps — Ownly × Thepla House`}
              width={1080}
              height={1350}
              sizes="(min-width: 768px) 36vw, 100vw"
              style={{ width: "100%", maxWidth: 420, height: "auto", justifySelf: "center", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)" }}
            />
            <div>
              <div className="seglabel">Why order on Ownly</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 20px" }}>
                Same food, same kitchens, a smaller bill
              </h2>
              <div style={{ display: "grid", gap: 16 }}>
                {[
                  { t: `Usually ${OWNLY_SAVING} less`, s: "Our dishes cost less on Ownly than on other delivery apps." },
                  { t: "Cooked in the same kitchens", s: "Every Ownly order comes from our own Thepla House kitchens — whole-wheat atta, sunflower oil, no preservatives." },
                  { t: "Across Mumbai & Thane", s: `All ${deliveryKitchens.length} of our delivery kitchens take Ownly orders; the app picks the one nearest you.` },
                ].map((c) => (
                  <div key={c.t} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: "18px 20px" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "0 0 6px" }}>{c.t}</h3>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{c.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div className="seglabel">How it works</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 20px" }}>
            Three taps to your thepla
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "1. Open Ownly", s: "Tap Order on Ownly on your phone. No app yet? Install it from the App Store or Google Play. On a computer, scan the QR code with your phone." },
              { t: "2. Pick your dishes", s: "Thepla House by Tejal's Kitchen opens in the app, with our full menu." },
              { t: "3. Pay less", s: `The same food, usually ${OWNLY_SAVING} less than on other delivery apps.` },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "0 0 8px" }}>{c.t}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchens */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div className="seglabel">Delivering on Ownly</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 18px" }}>
            Our kitchens on Ownly
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
            {deliveryKitchens.map((k) => (
              <Link key={k.slug} href={`/locations/${k.slug}`} style={{ display: "inline-flex", flexDirection: "column", gap: 2, padding: "12px 18px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.0625rem" }}>{k.title}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.8125rem" }}>{k.area}</span>
              </Link>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", margin: "22px 0 10px" }}>
            Prefer another app? We&apos;re still on:
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <AggregatorLink service="swiggy" href={SWIGGY_LINK} />
            <AggregatorLink service="zomato" href={ZOMATO_LINK} />
            <AggregatorLink service="whatsapp" href={WHATSAPP_LINK} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px" }}>
          <div className="seglabel" style={{ textAlign: "center" }}>Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px", textAlign: "center" }}>
            Ordering Thepla House on Ownly
          </h2>
          <Accordion items={FAQS} defaultOpen={[0]} />
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Ownly × Thepla House"
            title={`Order on Ownly, pay ${OWNLY_SAVING} less`}
            body="Same home-style food, same kitchens — on the Ownly app for iPhone and Android."
            primaryLabel="Order on Ownly"
            primaryHref={ORDER_NOW_LINK}
            secondaryLabel="See the menu"
            secondaryHref="/menu"
          />
        </div>
      </section>
    </>
  );
}
