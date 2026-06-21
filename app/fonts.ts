import { Eczar, Mukta, Caveat } from "next/font/google";

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
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${eczar.variable} ${mukta.variable} ${caveat.variable}`;
