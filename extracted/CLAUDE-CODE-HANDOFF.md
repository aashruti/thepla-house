# Claude Code build prompt — Thepla House website

> Paste everything below the line into Claude Code, with this project's files available in the repo
> (the `Thepla House — *.dc.html` screens, the `_ds/` design-system folder, and `assets/`).

---

## Project

Build the production **Next.js (App Router) + TypeScript + Tailwind CSS** website for **Thepla House
by Tejal's Kitchen**, a 100% vegetarian home-style Gujarati cloud-kitchen brand in Mumbai
(founder Tejal, since 2018). Motto: **"Junk the Junk Food."**

The high-fidelity design is already done. The `Thepla House — *.dc.html` files in this repo are the
**single source of truth** for layout, copy, spacing, and component composition. Each file contains a
**mobile (390px)** and a **desktop (1280px)** artboard for one page, plus inline **SEO/JSON-LD notes**
and a **tablet-reflow note**. Reproduce them faithfully — do not redesign.

## Design system = the contract

All visual tokens live in `_ds/thepla-house-design-system-website-.../tokens/*.css`
(colors, typography, spacing, elevation, motion, decoration). **Do not invent colors, fonts, radii,
or shadows** — map these CSS variables into `tailwind.config.ts` and global CSS:

- **Colors**: gold `#F8B040` (accent/secondary CTA), green `#286850` (headlines/trust/dark bands),
  maroon `#983830` (primary buttons/links/footer), leaf `#00A858` (vegan/organic accents only),
  cream (backgrounds), ink (text). Each has a 50–900 ramp in `tokens/colors.css`. Also semantic
  aliases (`--color-primary`, `--color-headline`, `--color-surface`, diet-tag tokens, etc).
- **Type**: Display **Eczar**, Body **Mukta**, Accent **Caveat** (sparingly — tagline/signatures only).
  Load via `next/font/google`. Fluid sizes via the `clamp()` scale in `tokens/typography.css`.
- **Shape/depth**: card radius `xl` (22px), buttons `md` (12px), pills `999px`; **warm-tinted**
  shadows (never gray); 1–1.5px cream hairline borders.
- **Motion**: durations 140/220/360ms, ease tokens in `tokens/motion.css`; honor
  `prefers-reduced-motion`. Hover = 1–4px lift + warm shadow.
- **Cultural trims** (toran/bandhani/blockprint/scallop/kantha) from `tokens/decoration.css` — use at
  section seams only.

Recommended approach: import the token CSS files into `app/globals.css` and reference the variables
from Tailwind via `theme.extend` (e.g. `colors: { primary: 'var(--color-primary)' }`), so the design
system stays the source of truth.

## Component architecture

Build these as React components (props inferred from the design system's `.d.ts` and how the screens
use them). Reuse the existing DS primitives and add the new blocks:

**Existing DS primitives** (in `_ds/.../components/*` as `.jsx` + `.d.ts`): `Navbar`, `Footer`,
`CTABanner`, `Accordion`, `Tabs`, `Button`, `TextLink`, `Badge`, `DietTag`, `Card`/`CardMedia`,
`Input`, `Select`, `Textarea`, `TrimBorder`. Port them to TS components keeping the same prop APIs.

**New blocks authored in the designs** (each maps 1:1 — see the matching `*.dc.html` of the same name):
- `Hero` — full-bleed hero with H1 + answer-intro + order channels
- `OrderChannels` — Swiggy / Zomato / WhatsApp / call chips (neutral palette, brand-colored dots)
- `MobileOrderBar` — persistent bottom order bar on mobile (sticky)
- `PromiseStrip` — health-claims row (whole wheat / no palm oil / no preservatives / Jain & vegan)
- `MenuItemCard` and `MenuRow` — product card + compact list row (photo, name, diet tags)
- `KitchenCard` — location card (area, hours, directions/order)
- `BlogPostCard` — article card
- `PhotoSlot` / `MapSlot` — labelled image/map placeholders → replace with `next/image` + a real map embed

Keep a shared `SiteHeader` (Navbar) and `Footer` in the root layout. Image slots in the designs carry
their intended **subject + alt** text — use that as the `alt` and as a content note for whoever supplies
photography.

## Pages & routes (App Router)

| Route | From design file |
|---|---|
| `/` | Thepla House — Home |
| `/menu` | Thepla House — Menu (category tabs + diet filters; client component) |
| `/locations` | Thepla House — Locations |
| `/locations/[area]` | Thepla House — Kitchen Area (rendered for Chandivali; data-drive all 7) |
| `/about` | Thepla House — About |
| `/catering` | Thepla House — Catering (enquiry form) |
| `/travel-packs` | Thepla House — Travel Packs |
| `/franchise` | Thepla House — Franchise (enquiry form; Mr. Dhaval Shah +91 98 33 44 3014) |
| `/blog` | Thepla House — Blog Index (category filter; client component) |
| `/blog/[slug]` | Thepla House — Blog Post |
| `/gallery` | Thepla House — Gallery (filterable masonry) |
| `/contact` | Thepla House — Contact |
| `/gujarati-food-delivery-[area]` | Thepla House — GEO Landing (programmatic; unique local copy per area) |

Drive the kitchen-area, blog, and GEO pages from typed data files (`data/kitchens.ts`,
`data/posts.ts`, `data/areas.ts`) and `generateStaticParams`. The 7 kitchens: Chandivali (Andheri East),
Kalina (Santacruz East), Lower Parel, Mulund, Thane, Navi Mumbai (Airport), Kandivali (dine-in).

## Responsive

Mobile-first, but build the **deliberate desktop layouts** shown in the desktop artboards — not stretched
mobile. Follow each file's tablet-reflow note for the 768–1023px breakpoint. Mobile keeps the persistent
**Order Now** bar.

## SEO / GEO (per page)

Each design file lists the intended `<title>`, meta description, canonical, the single H1, and which
JSON-LD applies. Implement with the Next.js Metadata API + JSON-LD `<script type="application/ld+json">`:
- Site-wide: `Organization`, `WebSite`
- Home: + `Restaurant` (geo + openingHours), `FAQPage`
- Menu: `Menu` / `MenuItem`, `BreadcrumbList`
- `/locations/[area]` and GEO pages: `Restaurant` (geo + hours + servesCuisine), `FAQPage`, `BreadcrumbList`
- Blog: `Blog` / `BlogPosting`, `BreadcrumbList`
- Catering/Travel/Franchise: `Service` / `Product` / `FAQPage` as noted
Exactly one H1 per page; clean heading hierarchy. Add a static **`/public/llms.txt`** summarizing the brand
(100% vegetarian Mumbai cloud kitchen, founder Tejal since 2018, the health promise, the 7 kitchens, how
to order). Real brand facts only — no prices, no invented reviews/awards.

## Content rules

Use the **exact copy** from the design files. Order line **+91 98195 55065**; franchise **Mr. Dhaval Shah
+91 98 33 44 3014, Dhaval@theplahouse.com**; Instagram **@tejals_kitchen**. No prices anywhere. "ghar ka
khana / home-style" is body-copy flavour only; the sole motto is "Junk the Junk Food." Emoji only inside
the vegan diet tag (🌿).

## Deliverables

1. `tailwind.config.ts` + `app/globals.css` wired to the design-system tokens.
2. Fonts via `next/font` (Eczar, Mukta, Caveat).
3. Typed components (above) with the DS prop APIs preserved.
4. All routes with faithful mobile→tablet→desktop layouts.
5. Metadata + JSON-LD per page; `llms.txt`; sitemap + robots.
6. Forms (catering, franchise, contact) with accessible validation; wire submit to a TODO handler/API route.
7. `next/image` everywhere a PhotoSlot/MapSlot appears, using the slot's alt text.

Start by reading the `_ds/` tokens and one design file end-to-end (e.g. `Thepla House — Home.dc.html`),
propose the `tailwind.config.ts` + folder structure, then build page by page. Match the designs closely.
