import type { Metadata } from "next";
import Link from "next/link";
import { KitchenCard } from "@/components/blocks/KitchenCard";
import { MapSlot } from "@/components/blocks/MapSlot";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, faqPageLd, breadcrumbLd, absUrl } from "@/lib/seo";
import { KITCHENS } from "@/data/kitchens";
import { AREAS } from "@/data/areas";
import { SITE, ORDER_PHONE, LOCATIONS_MAP_EMBED } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Thepla Near Me — 8 Thepla House by Tejal's Kitchen Outlets",
  description:
    "Looking for fresh thepla near you? Find the nearest Thepla House by Tejal's Kitchen in Chandivali, Kalina, Lower Parel, Mulund, Thane, Navi Mumbai or Kandivali.",
  path: "/locations",
});

const LOCATION_FAQS = [
  {
    q: "Where can I find fresh thepla near me in Mumbai?",
    a: "Thepla House by Tejal's Kitchen has eight Mumbai-area locations: Chandivali in Andheri East, Kalina in Santacruz East, Lower Parel, Mulund West, Manpada in Thane, the Dadoji Konddev Stadium kitchen at Naupada in Thane West, Kandivali West, and a takeaway counter inside Navi Mumbai International Airport departures. Choose the closest location below for its address, timings and delivery area.",
  },
  {
    q: "Which Thepla House by Tejal's Kitchen location has dine-in?",
    a: "Two of them: Kandivali West, and Dadoji Konddev Stadium in Thane West — which also has a banquet hall seating up to 250 guests. The other kitchens serve delivery and takeaway, and our Navi Mumbai International Airport counter is takeaway only, inside the departures terminal.",
  },
  {
    q: "Can I order Gujarati thali and thepla for home delivery?",
    a: "Yes. Order fresh thepla, Gujarati thali, farsan and sweets from your nearest kitchen through Swiggy, Zomato or WhatsApp. Jain and vegan choices are available across the menu.",
  },
];

export default function LocationsPage() {
  const cityKitchens = KITCHENS.filter((k) => k.slug !== "navi-mumbai");
  // Counted, not written down: the write-up's "8 locations, 7 cloud kitchens"
  // is the same split as airside vs the rest, so let the data say it.
  const cloudKitchens = KITCHENS.filter((k) => !k.airside);
  const dineInOutlets = KITCHENS.filter((k) => k.dineIn);
  const NETWORK_STATS = [
    { n: `${KITCHENS.length}`, l: "Locations" },
    { n: `${cloudKitchens.length}`, l: "Cloud kitchens" },
    { n: `${dineInOutlets.length}`, l: "Dine-in outlets" },
    { n: "250", l: "Banquet hall seats" },
  ];
  const deliveryAreas = AREAS.filter((area) => !area.redirectTo);
  const airport = KITCHENS.find((k) => k.slug === "navi-mumbai");
  // Fallback pin for the hub map = our flagship, so the embed never renders a
  // brand text-search (which would pull competitors onto our own page).
  const flagship = KITCHENS.find((k) => k.flagship) ?? KITCHENS[0];
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Thepla House by Tejal's Kitchen — kitchens",
            itemListElement: KITCHENS.map((k, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${SITE.name} — ${k.title}`,
              item: absUrl(`/locations/${k.slug}`),
            })),
          },
          faqPageLd(LOCATION_FAQS),
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
            Find a Thepla House by Tejal&apos;s Kitchen near you in Mumbai
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
            Looking for authentic Gujarati, Rajasthani and Marwadi food in Mumbai? Thepla House by Tejal&apos;s Kitchen brings wholesome, traditional flavours closer to you through eight locations across Mumbai and Navi Mumbai.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--gold-50)" }}>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} />
        <div className="th-container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" style={{ marginBottom: 28 }}>
            {NETWORK_STATS.map((stat) => (
              <div key={stat.l}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "2.5rem", fontWeight: 600, lineHeight: 1 }}>
                  {stat.n}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", marginTop: 6 }}>{stat.l}</div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "1.0625rem", lineHeight: 1.7, margin: "0 0 12px" }}>
              Our network includes {cloudKitchens.length} cloud kitchens and one outlet at Navi Mumbai International Airport, in the international departure terminal — so your favourite meals are close by wherever you are.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "1.0625rem", lineHeight: 1.7, margin: 0 }}>
              For a sit-down meal, visit our Kandivali and Thane — Dadoji Konddev Stadium outlets. Dadoji Konddev Stadium also has a banquet hall seating up to 250 guests, for family functions, celebrations, corporate gatherings and community events.
            </p>
          </div>
        </div>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} flip />
      </section>

      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 40, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 items-start">
            <div className="locations-map" style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <MapSlot label="Thepla House by Tejal's Kitchen — our kitchens across Mumbai &amp; Navi Mumbai" embedSrc={LOCATIONS_MAP_EMBED || undefined} lat={flagship.lat} lng={flagship.lng} />
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
                    directionsHref={k.mapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(k.mapQuery)}`}
                    orderHref="/menu"
                    swiggyHref={k.swiggyUrl}
                    zomatoHref={k.zomatoUrl}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, padding: "24px 26px", background: "var(--gold-50)", border: "1px solid var(--gold-200)", borderRadius: "var(--radius-xl)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.5rem", margin: "0 0 8px" }}>
              Gujarati food delivery near you
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", lineHeight: 1.6, margin: "0 0 14px" }}>
              See delivery details, nearby neighbourhoods and popular dishes for areas served by our Chandivali kitchen.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {deliveryAreas.map((area) => (
                <Link key={area.slug} href={`/gujarati-food-delivery-${area.slug}`} style={{ display: "inline-flex", padding: "10px 15px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-md)", color: "var(--color-primary)", fontFamily: "var(--font-body)", fontWeight: 700, textDecoration: "none" }}>
                  Gujarati food delivery in {area.name} →
                </Link>
              ))}
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
                  Thepla House by Tejal&apos;s Kitchen at Navi Mumbai International Airport
                </h2>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-200)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 18px", maxWidth: 520 }}>
                  {airport.localCopy}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 22 }}>
                  <div>
                    <div className="seglabel" style={{ color: "var(--gold-300)" }}>Location</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "0.9375rem", marginTop: 4, maxWidth: 320 }}>{airport.address}</div>
                  </div>
                  {airport.hours && (
                    <div>
                      <div className="seglabel" style={{ color: "var(--gold-300)" }}>Hours</div>
                      <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "0.9375rem", marginTop: 4 }}>{airport.hours}</div>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="/menu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "13px 26px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--color-on-secondary)", background: "var(--color-secondary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", textDecoration: "none" }}>
                    See the menu
                  </a>
                  <a href={airport.mapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(airport.mapQuery)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "13px 24px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--cream-50)", border: "1.5px solid var(--cream-100)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                    Get directions
                  </a>
                </div>
              </div>
              <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 300 }}>
                <MapSlot label="Map: Thepla House by Tejal's Kitchen at Navi Mumbai International Airport, Ulwe" lat={airport.lat} lng={airport.lng} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Finding your nearest kitchen</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>
            Thepla near me: questions answered
          </h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={LOCATION_FAQS} defaultOpen={[0]} />
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
