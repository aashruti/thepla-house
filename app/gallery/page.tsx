import type { Metadata } from "next";
import { GalleryMasonry } from "@/components/blocks/GalleryMasonry";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "A look inside — food & kitchen gallery",
  description:
    "Photos of our home-style Gujarati food and Mumbai kitchens — theplas, thalis, farsan, sweets and the people behind them.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "ImageGallery", name: "Thepla House gallery", url: absUrl("/gallery") },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 32, textAlign: "center" }}>
          <div className="seglabel">Gallery</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "10px 0 12px" }}>
            A look inside
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>
            The food, the kitchens and the hands behind every thepla — shot warm, the way home food should look.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 24, paddingBottom: 56 }}>
          <GalleryMasonry />
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Looks good?"
            title="It tastes even better"
            body="Order fresh, home-style food today — Swiggy, Zomato or WhatsApp."
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
