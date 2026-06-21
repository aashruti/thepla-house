import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/blocks/Hero";
import { PromiseStrip } from "@/components/blocks/PromiseStrip";
import { MenuItemCard } from "@/components/blocks/MenuItemCard";
import { KitchenCard } from "@/components/blocks/KitchenCard";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { Accordion } from "@/components/ds/Accordion";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, restaurantLd, faqPageLd } from "@/lib/seo";
import { POPULAR_DISHES, tagsFor } from "@/data/menu";
import { KITCHENS } from "@/data/kitchens";
import { HOME_FAQS } from "@/data/faqs";
import { ORDER_PHONE, FRANCHISE_CONTACT } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Thepla House by Tejal's Kitchen — Home-style Gujarati food, Mumbai",
  description:
    "100% vegetarian, whole-wheat Gujarati food made fresh in Mumbai since 2018. Order theplas, thalis & snacks on Swiggy, Zomato or WhatsApp. Jain & vegan options.",
  path: "/",
});

export default function HomePage() {
  // Featured on the home grid — Kandivali dine-in leads; Mulund/Thane/Navi Mumbai live on /locations.
  const homeKitchens = ["kandivali", "chandivali", "kalina", "lower-parel"].map(
    (s) => KITCHENS.find((k) => k.slug === s)!,
  );
  return (
    <>
      <JsonLd
        data={[
          restaurantLd({ url: "/", locality: "Mumbai", latitude: 19.1136, longitude: 72.8697 }),
          faqPageLd(HOME_FAQS),
        ]}
      />

      <Hero
        eyebrow="Mumbai · 100% vegetarian · since 2018"
        title="Real ghar ka khana, made fresh and delivered today"
        intro="Thepla House by Tejal's Kitchen is a 100% vegetarian cloud kitchen in Mumbai, serving home-style Gujarati food made with whole-wheat atta, sunflower oil and no preservatives — cooked fresh every morning since 2018."
        photo={{
          subject: "Hero: brass thali of methi thepla, dal, sabzi & achar, warm side light",
          alt: "A home-style Gujarati spread on a brass thali",
          src: img("home-hero"),
        }}
        primaryCta={{ label: "Order now", href: "/menu" }}
        secondaryCta={{ label: "See the menu", href: "/menu" }}
        showChannels
      />

      <TrimBorder pattern="toran" color="var(--gold-400)" size={18} flip />
      <PromiseStrip />

      {/* Popular dishes */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="seglabel">From the kitchen</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
                Most-loved dishes
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

      {/* Kitchens */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
            <div>
              <div className="seglabel">Find us</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
                7 kitchens across Mumbai
              </h2>
            </div>
            <Link href="/locations" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none", whiteSpace: "nowrap" }}>
              All locations →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeKitchens.map((k) => (
              <KitchenCard key={k.slug} title={k.title} area={k.area} note={k.address} hours={k.hours} detailHref={`/locations/${k.slug}`} directionsHref={`https://www.google.com/maps?q=${encodeURIComponent(k.mapQuery)}`} orderHref="/menu" />
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-500)", fontSize: "0.9375rem", margin: "20px 0 0" }}>
            Plus Mulund (Mulund West), Thane (Manpada) and our Navi Mumbai Airport outlet.
          </p>
        </div>
      </section>

      {/* Travel packs */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -24, left: -20, width: 200, opacity: 0.32 }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-photo" style={{ height: 340, order: 0 }}>
              <PhotoSlot subject="Vacuum-packed methi thepla travel packs stacked, with brand label" alt="Vacuum-sealed methi thepla travel packs" src={img("travel-pack")} style={{ height: "100%", width: "100%" }} />
            </div>
            <div>
              <div className="seglabel" style={{ color: "var(--gold-300)" }}>Made to carry · fresh for 7+ days</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "8px 0 16px" }}>
                Theplas that travel as far as you do
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--cream-200)", fontSize: "1.0625rem", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 480 }}>
                Our vacuum-packed methi thepla stays fresh 7+ days — pick up a stack for the journey, or carry a taste of home to family abroad.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Vacuum-packed, fresh for 7+ days", "100% whole wheat, no preservatives", "Made to carry — perfect for travel"].map((t) => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--cream-100)", fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold-300)" }} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/travel-packs" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 50, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-secondary)", background: "var(--color-secondary)", border: "none", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                Order travel packs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-photo" style={{ height: 360, boxShadow: "var(--shadow-md)" }}>
              <PhotoSlot subject="Hands rolling a fresh methi thepla in Tejal's kitchen" alt="Rolling fresh theplas by hand" src={img("rolling-hands")} style={{ height: "100%", width: "100%" }} />
            </div>
            <div>
              <div className="seglabel">Our story</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "8px 0 16px" }}>
                Made by Tejal, like she makes it at home
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 14px", maxWidth: 560 }}>
                Thepla House started in Tejal&apos;s Mumbai kitchen in 2018 with one belief: eating out shouldn&apos;t mean eating junk. Every dish is still cooked the way she&apos;d make it for her own family — whole wheat, sunflower oil, no shortcuts.
              </p>
              <div style={{ fontFamily: "var(--font-script)", color: "var(--color-primary)", fontSize: "2.25rem", lineHeight: 1, marginBottom: 18 }}>
                — Tejal Shah
              </div>
              <Link href="/about" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catering + Franchise teasers */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article style={{ background: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
              <div style={{ height: 160 }}>
                <PhotoSlot subject="Catering spread — large brass platters for an event" alt="Catering platters laid out for an event" src={img("catering")} style={{ height: 160, width: "100%" }} />
              </div>
              <div style={{ padding: 24 }}>
                <div className="seglabel">Catering</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.5rem", margin: "6px 0 8px" }}>Catering for events &amp; pooja</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55, margin: "0 0 14px" }}>
                  Full Jain menus available, cooked fresh for gatherings of any size — from a home pooja to a hall.
                </p>
                <Link href="/catering" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                  Plan a catering order →
                </Link>
              </div>
            </article>
            <article style={{ background: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
              <div style={{ height: 160 }}>
                <PhotoSlot subject="A bright Thepla House dine-in counter / storefront" alt="Thepla House outlet counter" src={img("franchise")} style={{ height: 160, width: "100%" }} />
              </div>
              <div style={{ padding: 24 }}>
                <div className="seglabel">Franchise</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.5rem", margin: "6px 0 8px" }}>Open a Thepla House franchise</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55, margin: "0 0 14px" }}>
                  Bring Tejal&apos;s kitchen to your city. Talk to {FRANCHISE_CONTACT.name} · {FRANCHISE_CONTACT.phone} · {FRANCHISE_CONTACT.email}
                </p>
                <Link href="/franchise" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}>
                  Franchise enquiry →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 20px", textAlign: "center" }}>
          <div className="seglabel">Good to know</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 28px" }}>
            Questions, answered
          </h2>
          <div style={{ textAlign: "left" }}>
            <Accordion items={HOME_FAQS.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={[0]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingBottom: 56 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Hungry?"
            title="Real ghar ka khana, a few taps away"
            body={`Order on Swiggy, Zomato or WhatsApp — or call ${ORDER_PHONE}.`}
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
