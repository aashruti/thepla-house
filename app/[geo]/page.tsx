import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuRow } from "@/components/blocks/MenuRow";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { OrderChannels } from "@/components/blocks/OrderChannels";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, restaurantLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { AREAS, getArea } from "@/data/areas";
import { tagsFor } from "@/data/menu";
import { img, dishImage } from "@/data/images";

const PREFIX = "gujarati-food-delivery-";

export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS.map((a) => ({ geo: `${PREFIX}${a.slug}` }));
}

function areaFromGeo(geo: string) {
  if (!geo.startsWith(PREFIX)) return undefined;
  return getArea(geo.slice(PREFIX.length));
}

export async function generateMetadata({ params }: { params: Promise<{ geo: string }> }): Promise<Metadata> {
  const { geo } = await params;
  const a = areaFromGeo(geo);
  if (!a) return {};
  return pageMetadata({
    title: `Home-style Gujarati food delivery in ${a.name} — healthy veg tiffin`,
    description: `Looking for home-style food or a tiffin near you in ${a.name}? Order healthy, 100% vegetarian Gujarati theplas, thalis, farsan & sweets — whole wheat, made fresh to order. Jain & vegan. Swiggy, Zomato & WhatsApp.`,
    path: `/${geo}`,
  });
}

export default async function GeoLandingPage({ params }: { params: Promise<{ geo: string }> }) {
  const { geo } = await params;
  const a = areaFromGeo(geo);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={[
          restaurantLd({
            name: `Thepla House — ${a.servingKitchenName.replace("Thepla House ", "")}`,
            url: `/${geo}`,
            locality: a.name,
          }),
          faqPageLd(a.faqs),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Delivery areas", path: "/locations" },
            { name: a.name, path: `/${geo}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 28, paddingBottom: 44 }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 16, flexWrap: "wrap", fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <Link href="/locations" style={{ color: "var(--ink-500)", textDecoration: "none" }}>Delivery areas</Link>
            <span style={{ color: "var(--ink-300)" }}>›</span>
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>{a.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center">
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "0 0 16px" }}>
                Home-style Gujarati food delivery in {a.name}
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 540 }}>
                Order healthy, home-style theplas, thalis, farsan and sweets anywhere in {a.name} — 100% vegetarian, whole wheat and made fresh to order, like a home tiffin at your door. Jain and vegan options on every menu.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <Link href="/menu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order now
                </Link>
              </div>
              <OrderChannels label="Order on" />
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 340 }}>
              <PhotoSlot subject={`Brass thali of methi thepla, dal and sabzi for delivery in ${a.name}`} alt={`Gujarati food delivery in ${a.name}`} src={img("home-hero") ?? dishImage("Gujarati Thali")} priority sizes="(max-width: 1024px) 100vw, 45vw" style={{ height: 340, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Local answer band */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, left: -16, width: 150, opacity: 0.3 }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
          <div className="seglabel" style={{ color: "var(--gold-300)" }}>Delivering to {a.name}</div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-100)", fontSize: "1.25rem", lineHeight: 1.6, margin: "12px 0 0" }}>{a.localCopy}</p>
          <Link href="/tiffin-service-mumbai" style={{ display: "inline-block", marginTop: 18, fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--gold-300)", textDecoration: "none" }}>
            Home-style food &amp; healthy tiffin in Mumbai →
          </Link>
        </div>
      </section>

      {/* Popular + areas */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
            <div>
              <div className="seglabel">Popular in {a.name}</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 20px" }}>Most-ordered here</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {a.popular.map((d) => (
                  <MenuRow key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} />
                ))}
              </div>
            </div>
            <div>
              <div className="seglabel">We deliver across</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 18px" }}>{a.name} &amp; nearby</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 20 }}>
                {a.areasServed.map((x) => (
                  <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "999px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink-700)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green-500)" }} />
                    {x}
                  </span>
                ))}
              </div>
              <Link href={`/locations/${a.servingKitchenSlug}`} style={{ display: "flex", gap: 13, alignItems: "center", textDecoration: "none", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 18 }}>
                <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", background: "var(--green-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50% 50% 50% 0", background: "var(--green-600)", transform: "rotate(45deg)" }} />
                </span>
                <span>
                  <span style={{ display: "block", fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Served by</span>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.125rem" }}>{a.servingKitchenName} →</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>{a.name} delivery FAQs</h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={a.faqs.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow={`In ${a.name}?`}
            title="Order ghar ka khana now"
            body="Fresh, home-style and delivered to your door — Swiggy, Zomato or WhatsApp."
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
