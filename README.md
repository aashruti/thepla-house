# Thepla House by Tejal's Kitchen — website

Production **Next.js 15 (App Router) + TypeScript + Tailwind CSS** site for Thepla House, a
100% vegetarian home-style Gujarati cloud kitchen in Mumbai. Motto: **"Junk the Junk Food."**

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Requires Node 18.18+ (developed on Node 22).

## Architecture

- **Design system tokens** are the source of truth. The CSS variables live in `app/tokens/*.css`
  (copied from the supplied design system) and are imported by `app/globals.css`. `tailwind.config.ts`
  maps Tailwind utilities onto those variables — do not hard-code colours/radii/shadows.
- **Fonts** (Eczar / Mukta / Caveat) are self-hosted via `next/font` (`app/fonts.ts`) and wired into
  the `--font-display / --font-body / --font-script` tokens in `globals.css`.
- **Components**
  - `components/ds/*` — design-system primitives ported to TS (Button, Badge, DietTag, Accordion,
    Input/Select/Textarea, Tabs, CTABanner, Navbar, Footer, Card, TrimBorder).
  - `components/blocks/*` — page blocks (Hero, OrderChannels, PromiseStrip, MobileOrderBar,
    MenuItemCard, MenuRow, KitchenCard, BlogPostCard, PhotoSlot, MapSlot, MenuExplorer, BlogList,
    GalleryMasonry, EnquiryForm).
  - `components/SiteHeader.tsx`, `SiteFooter.tsx`, `JsonLd.tsx` — shared shell.
- **Data** is typed in `data/*` (`site`, `menu`, `kitchens`, `posts`, `areas`, `gallery`, `faqs`).
  Kitchen, blog and GEO pages are data-driven with `generateStaticParams`.
- **SEO** — per-page metadata + JSON-LD via the Metadata API and `lib/seo.ts` helpers. `app/sitemap.ts`,
  `app/robots.ts` and `public/llms.txt` are generated/static.

## Routes

`/` · `/menu` · `/locations` · `/locations/[area]` (7 kitchens) · `/about` · `/catering` ·
`/travel-packs` · `/franchise` · `/blog` · `/blog/[slug]` · `/gallery` · `/contact` ·
`/gujarati-food-delivery-[area]` (programmatic GEO landing) · `/api/enquiry` (form handler).

## Things to wire up before launch

- **Photography** — `PhotoSlot` renders a labelled placeholder until a real `src` is supplied; each
  carries the intended subject + alt. Pass `src` (and add the host to `next.config.ts > images` if remote).
- **Maps** — `MapSlot` embeds a keyless Google Maps view from a `query`; confirm exact addresses/geo
  per kitchen (addresses in `data/kitchens.ts` are placeholders).
- **Ordering links** — `SWIGGY_LINK` / `ZOMATO_LINK` in `data/site.ts` are placeholders; replace with the
  brand's real listings.
- **Enquiry handler** — `app/api/enquiry/route.ts` currently logs submissions; wire it to email/CRM.

The original high-fidelity designs and design-system source live in `extracted/` for reference;
`CONVENTIONS.md` documents the build conventions.
