# Thepla House by Tejal's Kitchen — Design System

> **"Junk the Junk Food."**
> Warm, homely, proudly-Indian, health-first. Homemade-style food that proves eating out doesn't mean eating junk.

This project is the **design system** (foundations + components), not the marketing pages — those come in a later step. Everything here is built to be reusable, documented, and to map cleanly onto Tailwind tokens + React components.

The single human-reviewable deliverable is **`style-guide.html`** at the project root. The **Design System tab** renders every foundation and component card.

---

## 1. Brand context

| | |
|---|---|
| **Brand** | Thepla House by Tejal's Kitchen |
| **Founder** | Tejal — founder-led since **2018**, **Mumbai** |
| **Motto / tagline** | **"Junk the Junk Food."** (the *only* motto) |
| **Promise** | 100% whole wheat (no maida) · no palm oil · no preservatives · Jain & vegan options |
| **Category** | Home-style Gujarati/Indian food — theplas, thalis, snacks; dine-out & delivery |
| **Personality** | Warm, homely, honest, proudly Indian, health-first |

**Source of truth:** the **logo** (`assets/logo/theplahouse-logo.png`) — a circular golden *thepla* with deep-green lettering, a brick-maroon rolling-pin ribbon reading "by Tejal's Kitchen" in a script face, and fresh green leaf accents. The entire palette is derived from it.

> Note on copy: **"ghar ka khana" / "home-style"** is a *descriptive flavour* for body copy only. It is **not** a tagline or motto. The only motto is **"Junk the Junk Food."**

### Sources provided
- `uploads/theplahouse.png` — the brand logo (copied to `assets/logo/theplahouse-logo.png`). This was the sole source asset. No codebase, Figma, or existing site was provided — the system is an **original direction** derived from the logo and brief.

---

## 2. Content fundamentals (how we write)

- **Tone:** warm, homely, confident, never preachy. Talk like Tejal welcoming you into her kitchen.
- **Person:** address the customer as **you**; the brand is **we**. First-person founder voice ("made by Tejal") appears in signature moments only.
- **Casing:** sentence case for almost everything (headings, buttons, labels). The motto **"Junk the Junk Food."** is the one Title-Case lockup.
- **Health claims** are stated plainly and proudly: *"100% whole wheat. No maida, no palm oil, no preservatives."* Short, declarative, comma-spliced lists are on-brand.
- **Indian-English & Hindi/Gujarati flavour** is welcome in body copy: *ghar ka khana, atta, thepla, thali, puja*. Use it as seasoning, not every sentence.
- **Emoji:** avoid in product UI and headlines. A single 🌿 may appear *inside* a vegan diet tag as a glyph, never as decoration in running text.
- **Numbers:** prices as **₹180**; quantities as **6 pcs**. Times plainly: *"Order before 11am for same-day lunch."*
- **Examples**
  - Hero: *"Real ghar ka khana, now eating out."*
  - Sub: *"Whole-wheat, fenugreek-spiced, rolled fresh this morning."*
  - CTA: *"Order now"*, *"See the menu"*, *"Plan a catering order"*
  - Reassurance: *"No maida, ever."*

---

## 3. Visual foundations

**Palette** — derived from the logo. Four brand ramps + two neutrals, each 50→900 (`tokens/colors.css`).
- **Gold `#F8B040`** (thepla) → primary accent, highlights, secondary/gold CTAs. Always pair with dark ink text.
- **Green `#286850`** (lettering) → headlines, trust/health cues, the footer field, dark bands.
- **Maroon `#983830`** (rolling pin) → **primary buttons, links, footer baseline**. White text on top.
- **Leaf `#00A858`** → small organic/vegan accents **only** — never body text on white (fails AA; use Green 700+ for green text).
- **Cream** (warm neutral) → page + container backgrounds. **Ink** (warm-tinted neutral) → text.

**Type** — `tokens/typography.css`
- **Display: Eczar** — warm, high-contrast serif with Indian heritage. Headlines, big numerals, prices.
- **Body: Mukta** — humanist sans (ITF), excellent for Indian brands. UI, paragraphs, labels.
- **Accent: Caveat** — handwritten script echoing the logo's "by Tejal's Kitchen". **Sparingly** — signatures, the tagline lockup. Never headlines or body.
- Fluid scale via `clamp()` (display→caption); responsive table in the style guide. Body never below 14px; touch targets ≥44px.

**Backgrounds** — warm cream fields, occasional deep-green or gold full-bleed bands for CTAs/section breaks. No cold grays, no bluish gradients. Subtle warm gradients within a single brand hue are OK (e.g. gold→deeper-gold on a banner). The golden-thepla speckle texture and leaf motifs may decorate corners.

**Shape & depth**
- **Corner radius:** generous and soft — cards `xl` (22px), buttons/inputs `md` (12px), pills/tags `999px`. Nothing sharp.
- **Borders:** 1–1.5px warm hairlines (`--color-outline`, cream-toned), not gray.
- **Shadows:** **warm-tinted** (maroon/brown alpha), never neutral gray — they read like soft kitchen light. Five-step scale `xs→xl`.
- **Cards:** cream-container fill, soft warm shadow, 1px warm border, `xl` radius; interactive cards lift 4px on hover with a deeper shadow.

**Motion** — `tokens/motion.css`
- Warm and unhurried. Entrances **ease-out** (`--ease-entrance`); playful overshoot (`--ease-soft`) for hovers and toggles.
- Durations: fast 140ms (hover/tap), base 220ms (most), slow 360ms (accordions/sheets).
- **Hover** = 1–4px lift + warm shadow + slightly deeper colour. **Press** = settle down 1px. Links deepen maroon + solid underline.
- Everything is disabled under `prefers-reduced-motion: reduce` (global rule in `tokens/motion.css`).

**Transparency & blur** — used lightly: the navbar uses an 88%-opacity cream surface with a small backdrop blur. Avoid glassmorphism elsewhere.

**Cultural trims** — `tokens/decoration.css` + the `TrimBorder` component / `.th-trim` utility provide Indian-inspired decorative borders (toran temple-zigzag, bandhani dots, block-print diamonds, scallop arches, kantha stitch), drawn in pure CSS so they stay crisp and recolour via `--trim-color`. **Use them at seams** — section dividers, the top/bottom edge of CTA bands and the footer, occasional card tops — never framing every element, or they fight the food photography and copy.

**Imagery art-direction** — real food, shot warm. Brass/copper thali, cream linen, wooden boards, natural side light, gentle steam. Top-down or 3/4 hero plates. Warm white balance, never cold or desaturated. Hand-in-frame (rolling, serving) reinforces "homemade". Leaf/thepla motifs anchor a corner — organic, never centred, one or two max.

---

## 4. Iconography

- **System set: [Lucide](https://lucide.dev)** — 2px stroke, rounded caps/joins. Warm and friendly, pairs with Mukta. Loaded from CDN (`unpkg.com/lucide`). **This is a substitution** — no brand icon set existed; Lucide was chosen for stroke/feel. *If you have a preferred icon set, send it and I'll swap it in.*
- **Tinting:** maroon for actions, green for trust/info. Single-tone only — never multicolour, never mix icon families.
- **Brand motifs** (`assets/motifs/`): `leaves-right.png`, `leaf-left.png` cropped from the logo — use as small organic corner accents. The golden thepla circle works as a texture/speckle.
- **Emoji:** not used as icons, except the 🌿 glyph inside the Vegan diet tag.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (list of `@import`s only). **Consumers link this.**
- `style-guide.html` — the single reviewable style-guide page.
- `readme.md` — this file. · `SKILL.md` — Agent-Skills wrapper.

**`tokens/`** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `elevation.css` · `motion.css` · `base.css` (element defaults + utility classes).

**`components/`** (React primitives — namespace `window.TheplaHouseDesignSystem_2c40d5`)
- `buttons/` — **Button** (primary/secondary/ghost), **TextLink**
- `forms/` — **Input**, **Select**, **Textarea**
- `badges/` — **Badge**, **DietTag** (Jain/Vegan/Best-seller/claims)
- `surfaces/` — **Card**, **CardMedia**
- `disclosure/` — **Accordion** (FAQ)
- `navigation/` — **Navbar** (responsive + hamburger), **Tabs**, **Footer**
- `marketing/** — **CTABanner**
- `decoration/` — **TrimBorder** (cultural border trims)

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`assets/`** — `logo/theplahouse-logo.png` · `motifs/leaves-right.png` · `motifs/leaf-left.png`.

---

## Caveats / substitutions
- **Fonts** are served from **Google Fonts** (Eczar, Mukta, Caveat) via `@import`, not bundled `.ttf` binaries — so the compiler lists 0 packaged fonts. Functionally identical online; for fully-offline use, download the TTFs and swap the `@import` for `@font-face`.
- **Icons:** Lucide is a substitution (see §4).
- **Dark mode** tokens are defined (`[data-theme="dark"]`) but the components are tuned and reviewed for light first.
