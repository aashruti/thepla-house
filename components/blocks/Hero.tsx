import Link from "next/link";
import type { CSSProperties } from "react";
import { PhotoSlot } from "./PhotoSlot";
import { OrderChannels } from "./OrderChannels";

/**
 * Hero — full-bleed page hero: eyebrow, single H1, answer-intro, image and
 * order channels. Text left / photo right on desktop; stacked on mobile.
 */
export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  intro: string;
  photo?: { subject: string; alt: string; src?: string };
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  showChannels?: boolean;
  /** background gradient override */
  background?: string;
  style?: CSSProperties;
}

export function Hero({
  eyebrow,
  title,
  intro,
  photo,
  primaryCta,
  secondaryCta,
  showChannels = false,
  background = "linear-gradient(160deg, var(--cream-50), var(--gold-50) 72%)",
}: HeroProps) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/motifs/leaves-right.png"
        alt=""
        aria-hidden="true"
        className="hero-motif"
      />
      <div className="th-container hero-grid">
        <div>
          {eyebrow && <div className="seglabel">{eyebrow}</div>}
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-headline)", fontSize: "var(--fs-h1)", lineHeight: 1.1, margin: "12px 0 18px", letterSpacing: "-0.01em" }}>
            {title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-600)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, margin: "0 0 26px", maxWidth: 520 }}>
            {intro}
          </p>
          {(primaryCta || secondaryCta) && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 30px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-on-primary)", background: "var(--color-primary)", border: "none", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", textDecoration: "none" }}
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 52, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-primary)", background: "transparent", border: "1.5px solid var(--color-outline)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
          {showChannels && <OrderChannels showCall style={{ marginTop: 22 }} />}
        </div>
        {photo && (
          <div className="hero-photo">
            <PhotoSlot subject={photo.subject} alt={photo.alt} src={photo.src} priority sizes="(max-width: 768px) 100vw, 50vw" style={{ height: "100%", width: "100%" }} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
