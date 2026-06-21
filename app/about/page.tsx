import type { Metadata } from "next";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, organizationLd, breadcrumbLd, absUrl } from "@/lib/seo";
import { SITE } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Our story — Tejal's Kitchen, since 2018 | Thepla House",
  description:
    "Thepla House by Tejal's Kitchen began in Mumbai in 2018 with one belief — eating out shouldn't mean eating junk. Meet the founder and the food philosophy behind 100% whole-wheat, preservative-free home-style cooking.",
  path: "/about",
});

const STATS = [
  { n: "2018", l: "Founder-led, since" },
  { n: "7", l: "Kitchens across Mumbai" },
  { n: "250+", l: "Home-style dishes" },
  { n: "100%", l: "Vegetarian & whole wheat" },
];

const MILESTONES = [
  { year: "2018", title: "First outlet, Andheri", text: "Thepla House opens its very first outlet in Andheri." },
  { year: "2019", title: "Santacruz branch", text: "Santacruz opens — Gujarati, Rajasthani & Jain menus." },
  { year: "2020", title: "Catering + Lower Parel", text: "Our catering vertical launches and the Lower Parel branch opens." },
  { year: "2021", title: "Mulund + 250 dishes", text: "Mulund branch opens and the menu grows to 250+ items." },
  { year: "2022", title: "International supply", text: "Singapore cold-blast supply begins." },
  { year: "2023", title: "Corporate catering", text: "Corporate catering partnership with Golden Legend." },
  { year: "2024", title: "Thane branch", text: "Manpada, Thane branch added." },
  { year: "2025", title: "Airport + dine-in", text: "Navi Mumbai Airport franchise and Kandivali dine-in open." },
];

const VALUES = [
  { t: "100% whole wheat", s: "Every roti and thepla is whole-wheat atta — no maida, ever." },
  { t: "Sunflower oil only", s: "We never cook with palm oil." },
  { t: "Zero preservatives", s: "No artificial colours or additives — made fresh daily." },
  { t: "Jain & vegan, by design", s: "Inclusive menus, clearly tagged, cooked with care." },
];

const aboutPageLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Our story — Thepla House by Tejal's Kitchen",
  url: absUrl("/about"),
  description:
    "The founder-led brand story of Thepla House by Tejal's Kitchen — Mumbai, since 2018 — and the food philosophy behind \"Junk the Junk Food.\"",
  about: { "@type": "Organization", name: SITE.name },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageLd,
          organizationLd(),
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
              <div className="seglabel">Our story</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 16px" }}>
                Made by Tejal, like she makes it at home
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
                Thepla House by Tejal&apos;s Kitchen began in Mumbai in 2018 with one belief — eating out shouldn&apos;t mean eating junk. Every dish is still cooked the way Tejal would make it for her own family.
              </p>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 440 }} className="h-64 md:h-[440px]">
              <PhotoSlot
                subject="Founder Tejal in her kitchen, rolling theplas, warm side light, hands in frame"
                alt="Tejal, founder of Thepla House, rolling theplas"
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
            It started with just 5 kg of atta in Tejal&apos;s home kitchen. Theplas were rolled by hand and shared with friends who kept asking for more, and what they loved wasn&apos;t only the taste; it was knowing exactly what went in: 100% whole-wheat atta, sunflower oil, and not a trace of maida or preservatives.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", fontSize: "var(--fs-body-lg)", lineHeight: 1.75, margin: "0 0 24px" }}>
            From those 5 kilos, it has grown into seven kitchens across Mumbai and a menu of 250+ dishes, and the promise hasn&apos;t changed one bit.
          </p>
          <div style={{ fontFamily: "var(--font-script)", color: "var(--color-primary)", fontSize: "2.5rem", lineHeight: 1 }}>
            — Tejal Shah
          </div>
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

      {/* Timeline */}
      <section style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="seglabel">The journey</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              From one kitchen to seven
            </h2>
          </div>

          {/* Desktop alternating timeline */}
          <div className="hidden md:block" style={{ position: "relative", height: 460 }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 3, background: "var(--gold-400)", transform: "translateY(-50%)", zIndex: 0 }} />
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${MILESTONES.length}, 1fr)`, height: "100%" }}>
              {MILESTONES.map((m, i) => {
                const above = i % 2 === 0;
                const card = (
                  <div style={{ width: "100%", textAlign: "center", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "12px 11px" }}>
                    <div style={{ fontFamily: "var(--font-display)", color: "var(--gold-700)", fontSize: "1.25rem", fontWeight: 600, lineHeight: 1 }}>{m.year}</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-headline)", fontWeight: 600, fontSize: "0.875rem", margin: "5px 0 3px" }}>{m.title}</div>
                    <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.78rem", lineHeight: 1.4 }}>{m.text}</div>
                  </div>
                );
                const connector = <span aria-hidden="true" style={{ width: 0, borderLeft: "1.5px dashed var(--color-outline-strong)", height: 18 }} />;
                return (
                  <div key={m.year} style={{ display: "grid", gridTemplateRows: "1fr auto 1fr", justifyItems: "center", padding: "0 7px" }}>
                    <div style={{ gridRow: 1, alignSelf: "end", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                      {above && card}
                      {above && connector}
                    </div>
                    <span aria-hidden="true" style={{ gridRow: 2, zIndex: 2, width: 20, height: 20, borderRadius: "50%", background: "var(--gold-400)", border: "3px solid var(--cream-50)", boxShadow: "0 0 0 1.5px var(--gold-500)" }} />
                    <div style={{ gridRow: 3, alignSelf: "start", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                      {!above && connector}
                      {!above && card}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="flex flex-col md:hidden" style={{ maxWidth: 480, margin: "0 auto" }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--maroon-600)", border: "3px solid var(--cream-100)", boxShadow: "0 0 0 1px var(--maroon-600)" }} />
                  {i < MILESTONES.length - 1 && <span aria-hidden="true" style={{ flex: 1, width: 2, background: "var(--color-outline)" }} />}
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--gold-700)", fontSize: "1.25rem", fontWeight: 600 }}>{m.year}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1rem", margin: "2px 0 3px" }}>{m.title}</div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.875rem", lineHeight: 1.5 }}>{m.text}</div>
                </div>
              </div>
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
                subject: "Portrait of Tejal Shah, Founder & MD of Thepla House",
                alt: "Tejal Shah, Founder & MD of Thepla House",
                bio: "Tejal started Thepla House from her own Mumbai kitchen in 2018 with one belief: eating out shouldn't mean eating junk. She still tastes and signs off on the home-style recipes behind every thepla, thali and farsan.",
                linkedin: "https://www.linkedin.com/in/tejal-shah-18893a189/",
              },
              {
                key: "team:dhaval",
                name: "Dhaval Shah",
                role: "Co-Founder & CEO",
                subject: "Portrait of Dhaval Shah, Co-Founder & CEO of Thepla House",
                alt: "Dhaval Shah, Co-Founder & CEO of Thepla House",
                bio: "Dhaval drives Thepla House's growth, opening new kitchens, dine-in outlets and franchise partnerships that bring Tejal's home-style food to more neighbourhoods across Mumbai and beyond.",
                linkedin: "https://www.linkedin.com/in/dhaval-shah-064482a/",
              },
              {
                key: "team:shravan",
                name: "Chef Shravan Mali",
                role: "Head Chef",
                subject: "Portrait of Chef Shravan Mali, Head Chef at Thepla House",
                alt: "Chef Shravan Mali, Head Chef at Thepla House",
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
