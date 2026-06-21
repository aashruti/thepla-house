import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuRow } from "@/components/blocks/MenuRow";
import { MapSlot } from "@/components/blocks/MapSlot";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, restaurantLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { KITCHENS, getKitchen } from "@/data/kitchens";
import { tagsFor } from "@/data/menu";
import { ORDER_PHONE, ORDER_PHONE_TEL } from "@/data/site";

export function generateStaticParams() {
  return KITCHENS.map((k) => ({ area: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const k = getKitchen(area);
  if (!k) return {};
  const meta = pageMetadata({
    title: k.seoTitle || `Thepla House ${k.title} (${k.area}) — Gujarati food delivery & dine-in`,
    description:
      k.seoDescription ||
      `Order home-style Gujarati food in ${k.title}, ${k.area} — theplas, thalis, farsan, Jain & vegan. Delivery via Swiggy, Zomato & WhatsApp. ${k.hours}.`,
    path: `/locations/${k.slug}`,
  });
  meta.keywords = [
    `thepla ${k.title}`,
    `Gujarati food ${k.title}`,
    `Gujarati food ${k.area}`,
    `Gujarati restaurant ${k.title}`,
    `thepla delivery ${k.title}`,
    ...(k.dineIn ? [`thepla dine-in ${k.title}`, `Gujarati dine-in ${k.area}`, `best thepla ${k.title}`] : []),
  ];
  return meta;
}

export default async function KitchenAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const k = getKitchen(area);
  if (!k) notFound();

  const directions = `https://www.google.com/maps?q=${encodeURIComponent(k.mapQuery)}`;

  return (
    <>
      <JsonLd
        data={[
          restaurantLd({
            name: `Thepla House ${k.title}`,
            url: `/locations/${k.slug}`,
            streetAddress: k.address,
            locality: k.area,
            postalCode: k.address.match(/\b(\d{6})\b/)?.[1],
            latitude: k.lat,
            longitude: k.lng,
            dineIn: k.dineIn,
            areaServed: k.areasServed,
            opens: k.slug === "kandivali" ? "08:00" : undefined,
            closes: k.slug === "kandivali" ? "22:30" : k.slug === "lower-parel" ? "21:00" : undefined,
          }),
          faqPageLd(k.faqs),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: k.title, path: `/locations/${k.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 28, paddingBottom: 40 }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 16, flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <Link href="/locations" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Locations</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>{k.title}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-11 items-center">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--leaf-100)", color: "var(--leaf-700)", fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 700, padding: "5px 12px", borderRadius: "999px", marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--leaf-500)" }} />
                Open daily · till 10pm
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "0 0 10px" }}>
                Thepla House {k.title}
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 540, margin: "0 0 22px" }}>
                Home-style Gujarati food in {k.area} — theplas, thalis, farsan and sweets, made fresh with whole-wheat atta, sunflower oil and no preservatives.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/menu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order now
                </Link>
                <a href={directions} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 26px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Get directions
                </a>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 320 }}>
              <MapSlot label={`Map: Thepla House ${k.title}, ${k.area}`} query={k.mapQuery} />
            </div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section style={{ background: "var(--green-700)" }}>
        <div className="th-container" style={{ paddingTop: 24, paddingBottom: 24, display: "flex", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: 240 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>Address</div>
            <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "1.0625rem", marginTop: 4 }}>{k.address}</div>
          </div>
          <div style={{ flex: 1, minWidth: 170 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>Hours</div>
            <div style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "1.0625rem", marginTop: 4 }}>{k.hours}</div>
          </div>
          <div style={{ flex: 1, minWidth: 170 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>Order line</div>
            <a href={ORDER_PHONE_TEL} style={{ fontFamily: "var(--font-body)", color: "var(--cream-50)", fontSize: "1.0625rem", marginTop: 4, display: "block", textDecoration: "none" }}>{ORDER_PHONE}</a>
          </div>
        </div>
      </section>

      {/* Popular + areas */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
            <div>
              <div className="seglabel">Popular here</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 20px" }}>Loved in {k.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {k.popular.map((d) => (
                  <MenuRow key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} />
                ))}
              </div>
            </div>
            <div>
              <div className="seglabel">We deliver to</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 18px" }}>Areas served</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {k.areasServed.map((a) => (
                  <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink-700)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green-500)" }} />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO copy band */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, left: -16, width: 160, opacity: 0.3 }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "52px 24px", textAlign: "center" }}>
          <div className="seglabel" style={{ color: "var(--gold-300)" }}>Gujarati food delivery in {k.title}</div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-100)", fontSize: "1.25rem", lineHeight: 1.6, margin: "14px 0 0" }}>{k.localCopy}</p>
        </div>
      </section>

      {/* Deep local content (SEO) */}
      {k.seoParagraphs && k.seoParagraphs.length > 0 && (
        <section style={{ background: "var(--cream-50)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "0 0 18px" }}>
              Thepla House {k.title} — home-style Gujarati food in {k.area}
            </h2>
            {k.seoParagraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "1.0625rem", lineHeight: 1.75, margin: "0 0 1.1em" }}>
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>{k.title} FAQs</h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={k.faqs.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow={`In ${k.area}?`}
            title={`Order fresh from our ${k.title} kitchen`}
            body={`Delivery on Swiggy, Zomato or WhatsApp — or call ${ORDER_PHONE}.`}
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
