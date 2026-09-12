import type { Metadata } from "next";
import {
  SITE,
  ORDER_PHONE,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
} from "@/data/site";

const BASE = SITE.url;
const ORGANIZATION_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

export function absUrl(path = "/"): string {
  return new URL(path, BASE).toString();
}

/** Build per-page metadata with canonical + Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path = "/",
  ogType = "website",
  image,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const canonical = absUrl(path);
  const imageUrl = image ? absUrl(image) : undefined;
  // The root layout appends "· Thepla House" to ordinary child titles. Pages
  // that already name the brand should stay absolute instead of repeating it.
  const metadataTitle = title.toLowerCase().includes(SITE.shortName.toLowerCase())
    ? { absolute: title }
    : title;
  return {
    title: metadataTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      type: ogType,
      locale: "en_IN",
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
      ...(ogType === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(ogType === "article" ? { authors: [SITE.founder] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

// ---- JSON-LD builders -----------------------------------------------------

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    alternateName: ["Thepla House by Tejal's Kitchen", "Tejal's Kitchen", "Thepla House by Tejal's Kitchen Mumbai"],
    url: BASE,
    logo: absUrl(SITE.logo),
    image: absUrl(SITE.logo),
    slogan: SITE.tagline,
    foundingDate: String(SITE.since),
    founder: { "@type": "Person", name: SITE.founder, url: absUrl("/about") },
    description: SITE.description,
    keywords:
      "home-style food, healthy food, vegetarian tiffin, tiffin service, home food delivery, ghar ka khana, Gujarati food, thepla, Jain food, vegan food, Mumbai",
    knowsAbout: [
      "Home-style Gujarati food",
      "Healthy vegetarian food",
      "Vegetarian tiffin and home meal delivery",
      "Whole-wheat theplas",
      "Jain food",
      "Vegan food",
    ],
    areaServed: [
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "City", name: "Thane" },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Home-style Gujarati meal delivery (tiffin-style)",
        serviceType: "Meal delivery",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    // Only link profiles that identify this business. Generic marketplace
    // homepages are not valid sameAs references and can confuse entity matching.
    sameAs: [INSTAGRAM_LINK],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORDER_PHONE,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: BASE,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface RestaurantGeo {
  name?: string;
  url: string;
  streetAddress?: string;
  locality: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  /** dine-in outlet → adds eat-in + reservation signals */
  dineIn?: boolean;
  /** localities served, for areaServed */
  areaServed?: string[];
  /**
   * One entry per distinct trading pattern — a weekday that closes early, or a
   * split shift, needs more than one. Omit to publish no hours at all.
   */
  openingHours?: { days: string[]; opens: string; closes: string }[];
  /**
   * Canonical Google Maps / Business Profile listing URL for THIS outlet.
   * Emitted as `hasMap` + added to `sameAs` so Google reconciles this page's
   * Restaurant entity with the exact verified GBP listing (not a competitor).
   */
  mapsUrl?: string;
  /** Outlet-specific phone; falls back to the central order line. Keep it identical to the GBP phone (NAP consistency). */
  telephone?: string;
  /** Extra profiles that prove this is the same real-world business (aggregators, socials). */
  sameAs?: string[];
  /**
   * Counter outlet that cannot deliver — e.g. the airside franchise inside the
   * airport departures terminal. Suppresses the delivery OrderAction so we never
   * advertise delivery Google would then surface for an outlet that has none.
   */
  noDelivery?: boolean;
}

export function restaurantLd(geo: RestaurantGeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absUrl(geo.url)}#restaurant`,
    name: geo.name || SITE.name,
    url: absUrl(geo.url),
    image: absUrl(SITE.logo),
    servesCuisine: ["Gujarati", "Indian", "Vegetarian", "Jain"],
    priceRange: "₹₹",
    telephone: geo.telephone || ORDER_PHONE,
    description: SITE.description,
    hasMenu: absUrl("/menu"),
    acceptsReservations: Boolean(geo.dineIn),
    parentOrganization: { "@id": ORGANIZATION_ID },
    // Tie this outlet's entity to its verified Google Business Profile listing.
    ...(geo.mapsUrl ? { hasMap: geo.mapsUrl } : {}),
    ...((geo.sameAs && geo.sameAs.length) || geo.mapsUrl
      ? { sameAs: [...(geo.mapsUrl ? [geo.mapsUrl] : []), ...(geo.sameAs || [])] }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: geo.streetAddress,
      addressLocality: geo.locality,
      addressRegion: "Maharashtra",
      postalCode: geo.postalCode,
      addressCountry: "IN",
    },
    ...(geo.latitude && geo.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
      : {}),
    ...(geo.areaServed && geo.areaServed.length
      ? { areaServed: geo.areaServed.map((a) => ({ "@type": "Place", name: a })) }
      : {}),
    ...(geo.openingHours && geo.openingHours.length
      ? {
          openingHoursSpecification: geo.openingHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(geo.dineIn
      ? {
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Dine-in", value: true },
            { "@type": "LocationFeatureSpecification", name: "Takeaway", value: true },
            { "@type": "LocationFeatureSpecification", name: "Delivery", value: true },
            { "@type": "LocationFeatureSpecification", name: "Pure vegetarian", value: true },
          ],
        }
      : {}),
    ...(geo.noDelivery
      ? {}
      : {
          potentialAction: {
            "@type": "OrderAction",
            target: WHATSAPP_LINK,
            deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"],
          },
        }),
  };
}

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

/** Pulls the digits out of a price string like "₹ 235" or "₹1,234" → "235". */
function parsePriceValue(price: string): string | undefined {
  const digits = price.replace(/[^\d]/g, "");
  return digits || undefined;
}

export function menuLd(
  sections: { name: string; items: { name: string; description?: string; price?: string }[] }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SITE.name} — Menu`,
    url: absUrl("/menu"),
    hasMenuSection: sections.map((s) => ({
      "@type": "MenuSection",
      name: s.name,
      hasMenuItem: s.items.map((it) => {
        const priceValue = it.price ? parsePriceValue(it.price) : undefined;
        return {
          "@type": "MenuItem",
          name: it.name,
          ...(it.description ? { description: it.description } : {}),
          ...(priceValue
            ? { offers: { "@type": "Offer", price: priceValue, priceCurrency: "INR" } }
            : {}),
        };
      }),
    })),
  };
}

export function blogLd(
  posts: { title: string; slug: string; excerpt: string; datePublished: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absUrl("/blog")}#blog`,
    name: `${SITE.name} — Blog`,
    url: absUrl("/blog"),
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${absUrl(`/blog/${p.slug}`)}#article`,
      headline: p.title,
      url: absUrl(`/blog/${p.slug}`),
      description: p.excerpt,
      datePublished: p.datePublished,
      author: { "@type": "Person", name: SITE.founder, url: absUrl("/about") },
    })),
  };
}

export function blogPostingLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  datePublished: string;
  image?: string;
}) {
  const articleUrl = absUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    url: articleUrl,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    image: absUrl(post.image || SITE.logo),
    inLanguage: "en-IN",
    author: { "@type": "Person", name: SITE.founder, url: absUrl("/about") },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": `${absUrl("/blog")}#blog` },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  const areas = opts.areaServed && opts.areaServed.length ? opts.areaServed : ["Mumbai"];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    description: opts.description,
    url: absUrl(opts.path),
    provider: {
      "@id": ORGANIZATION_ID,
      telephone: ORDER_PHONE,
    },
    areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
  };
}

export function productLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    brand: { "@type": "Brand", name: SITE.name },
  };
}
