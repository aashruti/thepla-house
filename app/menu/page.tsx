import type { Metadata } from "next";
import { MenuExplorer } from "@/components/blocks/MenuExplorer";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, menuLd, breadcrumbLd } from "@/lib/seo";
import { MENU_CATEGORIES } from "@/data/menu";
import { ORDER_PHONE, WHATSAPP_LINK } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Menu — 250+ home-style Gujarati dishes",
  description:
    "Explore 250+ vegetarian, whole-wheat dishes — theplas, thalis, farsan and sweets. Jain & vegan options clearly tagged. Order on Swiggy, Zomato or WhatsApp.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={[
          menuLd(
            MENU_CATEGORIES.map((c) => ({
              name: c.label,
              items: c.dishes.map((d) => ({ name: d.title, description: d.desc })),
            })),
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
          ]),
        ]}
      />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 28 }}>
          <div className="seglabel">The menu</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "10px 0 14px" }}>
            Our menu — 250+ home-style dishes
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
            Every dish is 100% vegetarian, made with whole-wheat atta and sunflower oil — no maida, no palm oil, no preservatives. Jain and vegan options are clearly tagged throughout.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 56 }}>
          <MenuExplorer />
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Can't decide?"
            title="Order our best-sellers"
            body={`Pick a delivery partner and we'll roll it fresh — or call ${ORDER_PHONE}.`}
            primaryLabel="Order now"
            primaryHref="/menu"
            secondaryLabel="WhatsApp us"
            secondaryHref={WHATSAPP_LINK}
          />
        </div>
      </section>
    </>
  );
}
