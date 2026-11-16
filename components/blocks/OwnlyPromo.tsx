"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { ORDER_NOW_LINK, OWNLY_SAVING } from "@/data/site";

/** How long a visitor reads a page before the prompt appears. */
const DELAY_MS = 6000;
/** Close it, and it stays away this long; order through it, longer. */
const SNOOZE_DISMISSED_MS = 7 * 24 * 60 * 60 * 1000;
const SNOOZE_CLICKED_MS = 30 * 24 * 60 * 60 * 1000;
const SNOOZE_KEY = "ownly-promo-snooze-until";
const SESSION_KEY = "ownly-promo-shown";

// Pages where the prompt would get in the way or repeat itself.
const SKIP_PATHS = ["/order", "/privacy-policy", "/delete-account", "/franchise"];
const BOT_UA = /bot|crawl|spider|slurp|lighthouse|headless|preview/i;

// Storage can throw (private mode, blocked site data); the prompt then just
// behaves as if it had never been seen.
function read(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}
function write(storage: () => Storage, key: string, value: string) {
  try {
    storage().setItem(key, value);
  } catch {
    /* ignore */
  }
}

function track(event: string, path: string) {
  if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
    posthog.capture(event, { path });
  }
}

/**
 * OwnlyPromo — a small card that suggests ordering on Ownly once a visitor has
 * spent a few seconds on a page. It is a corner card, not a full-screen modal:
 * Google penalises interstitials that cover content on mobile, and it never
 * takes focus away from what the visitor is reading.
 */
export function OwnlyPromo() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (SKIP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return;
    if (BOT_UA.test(navigator.userAgent)) return;
    if (read(() => sessionStorage, SESSION_KEY)) return;
    if (Number(read(() => localStorage, SNOOZE_KEY)) > Date.now()) return;

    // Count only time the page is actually in front of the visitor.
    let remaining = DELAY_MS;
    let startedAt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      write(() => sessionStorage, SESSION_KEY, "1");
      setOpen(true);
      track("ownly_promo_shown", pathname);
    };
    const start = () => {
      if (timer) return;
      startedAt = Date.now();
      timer = setTimeout(show, remaining);
    };
    const pause = () => {
      if (!timer) return;
      clearTimeout(timer);
      timer = undefined;
      remaining -= Date.now() - startedAt;
    };
    const onVisibility = () => (document.hidden ? pause() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dismiss only reads pathname
  }, [open]);

  function dismiss() {
    write(() => localStorage, SNOOZE_KEY, String(Date.now() + SNOOZE_DISMISSED_MS));
    setOpen(false);
    track("ownly_promo_dismissed", pathname);
  }

  if (!open) return null;

  return (
    <div className="ownly-promo" role="dialog" aria-modal="false" aria-labelledby="ownly-promo-title">
      <button type="button" className="ownly-promo-close" onClick={dismiss} aria-label="Close">
        ×
      </button>
      <div style={{ display: "flex", gap: 12, alignItems: "center", paddingRight: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector brand mark */}
        <img src="/brands/ownly.svg" alt="" width={44} height={44} style={{ flexShrink: 0, background: "var(--white)", borderRadius: 12, border: "1px solid var(--color-outline-variant)" }} />
        <div>
          <p id="ownly-promo-title" style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.25, margin: 0 }}>
            Order on Ownly, pay {OWNLY_SAVING} less
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "0.875rem", lineHeight: 1.45, margin: "3px 0 0" }}>
            Same food, same kitchens — cheaper on the Ownly app.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <a
          href={ORDER_NOW_LINK}
          onClick={() => {
            write(() => localStorage, SNOOZE_KEY, String(Date.now() + SNOOZE_CLICKED_MS));
            track("ownly_promo_clicked", pathname);
          }}
          style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, padding: "10px 16px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-on-primary)", background: "var(--color-primary)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
        >
          Order on Ownly
        </a>
        <button
          type="button"
          onClick={dismiss}
          style={{ minHeight: 44, padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink-600)", background: "transparent", border: "1px solid var(--color-outline-variant)", borderRadius: "var(--radius-md)", cursor: "pointer" }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}

export default OwnlyPromo;
