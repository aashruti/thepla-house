import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbLd, absUrl } from "@/lib/seo";
import { SITE } from "@/data/site";
import { KITCHENS } from "@/data/kitchens";
import { img } from "@/data/images";

/**
 * Counted from the kitchen data rather than hardcoded, so the story copy can
 * never drift out of step with /locations the way "7 kitchens" once did.
 */
const OUTLET_COUNT = KITCHENS.length;

export const metadata: Metadata = pageMetadata({
  title: "Our story — Tejal Shah & Thepla House by Tejal's Kitchen",
  description:
    "The story of Tejal Shah and Thepla House by Tejal's Kitchen — started in 2018 with 5 kg of atta and one belief, now a multi-crore food business with 250+ offerings across Mumbai. \u201cJunk the Junk Food.\u201d",
  path: "/about",
});

const STATS = [
  { n: "5 kg", l: "Of atta, where it began" },
  { n: "2018", l: "Founder-led, since" },
  { n: `${OUTLET_COUNT}`, l: "Locations across Mumbai" },
  { n: "250+", l: "Food offerings" },
];

/** "Junk the Junk Food" — the food philosophy, in the founder's own words. */
const PHILOSOPHY = [
  "100% wheat flour",
  "No preservatives",
  "No artificial colours",
  "100% natural ingredients",
  "Sunflower oil",
  "Fresh preparation",
  "Made to order",
  "Customization based on customer requirements",
];

/**
 * Taken from the brand-evolution deck. The years there run a year later than
 * the timeline this page used to carry (Santacruz 2020 not 2019, Lower Parel
 * 2021 not 2020, Mulund 2022 not 2021). The deck's own 2022 appears twice —
 * Mulund and the Singapore supply line — so they share one entry here rather
 * than duplicating the year on the rail.
 */
const MILESTONES = [
  { year: "2018", title: "It starts at home", text: "Tejal's Kitchen begins from Tejal's own kitchen, and the first outlet opens in Andheri." },
  { year: "2019", title: "The brand is named", text: "Tejal's Kitchen becomes Thepla House by Tejal's Kitchen, with its first professionally equipped commercial kitchen in Andheri." },
  { year: "2020", title: "Santacruz", text: "A second outlet brings Gujarati and Rajasthani home cooking, with Jain options, to Santacruz." },
  { year: "2021", title: "Lower Parel + catering", text: "Salads, juices and corporate catering launch, and the third outlet opens in Lower Parel." },
  { year: "2022", title: "Mulund + Singapore", text: "The fourth outlet opens in Mulund and the menu passes 250 dishes. Cold-blast supply to Singapore begins." },
  { year: "2023", title: "Thane", text: "A new branch opens, serving Thane." },
  { year: "2024", title: "Dadoji Konddev Stadium", text: "A second Thane branch opens at the stadium with dine-in and banquet service, and the catering business expands." },
  { year: "2025", title: "Kandivali dine-in", text: "Kandivali opens with a full dine-in menu of Gujarati and Rajasthani food." },
  { year: "2026", title: "Navi Mumbai Airport", text: "Our first franchise outlet opens at Navi Mumbai International Airport, with Semolina Kitchens Limited, a group company of the Adani Group." },
];

const GROWTH = [
  {
    stat: "250+",
    title: "From one product to 250+ offerings",
    paras: [
      "What began with handcrafted theplas has grown into a portfolio of 250+ food items, serving customers from breakfast and snacks through to lunch, dinner and catering.",
      "The menu has expanded to meet changing preferences while keeping its original focus on home-style food.",
    ],
  },
  {
    stat: "200+",
    title: "One system, every kitchen",
    paras: [
      "Buying, sourcing and the kitchens themselves all run on one system. Every kitchen can see what it has and what it needs, instead of each one keeping its own count on paper.",
      "The kitchens get through 200+ raw materials, and they come from a deliberately short list of suppliers we trust. Each kitchen orders what it is about to cook, rather than sitting on a storeroom of stock.",
    ],
  },
  {
    stat: "5 kg",
    title: "A brand built on reinvestment",
    paras: [
      "The business started with 5 kg of atta. The first year's profits went straight back in, to establish the first commercial kitchen.",
      "From there it kept growing the same way — reinvesting into people, kitchens, technology, sourcing systems and new locations.",
    ],
  },
];

const VALUES = [
  { t: "100% whole wheat", s: "Every roti and thepla is whole-wheat atta — no maida, ever." },
  { t: "Sunflower oil only", s: "We never cook with palm oil." },
  { t: "Zero preservatives", s: "No artificial colours or additives, made fresh after every order." },
  { t: "Jain & vegan, by design", s: "Inclusive menus, clearly tagged, cooked with care." },
];

const aboutPageLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Our story — Thepla House by Tejal's Kitchen",
  url: absUrl("/about"),
  description:
    "The founder-led brand story of Thepla House by Tejal's Kitchen — from 5 kg of atta in Tejal Shah's home kitchen in 2018 to a multi-crore Mumbai food business with 250+ offerings — and the food philosophy behind \"Junk the Junk Food.\"",
  about: { "@id": `${SITE.url}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageLd,
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Our story", path: "/about" },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 48, paddingBottom: 48 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <div className="seglabel">The story of Tejal Shah</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 16px" }}>
                From 5 kg of atta to a multi-crore food brand
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
                What started in 2018 with 5 kg of atta and a simple idea has grown into a multi-crore food business — {OUTLET_COUNT} locations across Mumbai and 250+ food offerings.
              </p>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 440 }} className="h-64 md:h-[440px]">
              <PhotoSlot
                subject="Founder Tejal in her kitchen, rolling theplas, warm side light, hands in frame"
                alt="Tejal, founder of Thepla House by Tejal's Kitchen, rolling theplas"
                src={img("founder-tejal")}
                position="top"
                priority
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section style={{ background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 20px" }}>
            Founded by Tejal Shah, Thepla House by Tejal&apos;s Kitchen was born from a simple belief: healthy, wholesome, home-cooked food should be accessible beyond our homes.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 20px" }}>
            Tejal started the business from her own home, initially preparing and selling just one product — the humble, handcrafted thepla, one of Gujarat&apos;s most loved everyday foods.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 24px" }}>
            The objective was never just to sell theplas. It was to formalize the concept of home-cooked food, and make fresh, wholesome meals available to people looking for a healthier alternative to conventional fast food.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--gold-50)" }}>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} />
        <div className="th-container" style={{ paddingTop: 44, paddingBottom: 44 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "2.75rem", fontWeight: 600, lineHeight: 1 }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", marginTop: 6 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} flip />
      </section>

      {/* Philosophy */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
            <div className="seglabel">The philosophy</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 16px" }}>
              &ldquo;Junk the Junk Food&rdquo;
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: 0 }}>
              That belief became the whole brand: cook the <em>ghar ka khana</em> people grew up on, and cook it the same way every day, in every kitchen.
            </p>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, padding: 0, margin: 0, maxWidth: 860, marginInline: "auto" }}>
            {PHILOSOPHY.map((item) => (
              <li
                key={item}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: 999, padding: "9px 16px", fontFamily: "var(--font-body)", color: "var(--color-headline)", fontWeight: 600, fontSize: "0.9375rem" }}
              >
                <span aria-hidden="true" style={{ flexShrink: 0, display: "inline-block", width: 7, height: 12, border: "solid var(--color-primary)", borderWidth: "0 2px 2px 0", transform: "rotate(45deg)", marginBottom: 3 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Motto & vision */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", top: -18, right: -20, width: 170, opacity: 0.25, transform: "scaleX(-1)" }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14" style={{ maxWidth: 1040, margin: "0 auto" }}>
            <div>
              <div className="seglabel" style={{ color: "var(--gold-300)" }}>Our motto</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "1.875rem", lineHeight: 1.2, margin: "8px 0 16px" }}>
                Embrace the change: junk the junk food
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "1.0625rem", lineHeight: 1.7, margin: "0 0 14px" }}>
                Healthy, homemade meals from Thepla House by Tejal&apos;s Kitchen — 100% quality and freshness in every bite.
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "1.0625rem", lineHeight: 1.7, margin: 0 }}>
                From humble beginnings in a house kitchen, we have grown to {OUTLET_COUNT} locations across Mumbai. Our unwavering motto is to champion healthy homemade food, and to uphold the highest standards of quality and freshness.
              </p>
            </div>
            <div>
              <div className="seglabel" style={{ color: "var(--gold-300)" }}>Our vision</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "1.875rem", lineHeight: 1.2, margin: "8px 0 16px" }}>
                Home-cooked food, everywhere
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "1.0625rem", lineHeight: 1.7, margin: "0 0 14px" }}>
                A passion for serving home-cooked food, promoting healthy living, and giving back to the neighbourhood.
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "1.0625rem", lineHeight: 1.7, margin: 0 }}>
                We aim to globalise the concept and the brand — bringing wholesome food to the masses, guiding them away from junk food and towards a year-round healthy eating lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="seglabel">The journey</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 14px" }}>
              From a home kitchen to {OUTLET_COUNT} commercial kitchens
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.7, margin: "0 auto", maxWidth: 720 }}>
              For the first year Tejal ran the business from home. Those profits were reinvested into the first commercial kitchen at Chandivali, Andheri — built around an open-kitchen concept — and the brand has grown one location at a time ever since.
            </p>
          </div>

          {/* Vertical alternating timeline. Was a horizontal rail, which broke
              once the milestones outgrew the container: the rail is absolutely
              positioned to its parent, so it spanned the visible width while the
              cards scrolled past it — the line simply stopped mid-timeline. This
              grows downward instead, so it holds any number of entries without
              scrolling or clipping. */}
          <div className="th-timeline">
            {MILESTONES.map((m) => (
              <div className="th-timeline-item" key={m.year}>
                <span aria-hidden="true" className="th-timeline-dot" />
                <div
                  className="th-timeline-card"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "16px 18px" }}
                >
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--gold-700)", fontSize: "1.375rem", fontWeight: 600, lineHeight: 1 }}>{m.year}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1rem", margin: "6px 0 4px" }}>{m.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55 }}>{m.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it scaled */}
      <section style={{ background: "var(--gold-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">How it scaled</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              Built one reinvestment at a time
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: 1080, margin: "0 auto" }}>
            {GROWTH.map((g) => (
              <article key={g.title} style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: "26px 24px" }}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--gold-700)", fontSize: "2rem", fontWeight: 600, lineHeight: 1 }}>{g.stat}</div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.25rem", margin: "10px 0 8px" }}>{g.title}</h3>
                {g.paras.map((t) => (
                  <p key={t.slice(0, 24)} style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.65, margin: "0 0 10px" }}>
                    {t}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">The people</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              Meet the team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: 1080, margin: "0 auto" }}>
            {[
              {
                key: "team:tejal",
                name: "Tejal Shah",
                role: "Founder & MD",
                subject: "Portrait of Tejal Shah, Founder & MD of Thepla House by Tejal's Kitchen",
                alt: "Tejal Shah, Founder & MD of Thepla House by Tejal's Kitchen",
                bio: "Tejal started Thepla House by Tejal's Kitchen from her own Mumbai kitchen in 2018 with one belief: eating out shouldn't mean eating junk. She still tastes and signs off on the home-style recipes behind every thepla, thali and farsan.",
                linkedin: "https://www.linkedin.com/in/tejal-shah-18893a189/",
              },
              {
                key: "team:dhaval",
                name: "Dhaval Shah",
                role: "Co-Founder & CEO",
                subject: "Portrait of Dhaval Shah, Co-Founder & CEO of Thepla House by Tejal's Kitchen",
                alt: "Dhaval Shah, Co-Founder & CEO of Thepla House by Tejal's Kitchen",
                bio: "Dhaval drives Thepla House by Tejal's Kitchen's growth, opening new kitchens, dine-in outlets and franchise partnerships that bring Tejal's home-style food to more neighbourhoods across Mumbai and beyond.",
                linkedin: "https://www.linkedin.com/in/dhaval-shah-064482a/",
              },
              {
                key: "team:shravan",
                name: "Chef Shravan Mali",
                role: "Head Chef",
                subject: "Portrait of Chef Shravan Mali, Head Chef at Thepla House by Tejal's Kitchen",
                alt: "Chef Shravan Mali, Head Chef at Thepla House by Tejal's Kitchen",
                bio: "For Shravan, cooking is about more than food. It's about bringing people together through honest, comforting flavours. He leads our kitchen with a focus on quality, preparing every dish with whole wheat, sunflower oil and carefully selected ingredients that reflect the warmth of a homemade meal.",
                linkedin: "https://www.linkedin.com/in/shravan-mali-32472b274/",
              },
            ].map((m) => (
              <article key={m.name} style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                <div style={{ height: 340 }}>
                  <PhotoSlot subject={m.subject} alt={m.alt} src={img(m.key)} position="top" style={{ height: "100%", width: "100%" }} />
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.375rem", margin: "0 0 2px" }}>{m.name}</h3>
                  <div className="seglabel" style={{ marginBottom: 8 }}>{m.role}</div>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.6, margin: m.linkedin ? "0 0 14px" : 0 }}>{m.bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, left: -16, width: 160, opacity: 0.3 }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>What we promise</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              No shortcuts, ever
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 md:gap-y-[18px]" style={{ maxWidth: 900, margin: "0 auto" }}>
            {VALUES.map((v) => (
              <div key={v.t} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "var(--green-600)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                  <span style={{ display: "inline-block", width: 8, height: 14, border: "solid var(--gold-300)", borderWidth: "0 2.5px 2.5px 0", transform: "rotate(45deg)", marginBottom: 3 }} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontWeight: 600, fontSize: "1.1875rem" }}>{v.t}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: 2 }}>{v.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next chapter */}
      <section style={{ background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 20px", textAlign: "center" }}>
          <div className="seglabel">The next chapter</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 18px" }}>
            From Mumbai to India
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 18px" }}>
            With a strong presence established across Mumbai, Thepla House by Tejal&apos;s Kitchen is entering its next phase of growth — partnering with experienced business groups outside Mumbai who understand hospitality and food service, and have the financial and operational capability to build the brand in new markets.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 26px" }}>
            The franchise model is intended for partners who share the brand&apos;s philosophy of quality, consistency, operational discipline and healthy home-style food.
          </p>
          <Link
            href="/franchise"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "13px 26px", background: "var(--color-primary)", color: "var(--cream-50)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, textDecoration: "none" }}
          >
            Explore franchise partnerships
          </Link>

          <div style={{ marginTop: 44, paddingTop: 32, borderTop: "1px solid var(--color-outline-variant)" }}>
            <p style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "1.5rem", lineHeight: 1.45, margin: "0 0 18px" }}>
              From 5 kg of atta to {OUTLET_COUNT} locations.
              <br />
              From one thepla to 250+ offerings.
              <br />
              From a home kitchen to a growing food brand.
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.7, margin: "0 0 20px" }}>
              A story of entrepreneurship, reinvestment, consistency and a simple belief — that good food can be both delicious and healthy. And this is only the beginning.
            </p>
            <div style={{ fontFamily: "var(--font-script)", color: "var(--color-primary)", fontSize: "2.25rem", lineHeight: 1 }}>
              — Tejal Shah
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 52 }}>
          <CTABanner
            tone="maroon"
            align="split"
            eyebrow="Taste the difference"
            title="Try Tejal's home-style food"
            body="Order fresh today on Swiggy, Zomato or WhatsApp — or plan a catering spread."
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
