import type { Metadata } from "next";
import Link from "next/link";
import { PdfMenu } from "@/components/blocks/PdfMenu";
import { MenuExplorer } from "@/components/blocks/MenuExplorer";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, menuLd, breadcrumbLd } from "@/lib/seo";
import { MENU_CATEGORIES, HOMELY_HEALTHY, tagsFor } from "@/data/menu";
import { MenuItemCard } from "@/components/blocks/MenuItemCard";
import { ORDER_PHONE, WHATSAPP_LINK, ORDER_NOW_LINK } from "@/data/site";
import menuExtracted from "@/data/menu-extracted.json";

export const metadata: Metadata = pageMetadata({
  title: "Thepla House by Tejal's Kitchen — Menu & Prices",
  description:
    "See the Thepla House by Tejal's Kitchen menu and current prices for fresh thepla, Gujarati thali, farsan, sweets and upvas food. Jain and vegan options; order across Mumbai.",
  path: "/menu",
});

/**
 * Real prices straight from public/menu.pdf, via `npm run menu:extract`.
 * Kept as its own set of menuLd() sections rather than merged into
 * MENU_CATEGORIES below — the two are named independently (curated marketing
 * copy vs. the PDF's own item names) and don't line up 1:1, so joining them
 * would mean guessing which curated dish a PDF entry refers to. Only the
 * script's "clean" bucket is used; "needsReview" entries aren't sourced here
 * since a few are known layout-parsing merges — check
 * data/menu-extracted.json's needsReview list after re-running the script.
 */
function pricedMenuSections() {
  const bySection = new Map<string, { name: string; price: string }[]>();
  for (const page of menuExtracted.pages) {
    for (const entry of page.entries) {
      const items = bySection.get(entry.section) ?? [];
      items.push({ name: entry.name, price: entry.price });
      bySection.set(entry.section, items);
    }
  }
  return Array.from(bySection, ([name, items]) => ({ name, items }));
}

export default function MenuPage() {
  const upvasDishes = MENU_CATEGORIES.find((c) => c.id === "upvas")?.dishes ?? [];
  return (
    <>
      <JsonLd
        data={[
          menuLd([
            ...MENU_CATEGORIES.map((c) => ({
              name: c.label,
              items: c.dishes.map((d) => ({ name: d.title, description: d.desc })),
            })),
            ...pricedMenuSections(),
          ]),
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
            Thepla House by Tejal&apos;s Kitchen menu — 250+ home-style dishes
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
            Every dish is 100% vegetarian, made with whole-wheat atta and sunflower oil — no maida, no palm oil, no preservatives. Jain and vegan options are available — just ask when you order.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 40, maxWidth: 1000 }}>
          <PdfMenu />
        </div>
      </section>

      <section id="upvas-food" style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 52, paddingBottom: 52 }}>
          <div className="seglabel">Fasting favourites</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-title)", lineHeight: 1.12, margin: "8px 0 10px" }}>
            Upvas food and fasting thali in Mumbai
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 760, margin: "0 0 24px" }}>
            Looking for upvas food near you? Our current menu includes a complete Upwas Thali, sabudana favourites, rajgira puri and farali dishes. Availability can vary by kitchen and fasting day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upvasDishes.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
            ))}
          </div>
          <Link href="/locations" style={{ display: "inline-flex", marginTop: 22, fontFamily: "var(--font-body)", color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
            Find your nearest Thepla House by Tejal&apos;s Kitchen kitchen →
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 56 }}>
          <div className="seglabel">Browse the dishes</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-title)", lineHeight: 1.12, margin: "8px 0 6px" }}>
            Explore by category
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 680, margin: "0 0 20px" }}>
            Our most-ordered dishes, by category. Filter for best-sellers, upvas dishes or whole wheat. For prices, see the menu above.
          </p>
          <MenuExplorer />
        </div>
      </section>

      {/* Homely & Healthy is a separate line from the same kitchens, so it gets
          its own section rather than a tab among the Thepla House categories. */}
      <section id="homely-healthy" style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        <div className="th-container" style={{ position: "relative", paddingTop: 52, paddingBottom: 56 }}>
          <div className="seglabel" style={{ color: "var(--gold-300)" }}>Also from our kitchens</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-title)", lineHeight: 1.12, margin: "8px 0 10px" }}>
            Homely &amp; Healthy
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 720, margin: "0 0 26px" }}>
            Complete thalis and meals, cooked in the same kitchens.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOMELY_HEALTHY.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} src={d.image} />
            ))}
          </div>
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
            primaryHref={ORDER_NOW_LINK}
            secondaryLabel="WhatsApp us"
            secondaryHref={WHATSAPP_LINK}
          />
        </div>
      </section>
    </>
  );
}
