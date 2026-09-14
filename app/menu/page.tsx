import type { Metadata } from "next";
import Link from "next/link";
import { PdfMenu } from "@/components/blocks/PdfMenu";
import { MenuExplorer } from "@/components/blocks/MenuExplorer";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, menuLd, breadcrumbLd } from "@/lib/seo";
import { MENU_CATEGORIES } from "@/data/menu";
import { ORDER_PHONE, WHATSAPP_LINK, ORDER_NOW_LINK } from "@/data/site";
import menuExtracted from "@/data/menu-extracted.json";

export const metadata: Metadata = pageMetadata({
  title: "Thepla House by Tejal's Kitchen — Menu & Prices",
  description:
    "See the Thepla House by Tejal's Kitchen menu and current prices for fresh thepla, Gujarati thali, farsan, sweets and upvas food. Jain and vegan options; order across Mumbai.",
  path: "/menu",
});

const UPVAS_MENU_ITEM_NAMES = [
  "Tejal's Kitchen Special Upwas Thali",
  "Sabudana Khichdi (450ml)",
  "Sabudana Vada - 2 Piece",
  "Upwas Farali Mishal",
  "Aloo Sabji with Rajgira Puri (300ml, 4 Piece)",
  "Samo with Curd (Bhagar) (600ml, 100ml curd)",
] as const;

function upvasMenuItems() {
  const order = new Map(UPVAS_MENU_ITEM_NAMES.map((name, index) => [name, index]));
  return menuExtracted.pages
    .flatMap((page) => page.entries)
    .filter((entry) => order.has(entry.name as (typeof UPVAS_MENU_ITEM_NAMES)[number]))
    .sort((a, b) => (order.get(a.name as (typeof UPVAS_MENU_ITEM_NAMES)[number]) ?? 0) - (order.get(b.name as (typeof UPVAS_MENU_ITEM_NAMES)[number]) ?? 0));
}

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
  const upvasItems = upvasMenuItems();
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
            Every dish is 100% vegetarian, made with whole-wheat atta and sunflower oil — no maida, no palm oil, no preservatives. Jain and vegan options are clearly tagged throughout.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upvasItems.map((item) => (
              <article key={item.name} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.125rem", lineHeight: 1.3, margin: "0 0 8px" }}>
                  {item.name}
                </h3>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)", fontWeight: 700 }}>
                  {item.price}
                </div>
              </article>
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
            Tap a category or filter for Jain, vegan and best-seller picks. For current prices, see the menu above.
          </p>
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
            primaryHref={ORDER_NOW_LINK}
            secondaryLabel="WhatsApp us"
            secondaryHref={WHATSAPP_LINK}
          />
        </div>
      </section>
    </>
  );
}
