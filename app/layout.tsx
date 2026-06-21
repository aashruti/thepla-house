import type { Metadata } from "next";
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
    default: `${SITE.name} — Home-style Gujarati food, Mumbai`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder }],
  keywords: [
    "Gujarati food Mumbai",
    "thepla delivery",
    "vegetarian cloud kitchen",
    "Jain food Mumbai",
    "vegan Gujarati thali",
    "home-style Indian food",
  ],
  icons: { icon: "/logo/theplahouse-logo.png" },
  robots: { index: true, follow: true },
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
