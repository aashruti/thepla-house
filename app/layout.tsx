import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileOrderBar } from "@/components/blocks/MobileOrderBar";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Home-style Gujarati food & healthy veg tiffin, Mumbai`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  category: "Food & Beverage",
  authors: [{ name: SITE.founder }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "home-style food Mumbai",
    "home style food near me",
    "healthy food Mumbai",
    "healthy food near me",
    "tiffin service Mumbai",
    "tiffin services near me",
    "vegetarian tiffin Mumbai",
    "Gujarati tiffin",
    "home food delivery Mumbai",
    "ghar ka khana Mumbai",
    "Gujarati food Mumbai",
    "thepla delivery",
    "Jain food Mumbai",
    "vegan Gujarati thali",
  ],
  appleWebApp: { capable: true, title: SITE.shortName, statusBarStyle: "default" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#286850",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileOrderBar />
      </body>
    </html>
  );
}
