import type { CSSProperties } from "react";

/**
 * MapSlot — map area.
 * When a `query` is supplied it embeds a real Google Maps view (keyless
 * `output=embed`). Otherwise it renders the design's stylised placeholder,
 * carrying the intended label.
 */
export interface MapSlotProps {
  label: string;
  /** A place / address query to embed a real map, e.g. "Thepla House Chandivali Mumbai" */
  query?: string;
  /** A full embed URL (e.g. a Google My Maps "embed" iframe src) — takes precedence over query */
  embedSrc?: string;
  style?: CSSProperties;
  className?: string;
}

export function MapSlot({ label, query, embedSrc, style, className }: MapSlotProps) {
  if (embedSrc) {
    return (
      <iframe
        title={label}
        className={className}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, width: "100%", height: "100%", minHeight: 120, display: "block", ...style }}
      />
    );
  }
  if (query) {
    return (
      <iframe
        title={label}
        className={className}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, width: "100%", height: "100%", minHeight: 120, display: "block", ...style }}
      />
    );
  }
  return (
    <div
      className={className}
      role="img"
      aria-label={label}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 120, overflow: "hidden", background: "linear-gradient(135deg, var(--green-50), var(--cream-200))", ...style }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(40,104,80,0.08) 0 1px, transparent 1px 46px), repeating-linear-gradient(90deg, rgba(40,104,80,0.08) 0 1px, transparent 1px 46px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(118deg, transparent 38%, rgba(248,176,64,0.18) 39% 41%, transparent 42%), linear-gradient(60deg, transparent 60%, rgba(152,56,48,0.12) 61% 62.5%, transparent 63%)",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,253,249,0.85)",
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
        <span style={{ width: 9, height: 9, borderRadius: "50% 50% 50% 0", background: "var(--green-600)", transform: "rotate(45deg)", display: "inline-block" }} />
        Map
      </span>
      {[
        { top: "32%", left: "24%" },
        { top: "54%", left: "40%" },
        { top: "24%", left: "62%" },
        { top: "66%", left: "70%" },
        { top: "44%", left: "80%" },
        { top: "74%", left: "30%" },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ position: "absolute", top: pos.top, left: pos.left, width: 13, height: 13, borderRadius: "50% 50% 50% 0", background: "var(--green-600)", transform: "rotate(45deg)", boxShadow: "var(--shadow-sm)" }}
        />
      ))}
      <span
        aria-hidden="true"
        style={{ position: "absolute", top: "42%", left: "50%", width: 20, height: 20, borderRadius: "50% 50% 50% 0", background: "var(--gold-400)", border: "2px solid var(--white)", transform: "rotate(45deg)", boxShadow: "var(--shadow-md)" }}
      />
      <span
        style={{ position: "absolute", bottom: 10, left: 10, right: 10, fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-600)", fontSize: "0.75rem", background: "rgba(255,253,249,0.78)", padding: "5px 9px", borderRadius: 8 }}
      >
        {label}
      </span>
    </div>
  );
}

export default MapSlot;
