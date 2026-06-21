import type { Config } from "tailwindcss";

/**
 * Thepla House — Tailwind config
 * Every value points back at a design-system CSS variable (defined in
 * `app/tokens/*.css`, imported by globals.css). The design system stays the
 * single source of truth — do not hard-code colours/radii/shadows here.
 */
const ramp = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => [
      s,
      `var(--${name}-${s})`,
    ]),
  );

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: ramp("gold"),
        green: ramp("green"),
        maroon: ramp("maroon"),
        leaf: ramp("leaf"),
        cream: ramp("cream"),
        ink: ramp("ink"),
        white: "var(--white)",
        // Semantic aliases
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",
        "on-primary": "var(--color-on-primary)",
        secondary: "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",
        headline: "var(--color-headline)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-inverse": "var(--color-surface-inverse)",
        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "on-surface-inverse": "var(--color-on-surface-inverse)",
        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        "outline-strong": "var(--color-outline-strong)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        script: "var(--font-script)",
      },
      fontSize: {
        "display-2xl": "var(--fs-display-2xl)",
        "display-xl": "var(--fs-display-xl)",
        "display-lg": "var(--fs-display-lg)",
        h1: "var(--fs-h1)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",
        h4: "var(--fs-h4)",
        title: "var(--fs-title)",
        "body-lg": "var(--fs-body-lg)",
        body: "var(--fs-body)",
        "body-sm": "var(--fs-body-sm)",
        caption: "var(--fs-caption)",
        overline: "var(--fs-overline)",
        script: "var(--fs-script)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        pill: "var(--radius-pill)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        focus: "var(--shadow-focus)",
      },
      maxWidth: {
        container: "var(--container-xl)",
        "container-2xl": "var(--container-2xl)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.34, 1.2, 0.64, 1)",
      },
      transitionDuration: {
        fast: "140ms",
        base: "220ms",
        slow: "360ms",
      },
    },
  },
  plugins: [],
};

export default config;
