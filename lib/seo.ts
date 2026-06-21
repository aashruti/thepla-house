import type { Metadata } from "next";
import {
  SITE,
  ORDER_PHONE,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
  SWIGGY_LINK,
  ZOMATO_LINK,
} from "@/data/site";

const BASE = SITE.url;

export function absUrl(path = "/"): string {
  return new URL(path, BASE).toString();
}

/** Build per-page metadata with canonical + Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path = "/",
  ogType = "website",
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
}): Metadata {
  const canonical = absUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      type: ogType,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---- JSON-LD builders -----------------------------------------------------

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "FoodEstablishment"],
    name: SITE.name,
    alternateName: ["Thepla House", "Tejal's Kitchen", "Thepla House Mumbai"],
    url: BASE,
    logo: absUrl(SITE.logo),
    image: absUrl(SITE.logo),
    slogan: SITE.tagline,
    foundingDate: String(SITE.since),
    founder: { "@type": "Person", name: SITE.founder },
    description: SITE.description,
    servesCuisine: ["Gujarati", "Indian", "Vegetarian", "Jain"],
    priceRange: "₹₹",
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
    sameAs: [INSTAGRAM_LINK, SWIGGY_LINK, ZOMATO_LINK],
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
    name: SITE.name,
    url: BASE,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: SITE.name },
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
  opens?: string;
  closes?: string;
}

export function restaurantLd(geo: RestaurantGeo) {
  return {
    "@context": "https://schema.org",
    "@type": geo.dineIn ? ["Restaurant", "LocalBusiness"] : "Restaurant",
    "@id": `${absUrl(geo.url)}#restaurant`,
    name: geo.name || SITE.name,
    url: absUrl(geo.url),
    image: absUrl(SITE.logo),
    servesCuisine: ["Gujarati", "Indian", "Vegetarian", "Jain"],
    priceRange: "₹₹",
    telephone: ORDER_PHONE,
    description: SITE.description,
    hasMenu: absUrl("/menu"),
    acceptsReservations: Boolean(geo.dineIn),
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: geo.opens || "09:00",
        closes: geo.closes || "22:00",
      },
    ],
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
    potentialAction: {
      "@type": "OrderAction",
      target: WHATSAPP_LINK,
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"],
    },
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

export function menuLd(
  sections: { name: string; items: { name: string; description?: string }[] }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SITE.name} — Menu`,
    url: absUrl("/menu"),
    hasMenuSection: sections.map((s) => ({
      "@type": "MenuSection",
      name: s.name,
      hasMenuItem: s.items.map((it) => ({
        "@type": "MenuItem",
        name: it.name,
        ...(it.description ? { description: it.description } : {}),
      })),
    })),
  };
}

export function blogLd(posts: { title: string; slug: string; excerpt: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} — Blog`,
    url: absUrl("/blog"),
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absUrl(`/blog/${p.slug}`),
      description: p.excerpt,
      datePublished: p.date,
      author: { "@type": "Organization", name: SITE.name },
    })),
  };
}

export function blogPostingLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: absUrl(`/blog/${post.slug}`),
    description: post.excerpt,
    datePublished: post.date,
    image: absUrl(SITE.logo),
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absUrl(SITE.logo) },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(`/blog/${post.slug}`) },
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
      "@type": "Organization",
      name: SITE.name,
      url: BASE,
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
