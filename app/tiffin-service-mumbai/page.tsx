import type { Metadata } from "next";
import Link from "next/link";
import { PromiseStrip } from "@/components/blocks/PromiseStrip";
import { MenuItemCard } from "@/components/blocks/MenuItemCard";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { OrderChannels } from "@/components/blocks/OrderChannels";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd, breadcrumbLd } from "@/lib/seo";
import { POPULAR_DISHES, tagsFor } from "@/data/menu";
import { KITCHENS } from "@/data/kitchens";
import { img } from "@/data/images";

const PATH = "/tiffin-service-mumbai";

export const metadata: Metadata = pageMetadata({
  title: "Home-style food & healthy vegetarian tiffin in Mumbai",
  description:
    "Looking for home-style food, healthy food or a tiffin service near you in Mumbai? Thepla House cooks fresh, 100% vegetarian ghar ka khana — whole-wheat theplas, thalis, sabzis and farsan — delivered hot like a tiffin, any day. Jain & vegan options.",
  path: PATH,
});

const FAQS = [
  {
    q: "Do you offer a tiffin service in Mumbai?",
    a: "We cook fresh, home-style Gujarati food across Mumbai that works just like a tiffin — theplas, thalis, sabzis, farsan and sweets, delivered hot via Swiggy, Zomato or WhatsApp. There's no fixed dabba subscription or lock-in: order a home-cooked meal whenever you want one, any day of the week.",
  },
  {
    q: "Is it healthy, home-style food?",
    a: "Yes. Everything is 100% vegetarian and cooked the way it would be at home — whole-wheat atta (never maida), sunflower oil (never palm oil), no preservatives and no artificial colours. Jain and vegan options are tagged across the menu.",
  },
  {
    q: "How is this different from a regular tiffin or dabba?",
    a: "A typical tiffin is the same fixed thali every day. With us you pick exactly what you feel like from a 250+ dish home-style menu, and it's cooked fresh to order — so it arrives hot, not pre-packed hours earlier.",
  },
  {
    q: "Do you deliver home-style food near me?",
    a: "We run seven kitchens across Mumbai, Thane and Navi Mumbai — Chandivali, Kalina, Lower Parel, Mulund, Thane (Manpada), Navi Mumbai Airport and a Kandivali dine-in outlet — so there's usually one close by. Find your nearest on our locations page.",
  },
  {
    q: "Can I order home-style lunch every day?",
    a: "Of course. Order before 11am for same-day lunch delivery, as often as you like. Most kitchens are open Monday to Sunday, 9am to 10pm.",
  },
  {
    q: "Is the food fully vegetarian, Jain and vegan friendly?",
    a: "100% vegetarian, always. Jain (no onion, garlic or root vegetables) and vegan dishes are clearly marked on every menu.",
  },
];

export default function TiffinServicePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Home-style Gujarati meal delivery (tiffin-style), Mumbai",
            serviceType: "Meal delivery",
            description:
              "Fresh, 100% vegetarian home-style Gujarati food delivered across Mumbai like a tiffin — whole-wheat theplas, thalis, sabzis, farsan and sweets, made to order with Jain and vegan options.",
            path: PATH,
            areaServed: [
              "Mumbai",
              "Navi Mumbai",
              "Thane",
              "Andheri",
              "Powai",
              "Chandivali",
              "Kalina",
              "Santacruz",
              "Lower Parel",
              "Mulund",
              "Kandivali",
            ],
          }),
          faqPageLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Home-style food & tiffin, Mumbai", path: PATH },
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
            <span style={{ color: "var(--color-headline)", fontWeight: 600 }}>Home-style food &amp; tiffin</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center">
            <div>
              <div className="seglabel">Home-style food · Healthy · Mumbai</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.06, margin: "8px 0 16px" }}>
                Home-style food &amp; healthy vegetarian tiffin, across Mumbai
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62, margin: "0 0 24px", maxWidth: 560 }}>
                Craving real ghar ka khana instead of another greasy takeaway? Thepla House is the
                home-style, healthy alternative to a tiffin service — 100% vegetarian Gujarati food
                cooked fresh to order with whole-wheat atta, sunflower oil and no preservatives, then
                delivered hot to your door. No fixed dabba, no lock-in: order a home-cooked meal any day.
              </p>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <Link href="/menu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Order now
                </Link>
                <Link href="/locations" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Find a kitchen near you
                </Link>
              </div>
              <OrderChannels label="Order on" />
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 340 }}>
              <PhotoSlot subject="Home-style Gujarati thali of methi thepla, dal, sabzi and rice — a healthy tiffin-style meal" alt="Home-style healthy vegetarian tiffin meal in Mumbai" src={img("home-hero")} priority sizes="(max-width: 1024px) 100vw, 45vw" style={{ height: 340, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

      <PromiseStrip />

      {/* The tiffin upgrade */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 760, marginBottom: 36 }}>
            <div className="seglabel">Why it beats a regular tiffin</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              The home-style tiffin, upgraded
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62 }}>
              A typical tiffin is the same fixed thali, packed hours ahead. We do it differently:
              every order is cooked fresh from a 250+ dish home-style menu, so your healthy lunch
              arrives hot — not soggy — exactly the way it leaves a home kitchen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Cooked fresh, to order", s: "No pre-packed dabbas sitting for hours. We cook after you order, so it's hot and fresh on arrival." },
              { t: "Healthy by default", s: "Whole-wheat atta, never maida. Sunflower oil, never palm oil. No preservatives, no artificial colours." },
              { t: "You choose, every day", s: "Pick what you feel like from 250+ home-style dishes — theplas, thalis, sabzis, farsan and sweets." },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "0 0 8px" }}>{c.t}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: 0 }}>{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular home-style dishes */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="seglabel">On the home menu</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
                Home-style favourites
              </h2>
            </div>
            <Link href="/menu" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", whiteSpace: "nowrap" }}>
              See all 250+ dishes →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_DISHES.map((d) => (
              <MenuItemCard key={d.title} title={d.title} desc={d.desc} subject={d.subject} alt={d.alt} tags={tagsFor(d.keys)} />
            ))}
          </div>
        </div>
      </section>

      {/* Near me — kitchens */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ maxWidth: 720, marginBottom: 26 }}>
            <div className="seglabel">Home-style food near you</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              Seven kitchens across Mumbai, Thane &amp; Navi Mumbai
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.62 }}>
              Whichever side of the city you're on, there's a Thepla House kitchen nearby cooking fresh
              home-style food for delivery. Tap your area to see timings and order.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 11 }}>
            {KITCHENS.map((k) => (
              <Link key={k.slug} href={`/locations/${k.slug}`} style={{ display: "inline-flex", flexDirection: "column", gap: 2, padding: "12px 18px", background: "var(--white)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.0625rem" }}>{k.title}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.8125rem" }}>{k.area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.875rem", margin: "6px 0 24px" }}>
            Home-style food &amp; tiffin FAQs
          </h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Hungry for ghar ka khana?"
            title="Order fresh home-style food today"
            body="Healthy, 100% vegetarian and cooked to order — delivered hot on Swiggy, Zomato or WhatsApp."
            primaryLabel="Order now"
            primaryHref="/menu"
            secondaryLabel="Find a kitchen near you"
            secondaryHref="/locations"
          />
        </div>
      </section>
    </>
  );
}
