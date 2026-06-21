import type { Metadata } from "next";
import { KitchenCard } from "@/components/blocks/KitchenCard";
import { MapSlot } from "@/components/blocks/MapSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";
import { KITCHENS } from "@/data/kitchens";
import { ORDER_PHONE, LOCATIONS_MAP_EMBED } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Mumbai kitchens — 7 locations",
  description:
    "Find your nearest Thepla House kitchen — Chandivali, Kalina, Lower Parel, Mulund, Thane, Navi Mumbai and our Kandivali dine-in. Order on Swiggy, Zomato or WhatsApp.",
  path: "/locations",
});

export default function LocationsPage() {
  const cityKitchens = KITCHENS.filter((k) => k.slug !== "navi-mumbai");
  const airport = KITCHENS.find((k) => k.slug === "navi-mumbai");
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
              <MapSlot label="Thepla House — our kitchens across Mumbai & Navi Mumbai" embedSrc={LOCATIONS_MAP_EMBED || undefined} query="Thepla House By Tejal's Kitchen Mumbai" />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.75rem", margin: "0 0 20px" }}>All locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {cityKitchens.map((k) => (
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

      {airport && (
        <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -22, left: -18, width: 180, opacity: 0.28 }} />
          <div className="th-container" style={{ position: "relative", paddingTop: 52, paddingBottom: 52 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="seglabel" style={{ color: "var(--gold-300)" }}>Now at the airport</div>
                <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "8px 0 14px" }}>
                  Thepla House at Navi Mumbai International Airport
                </h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-200)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 18px", maxWidth: 520 }}>
                  {airport.localCopy}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 22 }}>
                  <div>
                    <div className="seglabel" style={{ color: "var(--gold-300)" }}>Location</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "0.9375rem", marginTop: 4, maxWidth: 320 }}>{airport.address}</div>
                  </div>
                  <div>
                    <div className="seglabel" style={{ color: "var(--gold-300)" }}>Hours</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "0.9375rem", marginTop: 4 }}>{airport.hours}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="/menu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "13px 26px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--color-on-secondary)", background: "var(--color-secondary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", textDecoration: "none" }}>
                    Order now
                  </a>
                  <a href={`https://www.google.com/maps?q=${encodeURIComponent(airport.mapQuery)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "13px 24px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--cream-50)", border: "1.5px solid var(--cream-100)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                    Get directions
                  </a>
                </div>
              </div>
              <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 300 }}>
                <MapSlot label="Map: Thepla House at Navi Mumbai International Airport, Ulwe" query={airport.mapQuery} />
              </div>
            </div>
          </div>
        </section>
      )}

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
