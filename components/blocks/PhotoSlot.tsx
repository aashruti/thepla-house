import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * PhotoSlot — image area.
 * When a real `src` is supplied it renders next/image (cover) with the slot's
 * alt text. Until photography is provided it renders the labelled placeholder
 * from the design, surfacing the intended subject + alt as a content note.
 */
export interface PhotoSlotProps {
  subject: string;
  alt: string;
  src?: string;
  /** rounding for the media; defaults to inheriting parent overflow */
  radius?: string;
  priority?: boolean;
  sizes?: string;
  /** object-position for the cover image (e.g. "top" to keep faces in frame) */
  position?: string;
  style?: CSSProperties;
  className?: string;
}

export function PhotoSlot({
  subject,
  alt,
  src,
  radius,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  position = "center",
  style,
  className,
}: PhotoSlotProps) {
  if (src) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: 120,
          overflow: "hidden",
          borderRadius: radius,
          ...style,
        }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} style={{ objectFit: "cover", objectPosition: position }} />
      </div>
    );
  }
  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 120,
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--gold-100), var(--cream-200))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 18,
        gap: 10,
        borderRadius: radius,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,253,249,0.82)",
          color: "var(--green-700)",
          fontFamily: "var(--font-body)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 9px",
          borderRadius: "999px",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", border: "2px solid var(--green-600)", display: "inline-block" }} />
        Photo
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/motifs/leaf-left.png"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", bottom: -6, right: -6, width: 74, height: "auto", opacity: 0.28, transform: "rotate(-12deg)" }}
      />
      <span
        aria-hidden="true"
        style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid var(--green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid var(--gold-500)", display: "block" }} />
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--green-700)", fontSize: "0.95rem", lineHeight: 1.25, maxWidth: 240 }}>
        {subject}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-500)", fontSize: "0.75rem", lineHeight: 1.35, maxWidth: 240 }}>
        alt: {alt}
      </span>
    </div>
  );
}

export default PhotoSlot;
