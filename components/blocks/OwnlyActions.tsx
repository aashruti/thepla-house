"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { OWNLY_LINK, OWNLY_IOS_LINK, OWNLY_ANDROID_LINK } from "@/data/site";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(ua: string): Platform {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS reports itself as a Mac; a touch screen gives it away.
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

// Crawlers render JavaScript too; they must see this page, not be sent to Ownly.
const BOT_UA = /bot|crawl|spider|slurp|lighthouse|headless|preview/i;

function track(action: string, platform: Platform) {
  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture("ownly_order_action", { action, platform });
  }
}

const button = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 52,
  padding: "14px 24px",
  fontFamily: "var(--font-body)",
  fontSize: "1.0625rem",
  fontWeight: 600,
  borderRadius: "var(--radius-md)",
  textDecoration: "none",
} as const;

/**
 * OwnlyActions — Ownly works only in its iOS and Android apps. On a phone this
 * hands straight over to the brand link, which opens Thepla House in the app
 * (or the store); everywhere else it shows the store links beside the QR code.
 */
export function OwnlyActions() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const p = detectPlatform(ua);
    setPlatform(p);
    if (p !== "desktop" && !BOT_UA.test(ua)) {
      track("auto_open", p);
      // replace(), so Back returns to the page the visitor tapped "Order" on.
      window.location.replace(OWNLY_LINK);
    }
  }, []);

  const onPhone = platform === "ios" || platform === "android";
  const stores = [
    { id: "ios", label: "Download on the App Store", href: OWNLY_IOS_LINK },
    { id: "android", label: "Get it on Google Play", href: OWNLY_ANDROID_LINK },
  ].filter((s) => !onPhone || s.id === platform);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      {onPhone && (
        <p role="status" style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", margin: 0 }}>
          Opening Thepla House in the Ownly app…
        </p>
      )}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href={OWNLY_LINK}
          onClick={() => track("open_app", platform ?? "desktop")}
          style={{ ...button, color: "var(--color-on-primary)", background: "var(--color-primary)", boxShadow: "var(--shadow-sm)" }}
        >
          {onPhone ? "Open in Ownly" : "Already on your phone? Open in Ownly"}
        </a>
        {stores.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(`store_${s.id}`, platform ?? "desktop")}
            style={{ ...button, color: "var(--color-primary)", border: "1.5px solid var(--color-primary)" }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default OwnlyActions;
