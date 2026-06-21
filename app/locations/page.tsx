import type { Metadata } from "next";
import { KitchenCard } from "@/components/blocks/KitchenCard";
import { MapSlot } from "@/components/blocks/MapSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";
import { KITCHENS } from "@/data/kitchens";
import { ORDER_PHONE } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Mumbai kitchens — 7 locations",
  description:
    "Find your nearest Thepla House kitchen — Chandivali, Kalina, Lower Parel, Mulund, Thane, Navi Mumbai and our Kandivali dine-in. Order on Swiggy, Zomato or WhatsApp.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Thepla House kitchens",
            itemListElement: KITCHENS.map((k, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Thepla House ${k.title}`,
              item: absUrl(`/locations/${k.slug}`),
            })),
          },
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]),
        ]}
      />

      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 36 }}>
          <div className="seglabel">Find us</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "10px 0 14px" }}>
            7 kitchens across Mumbai
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
            Thepla House cooks from six cloud kitchens across Mumbai and Navi Mumbai — plus a Kandivali dine-in outlet. Order home-style Gujarati food fresh from the kitchen nearest you.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 40, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 items-start">
            <div className="locations-map" style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <MapSlot label="Map: 7 Thepla House kitchens across Mumbai & Navi Mumbai" query="Thepla House Mumbai" />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.75rem", margin: "0 0 20px" }}>All locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {KITCHENS.map((k) => (
                  <KitchenCard
                    key={k.slug}
                    title={k.title}
                    area={k.area}
                    note={k.address}
                    hours={k.hours}
                    detailHref={`/locations/${k.slug}`}
                    directionsHref={`https://www.google.com/maps?q=${encodeURIComponent(k.mapQuery)}`}
                    orderHref="/menu"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Can't get to us?"
            title="We'll bring ghar ka khana to your door"
            body={`Order delivery on Swiggy, Zomato or WhatsApp from your nearest kitchen — or call ${ORDER_PHONE}.`}
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
