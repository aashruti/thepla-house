import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/blocks/PhotoSlot";
import { EnquiryForm, type EnquiryStep } from "@/components/blocks/EnquiryForm";
import { CTABanner } from "@/components/ds/CTABanner";
import { TrimBorder } from "@/components/ds/TrimBorder";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, serviceLd, faqPageLd } from "@/lib/seo";
import { FRANCHISE_CONTACT } from "@/data/site";
import { img } from "@/data/images";

export const metadata: Metadata = pageMetadata({
  title: "Open a Thepla House franchise — Tejal's Kitchen | Franchise opportunity",
  description:
    "Partner with Thepla House by Tejal's Kitchen — a proven 100% vegetarian, founder-led cloud-kitchen brand from Mumbai. Explore franchise formats, investment and support, and apply online.",
  path: "/franchise",
});

const STATS = [
  { n: "2018", l: "Founder-led, since" },
  { n: "7", l: "Kitchens in Mumbai" },
  { n: "250+", l: "Proven menu dishes" },
  { n: "100%", l: "Vegetarian brand" },
];

const REASONS = [
  {
    t: "A trusted, founder-led brand",
    s: "Built by Tejal since 2018, with a loyal Mumbai following and a clear, health-first story.",
  },
  {
    t: "A proven, repeatable menu",
    s: "250+ standardised dishes with recipes, SOPs and training you can rely on.",
  },
  {
    t: "Cloud-kitchen efficiency",
    s: "A lean footprint built for delivery — Swiggy, Zomato and WhatsApp from day one.",
  },
  {
    t: "Health-first positioning",
    s: "100% whole wheat, no palm oil, no preservatives — exactly what diners are looking for.",
  },
];

const STEPS = [
  { n: "1", t: "Apply", s: "Fill the franchise application on this page." },
  { n: "2", t: "We call you", s: "If it looks like a fit, our franchise lead calls you back." },
  { n: "3", t: "Set up", s: "Site, kitchen, supply chain and training." },
  { n: "4", t: "Launch", s: "Go live with ongoing brand and ops support." },
];

const FORMATS = ["Cloud kitchen (delivery)", "Dine-in outlet", "Both", "Not sure yet"];

/**
 * Franchise application — deliberately detailed.
 * Every question here is one our franchise lead would otherwise have to ask on a
 * call, so a completed form is already a qualified conversation. The length is the
 * point: people who are only browsing drop out before step 3.
 */
const FRANCHISE_STEPS: EnquiryStep[] = [
  {
    title: "About you",
    description: "So we know who we're talking to and how to reach you.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "First and last name" },
      { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, placeholder: "+91 98765 43210" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "currentCity", label: "City you live in", type: "text", required: true, placeholder: "e.g. Pune" },
      {
        name: "profileLink",
        label: "LinkedIn or company website",
        type: "url",
        placeholder: "linkedin.com/in/yourname",
        helper: "Optional, but it helps us come prepared to the call.",
        full: true,
      },
    ],
  },
  {
    title: "Where you want to open",
    description: "The more specific you are, the faster we can tell you whether the territory is open.",
    fields: [
      { name: "targetCity", label: "City you want to open in", type: "text", required: true, placeholder: "e.g. Pune" },
      {
        name: "targetLocality",
        label: "Preferred locality / area",
        type: "text",
        required: true,
        placeholder: "e.g. Kothrud, Baner",
        helper: "Name the neighbourhood, not just the city.",
      },
      {
        name: "format",
        label: "Format you have in mind",
        type: "radio",
        required: true,
        options: FORMATS,
        columns: 2,
      },
      {
        name: "siteStatus",
        label: "Do you have a site?",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: [
          "Yes — I own the property",
          "Yes — I have it on lease",
          "Shortlisted, not finalised",
          "No — I need help finding one",
        ],
        full: true,
      },
      {
        name: "siteArea",
        label: "Approximate carpet area (sq ft)",
        type: "number",
        min: 50,
        max: 20000,
        placeholder: "e.g. 450",
        helper: "A cloud kitchen typically needs 300–600 sq ft; a dine-in outlet more.",
        showWhen: {
          field: "siteStatus",
          equals: ["Yes — I own the property", "Yes — I have it on lease", "Shortlisted, not finalised"],
        },
      },
    ],
  },
  {
    title: "Investment & timeline",
    description:
      "We only take enquiries forward when the numbers are realistic, so please answer these honestly — there is no wrong answer.",
    fields: [
      {
        name: "investmentCapacity",
        label: "Total investment you're ready to commit",
        type: "radio",
        required: true,
        options: [
          "Under ₹10 lakh",
          "₹10–20 lakh",
          "₹20–35 lakh",
          "₹35–50 lakh",
          "Above ₹50 lakh",
          "Still working it out",
        ],
        columns: 2,
      },
      {
        name: "ownFundsShare",
        label: "How much of that is your own, ready-to-deploy funds?",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: ["All of it", "More than 75%", "50–75%", "25–50%", "Less than 25%"],
        helper: "Ready-to-deploy means available now — not expected or pending.",
        full: true,
      },
      {
        name: "fundingSource",
        label: "Where is the investment coming from?",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: [
          "Own savings",
          "Income from an existing business",
          "Family funds",
          "Bank loan — already approved",
          "Bank loan — not yet applied",
          "An investor / partner",
        ],
        full: true,
      },
      {
        name: "launchTimeline",
        label: "When would you want to launch?",
        type: "radio",
        required: true,
        options: [
          "Within 1 month",
          "1–3 months",
          "3–6 months",
          "6–12 months",
          "No fixed timeline — exploring",
        ],
        columns: 2,
      },
    ],
  },
  {
    title: "Your background",
    description: "We partner with operators, not just investors. Tell us what you've run before.",
    fields: [
      {
        name: "occupation",
        label: "Current occupation / profession",
        type: "text",
        required: true,
        placeholder: "e.g. Runs a distribution business",
        full: true,
      },
      {
        name: "foodBusinessExperience",
        label: "Food & beverage experience",
        type: "radio",
        required: true,
        options: [
          "I currently own or run an F&B business",
          "I have worked in F&B",
          "No F&B experience, but I've run other businesses",
          "This would be my first business",
        ],
      },
      {
        name: "dayToDayInvolvement",
        label: "How involved will you be day to day?",
        type: "radio",
        required: true,
        options: [
          "Full-time — I'll run it myself",
          "Part-time, alongside my current work",
          "I'll hire a manager and oversee it",
          "Purely as an investor",
        ],
      },
      {
        name: "franchiseHistory",
        label: "Have you owned a franchise before?",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: [
          "Yes — currently running one",
          "Yes — in the past",
          "No, but I've researched franchising",
          "No, this would be my first",
        ],
        full: true,
      },
      {
        name: "existingBusiness",
        label: "Existing business name (if any)",
        type: "text",
        placeholder: "Company or brand name",
        full: true,
      },
    ],
  },
  {
    title: "Fit & next steps",
    description: "Last one. This is the part our founder actually reads.",
    fields: [
      {
        name: "whyTheplaHouse",
        label: "Why Thepla House, and why this city?",
        type: "textarea",
        required: true,
        minLength: 120,
        placeholder:
          "What draws you to a 100% vegetarian, health-first brand? What do you know about demand in your area?",
        helper: "A few honest sentences. This is what moves an enquiry to the top of the pile.",
      },
      {
        name: "questions",
        label: "Anything you'd like to ask us?",
        type: "textarea",
        placeholder: "Questions about support, supply chain, agreements…",
      },
      {
        name: "bestTimeToCall",
        label: "Best time to call you",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: ["Morning (9am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–8pm)", "Any time on weekends"],
      },
      {
        name: "heardFrom",
        label: "How did you hear about us?",
        type: "select",
        required: true,
        placeholder: "Select one",
        options: [
          "Google search",
          "Instagram",
          "Ate at a Thepla House kitchen",
          "Swiggy / Zomato",
          "Word of mouth",
          "A franchise portal or consultant",
          "Other",
        ],
      },
      {
        name: "declaration",
        label: "Before you send this",
        type: "checkbox",
        required: true,
        options: [
          {
            value: "Confirmed accurate — understands the next step is a discovery call",
            label: "I confirm the details above are accurate.",
            helper:
              "I understand the next step is a discovery call, followed by a formal franchise application — not an immediate agreement.",
          },
        ],
      },
    ],
  },
];

const WE_LOOK_FOR = [
  {
    t: "You'll be hands-on",
    s: "Our strongest partners run the kitchen themselves, at least in year one. We're not looking for absentee investors.",
  },
  {
    t: "The funds are ready",
    s: "Setup, kitchen, supply chain and working capital need to be in place before launch — not raised along the way.",
  },
  {
    t: "You know your area",
    s: "You can tell us which locality, why the demand is there, and what else people eat nearby.",
  },
  {
    t: "You believe the food matters",
    s: "100% whole wheat, no palm oil, no preservatives. If that's a compromise for you, we're not the right fit.",
  },
];

const FRANCHISE_FAQS = [
  {
    q: "What franchise formats are available?",
    a: "Thepla House offers a delivery-first cloud-kitchen format as well as dine-in outlets. You can also start with a combination — tell us your city and we'll talk through what fits best.",
  },
  {
    q: "Which cities are you expanding to?",
    a: "We're a founder-led brand from Mumbai looking to bring Tejal's kitchen to new cities. Share your city or region in the enquiry form and our franchise lead will discuss the opportunity.",
  },
  {
    q: "What support do franchise partners receive?",
    a: "Partners get our proven 250+ dish menu with recipes and SOPs, training, supply-chain setup and ongoing brand and operations support — from enquiry right through to launch.",
  },
  {
    q: "How do I apply for a franchise?",
    a: "Fill the franchise application on this page. It takes about five minutes and covers everything our franchise lead would ask on a first call — your city, format, investment and background. We review every application and get in touch if there's a fit. We don't publish a direct phone line for franchise enquiries.",
  },
  {
    q: "Why is the application so detailed?",
    a: `We only open a handful of kitchens a year, so we'd rather have one real conversation than fifty introductory ones. The form answers the questions we'd otherwise ask on a call, which means your first conversation with us starts at the interesting part. If you'd prefer to write to us instead, email ${FRANCHISE_CONTACT.email}.`,
  },
];

export default function FranchisePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: "Thepla House franchise opportunity",
            description:
              "Partner with Thepla House by Tejal's Kitchen — a proven 100% vegetarian, founder-led cloud-kitchen brand from Mumbai. Explore franchise formats, support and the path to launch.",
            path: "/franchise",
          }),
          faqPageLd(FRANCHISE_FAQS),
        ]}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, var(--cream-50), var(--gold-50) 74%)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaves-right.png" alt="" aria-hidden="true" className="hero-motif" />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="seglabel">Franchise opportunity</div>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-display-lg)", lineHeight: 1.08, margin: "12px 0 18px" }}>
                Open a Thepla House franchise
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 520 }}>
                Bring Tejal&apos;s kitchen to your city. Partner with a proven, founder-led 100% vegetarian cloud-kitchen brand that&apos;s been winning Mumbai&apos;s trust since 2018 — with a 250+ dish menu and a health-first story that sells.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="#fr-form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}>
                  Start your application
                </Link>
<a href={`mailto:${FRANCHISE_CONTACT.email}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 26px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                  Email the franchise team
                </a>
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", height: 420 }}>
              <PhotoSlot
                subject="A bright Thepla House outlet counter / cloud-kitchen interior, branded"
                alt="Thepla House outlet counter"
                src={img("franchise")}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--gold-50)" }}>
        <TrimBorder pattern="bandhani" color="var(--gold-400)" size={16} />
        <div className="th-container" style={{ paddingTop: 44, paddingBottom: 44 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" style={{ textAlign: "center" }}>
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

      {/* Why partner with us */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="seglabel">Why partner with us</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              A brand people already trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REASONS.map((r) => (
              <div key={r.t} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <span aria-hidden="true" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "var(--gold-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 15, height: 15, borderRadius: "50% 50% 50% 0", background: "var(--gold-600)", transform: "rotate(45deg)" }} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.25rem" }}>
                    {r.t}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55, marginTop: 4 }}>
                    {r.s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--green-700)", position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/motifs/leaf-left.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: -20, left: -16, width: 150, opacity: 0.3 }} />
        <div className="th-container" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="seglabel" style={{ color: "var(--gold-300)" }}>How it works</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "var(--fs-h2)", margin: "6px 0 0" }}>
              From enquiry to launch
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((st) => (
              <div key={st.n} style={{ textAlign: "center", paddingTop: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "var(--gold-400)", color: "var(--ink-900)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.375rem", marginBottom: 14 }}>
                  {st.n}
                </span>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontWeight: 600, fontSize: "1.125rem", marginBottom: 5 }}>
                  {st.t}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  {st.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we look for */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
            <div className="seglabel">Before you apply</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 12px" }}>
              Who we&apos;re looking for
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: 0 }}>
              We open a small number of kitchens each year and stay close to every one of them. Read this honestly before you fill the form — if it doesn&apos;t sound like you, it&apos;s better for both of us to know now.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WE_LOOK_FOR.map((w) => (
              <div key={w.t} style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.1875rem" }}>
                  {w.t}
                </div>
                <div style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.9375rem", lineHeight: 1.55, marginTop: 5 }}>
                  {w.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="fr-form" style={{ background: "var(--cream-100)" }}>
        <div className="th-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="seglabel">Franchise application</div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h2)", margin: "6px 0 16px" }}>
                Apply to open a Thepla House
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 16px" }}>
                Five short steps, about five minutes. It covers your city and site, what you&apos;re ready to invest, your background and why this brand — the same ground we&apos;d cover on a first call.
              </p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "1.0625rem", lineHeight: 1.65, margin: "0 0 24px" }}>
                Every application is read. If there&apos;s a fit, our franchise lead will call you back on the number you give us.
              </p>
              <div style={{ background: "var(--green-700)", borderRadius: "var(--radius-xl)", padding: 24, color: "var(--cream-100)" }}>
                <div className="seglabel" style={{ color: "var(--gold-300)", fontSize: "0.6875rem" }}>Franchise contact</div>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--cream-50)", fontSize: "1.5rem", margin: "8px 0 4px" }}>
                  {FRANCHISE_CONTACT.name}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                  <a href={`mailto:${FRANCHISE_CONTACT.email}`} style={{ color: "var(--cream-100)", textDecoration: "none" }}>
                    {FRANCHISE_CONTACT.email}
                  </a>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--green-200)", lineHeight: 1.55, marginTop: 12 }}>
                  We don&apos;t publish a franchise phone line — the application is the fastest way to reach us, and we call you.
                </div>
              </div>
            </div>
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-md)", padding: 28 }}>
              <EnquiryForm
                kind="franchise"
                steps={FRANCHISE_STEPS}
                submitLabel="Submit application"
                successNote={`Your franchise application is with our team. We read every one and will be in touch on the number you gave us if there's a fit. For anything else, email ${FRANCHISE_CONTACT.email}.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-50)" }}>
        <div className="th-container" style={{ paddingTop: 8, paddingBottom: 56 }}>
          <CTABanner
            tone="gold"
            align="split"
            eyebrow="Ready to talk?"
            title="Let's build something together"
            body="Tell us about your city, your site and what you're ready to invest. If it's a fit, we'll walk you through formats, support and the path to launch."
            primaryLabel="Start your application"
            primaryHref="#fr-form"
            secondaryLabel="Email the franchise team"
            secondaryHref={`mailto:${FRANCHISE_CONTACT.email}`}
          />
        </div>
      </section>
    </>
  );
}
