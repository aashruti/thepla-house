import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { OwnlyActions } from "@/components/blocks/OwnlyActions";
import { AggregatorLink } from "@/components/blocks/AggregatorLink";
import { Accordion } from "@/components/ds/Accordion";
import { pageMetadata } from "@/lib/seo";
import { OWNLY_LINK, OWNLY_SAVING, SWIGGY_LINK, ZOMATO_LINK, WHATSAPP_LINK } from "@/data/site";

const meta = pageMetadata({
  title: "Order online — Thepla House on the Ownly app",
  description: `Order Thepla House by Tejal's Kitchen on the Ownly app for iPhone and Android — usually ${OWNLY_SAVING} less than on other delivery apps.`,
  path: "/order",
});
// A hand-off page that sends phones straight to Ownly: keep it out of search.
export const metadata: Metadata = { ...meta, robots: { index: false, follow: true } };

const FAQS = [
  {
    q: "Why order on Ownly?",
    a: `It's the same food from the same kitchens, usually ${OWNLY_SAVING} less than on other delivery apps.`,
  },
  {
    q: "Can I order on Ownly from my computer?",
    a: "No — Ownly works only in its iPhone and Android apps. Scan the QR code with your phone's camera to open Thepla House in the app, or install it from the App Store or Google Play.",
  },
  {
    q: "Which kitchens deliver through Ownly?",
    a: "All our delivery kitchens across Mumbai and Thane. The app picks the right one for your address.",
  },
  {
    q: "Can I still order on Swiggy, Zomato or WhatsApp?",
    a: "Yes — all three still work. Ownly is simply where you'll usually pay the least.",
  },
];

export default async function OrderPage() {
  // Rendered at build time: the QR opens our brand link, which a phone hands to the app.
  const qrSvg = await QRCode.toString(OWNLY_LINK, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#2A0E0A", light: "#FFFFFF" },
  });

  return (
    <>
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 40, paddingBottom: 52 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-11 items-center">
            <div>
              <div className="seglabel">Order online · Ownly app</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Order on Ownly and pay {OWNLY_SAVING} less
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 560 }}>
                Same home-style food, same kitchens — usually {OWNLY_SAVING} less than on other delivery apps.
                Ownly works in its iPhone and Android apps, so scan the code with your phone to open
                Thepla House by Tejal&apos;s Kitchen there.
              </p>
              <OwnlyActions />
            </div>
            <div>
              <Image
                src="/images/marketing/ownly-x-thepla-hero.webp"
                alt="Ownly × Thepla House — methi theplas and masala chai beside a phone"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
                style={{ width: "100%", height: "auto", borderRadius: "var(--radius-xl)" }}
              />
              <div className="ownly-qr">
                <div
                  role="img"
                  aria-label="QR code that opens Thepla House by Tejal's Kitchen in the Ownly app"
                  style={{ width: 144, height: 144, flexShrink: 0 }}
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontWeight: 600, margin: 0 }}>
                  Scan with your phone camera
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="seglabel">How it works</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: 14 }}>
            {[
              { t: "1. Open Ownly", s: "Scan the code or tap the button on your phone. No app yet? Install it from the App Store or Google Play." },
              { t: "2. Pick your dishes", s: "Thepla House by Tejal's Kitchen opens in the app, with our full menu." },
              { t: "3. Pay less", s: `The same food, usually ${OWNLY_SAVING} less than on other delivery apps.` },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "0 0 8px" }}>{c.t}</h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div className="seglabel">Prefer another app?</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 18px" }}>
            We&apos;re on Swiggy, Zomato and WhatsApp too
          </h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <AggregatorLink service="swiggy" href={SWIGGY_LINK} size="lg" />
            <AggregatorLink service="zomato" href={ZOMATO_LINK} size="lg" />
            <AggregatorLink service="whatsapp" href={WHATSAPP_LINK} size="lg" />
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", margin: "16px 0 0" }}>
            Or browse the <Link href="/menu" style={{ color: "var(--color-primary)", fontWeight: 600 }}>full menu</Link> first.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px" }}>
          <div className="seglabel" style={{ textAlign: "center" }}>Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px", textAlign: "center" }}>
            Ordering on Ownly
          </h2>
          <Accordion items={FAQS} defaultOpen={[0]} />
        </div>
      </section>
    </>
  );
}
