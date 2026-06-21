# Thepla House — build conventions (read before writing any page)

Production Next.js 15 (App Router) + TypeScript + Tailwind 3. Design system tokens are
the source of truth. The `*.dc.html` files in `extracted/` are the design source of truth
for layout, copy and spacing.

## How to read a `.dc.html` design file

Each file shows the SAME page twice (a 390px mobile artboard and a 1280px desktop artboard)
plus review chrome. Build ONE responsive page. **Ignore** all of this scaffolding:

- The outer page-chrome (`Step 3 · High-fidelity page…`, the `<h1>Page name</h1>` heading box)
- The **SEO / GEO notes** box (but DO use its title/description/canonical/H1/JSON-LD instructions)
- The phone frame wrapper, the `MOBILE · 360–767px` / `DESKTOP · 1024px+` pills
- The **Tablet reflow note** box (but DO implement what it says for 768–1023px)
- The per-screen persistent order bar inside the phone frame (the global `MobileOrderBar`
  in the layout already handles this — do not re-add it)
- `data-screen-label` attributes

The real page = the sequence of `<section>`s. The page data lives in the `renderVals()` script
at the bottom. Use the **exact copy** from the design.

## Layout, header, footer

Root `app/layout.tsx` already renders `SiteHeader`, `SiteFooter`, `MobileOrderBar`, and the
site-wide Organization + WebSite JSON-LD. **Do NOT** add navbar/footer/order-bar to pages.
Your page returns only its `<section>`s (wrapped in a fragment).

Use `className="th-container"` for the centered max-width content wrapper (1200px, responsive
gutters). For vertical rhythm use inline `paddingTop/paddingBottom: 56` on desktop sections
(scale down on mobile if needed). Colored full-bleed bands: put the bg on the `<section>`,
the `th-container` inside.

## Components (import and reuse — do not re-create)

DS primitives: `@/components/ds` →
`Badge, DietTag, Button, TextLink, TrimBorder, Accordion, Input, Select, Textarea, Tabs,
CTABanner, Card, CardMedia`. (Navbar/Footer are used by the layout only.)

Blocks: `@/components/blocks` →
`Hero, OrderChannels, PromiseStrip, MenuItemCard, MenuRow, KitchenCard, BlogPostCard,
PhotoSlot, MapSlot, EnquiryForm`.

- `Hero` props: `{ eyebrow?, title, intro, photo?: {subject,alt,src?}, primaryCta?, secondaryCta?, showChannels?, background? }`. Renders the single page `<h1>`.
- `PhotoSlot` props: `{ subject, alt, src? }` — renders next/image when `src` given, else the
  labelled placeholder. Use for EVERY image slot, passing the design's subject + alt.
- `MapSlot` props: `{ label, query? }` — real Google Maps embed when `query` given, else placeholder.
- `CTABanner` props: `{ tone:'maroon'|'gold'|'green', align?:'center'|'split', eyebrow?, title?, body?, primaryLabel?, primaryHref?, secondaryLabel?, secondaryHref? }`.
- `Accordion` props: `{ items: {q,a}[], defaultOpen?: number[] }`.
- `EnquiryForm` props: `{ kind: string, fields: EnquiryField[], submitLabel? }` where
  `EnquiryField = { name, label, type?: 'text'|'email'|'tel'|'textarea'|'select', required?, options?: string[], placeholder?, helper?, full? }`.
  It validates accessibly and POSTs to `/api/enquiry`. Use it for any enquiry form.

## Data & contacts

`@/data/site` exports: `SITE, ORDER_PHONE, ORDER_PHONE_TEL, WHATSAPP_LINK, INSTAGRAM_HANDLE,
INSTAGRAM_LINK, FRANCHISE_CONTACT ({name,phone,phoneTel,email}), SWIGGY_LINK, ZOMATO_LINK,
NAV_LINKS, ORDER_CHANNELS`. Always use these constants for phone/email/links — never hardcode.

## SEO (every page)

```ts
import { pageMetadata, breadcrumbLd, faqPageLd, serviceLd, productLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({ title, description, path /* "/catering" */ });
```

Use the title/description/canonical from the design's SEO box. Render JSON-LD with
`<JsonLd data={[ ... ]} />` at the top of the returned fragment, using the builders in
`@/lib/seo` (`breadcrumbLd`, `faqPageLd`, `serviceLd`, `productLd`, etc.). Exactly ONE `<h1>`
per page (the hero). Use `<h2>/<h3>` below it.

## Style rules (the design-system contract)

- Colours/fonts/radii/shadows ONLY via tokens: `var(--color-...)`, `var(--font-display|body|script)`,
  `var(--radius-...)`, `var(--shadow-...)`. Never invent hex values.
- Display serif (Eczar) = `var(--font-display)` for headings; body (Mukta) = `var(--font-body)`;
  script (Caveat) = `var(--font-script)` for signatures/tagline ONLY.
- Eyebrows use `className="seglabel"`.
- Primary buttons/links = maroon (`--color-primary`); gold (`--color-secondary`) = accent CTA;
  green (`--color-headline`) = headings/trust bands.
- No prices anywhere. No emoji except 🌿 inside the vegan DietTag. Motto is only "Junk the Junk Food."
- Links: use `next/link`. External (Swiggy/Zomato/WhatsApp/maps) get `target="_blank" rel="noopener noreferrer"`.
- Responsive: build the deliberate desktop layout AND the mobile stack. Use Tailwind responsive
  utilities (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `hidden md:block`, etc.). Breakpoints:
  md=768 (tablet), lg=1024 (desktop).
- Inline `style={{}}` with token vars is the established pattern (see app/page.tsx); Tailwind for
  layout/grid/spacing utilities. Match app/page.tsx (Home) and app/menu/page.tsx for house style.

Crucial: study `app/page.tsx` and `app/menu/page.tsx` already in the repo — mirror their structure.
