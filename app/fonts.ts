import { Eczar, Mukta, Mukta_Vaani, Caveat } from "next/font/google";

/**
 * Brand webfonts, self-hosted by next/font (replaces the design system's
 * Google-Fonts @import in tokens/fonts.css). Each exposes a CSS variable that
 * globals.css feeds into the --font-display / --font-body / --font-script tokens.
 */
export const eczar = Eczar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
  display: "swap",
});

export const mukta = Mukta({
  // Devanagari too: the brand's Hindi and Marathi lines would otherwise fall back
  // to a system font and sit visibly apart from the English beside them.
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

/**
 * Gujarati companion to Mukta — same Ek Type family, drawn to sit alongside it.
 * Mukta itself has no Gujarati glyphs, so the Gujarati line needs its own face.
 */
export const muktaVaani = Mukta_Vaani({
  subsets: ["latin", "gujarati"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta-vaani",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${eczar.variable} ${mukta.variable} ${muktaVaani.variable} ${caveat.variable}`;
