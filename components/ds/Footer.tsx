import Link from "next/link";
import Image from "next/image";

/**
 * Thepla House — Footer
 * Deep-green footer with brand lockup, link columns, and a warm baseline.
 */
export interface FooterColumn {
  title: string;
  links: { label: string; href?: string }[];
}

export interface FooterProps {
  logoSrc?: string;
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socials?: { label: string; href: string }[] | string[];
  note?: string;
}

function SocialGlyph({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("instagram")) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (l.includes("whatsapp")) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0012.04 2zm5.46 14.06c-.22.61-1.26 1.17-1.76 1.24-.45.07-1.02.1-1.64-.1-.38-.12-.86-.28-1.48-.55-2.62-1.14-4.29-3.82-4.42-3.99-.13-.17-1.05-1.4-1.05-2.67s.66-1.9.9-2.15c.24-.25.52-.31.69-.31.17 0 .34 0 .49.01.16.01.37-.06.58.44.22.51.73 1.8.79 1.93.06.13.11.28.02.45-.09.17-.13.28-.26.43-.13.16-.27.34-.39.46-.13.13-.26.27-.11.53.15.26.67 1.11 1.44 1.8.99.89 1.83 1.16 2.09 1.29.26.13.41.11.56-.06.15-.17.65-.77.82-1.02.17-.26.34-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.19.5.3.07.11.07.63-.15 1.24z" />
      </svg>
    );
  }
  return <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>{label.slice(0, 2)}</span>;
}

export function Footer({
  logoSrc,
  brand = "Thepla House",
  tagline = "Junk the Junk Food.",
  columns = [],
  socials = [],
  note = "© 2026 Thepla House by Tejal's Kitchen. Made in Mumbai since 2018.",
}: FooterProps) {
  return (
    <footer style={{ background: "var(--green-800)", color: "var(--cream-100)", fontFamily: "var(--font-body)" }}>
      <div
        style={{
          maxWidth: "var(--container-xl)",
          margin: "0 auto",
          padding: "56px 20px 28px",
          display: "grid",
          gridTemplateColumns: "minmax(220px, 1.4fr) repeat(auto-fit, minmax(140px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={brand}
                width={64}
                height={64}
                style={{ height: 64, width: "auto", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.25))" }}
              />
            ) : (
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold-300)" }}>
                {brand}
              </span>
            )}
          </div>
          <p style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", lineHeight: 1.1, color: "var(--gold-300)", margin: "0 0 10px" }}>
            {tagline}
          </p>
          <p style={{ margin: 0, color: "var(--green-200)", maxWidth: "34ch", fontSize: "0.9rem" }}>
            100% whole wheat. No maida, no palm oil, no preservatives. Jain & vegan options.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-300)",
                margin: "0 0 14px",
                fontWeight: 700,
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href || "#"} style={{ color: "var(--cream-200)", textDecoration: "none", fontSize: "0.9rem" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--green-700)" }}>
        <div
          style={{
            maxWidth: "var(--container-xl)",
            margin: "0 auto",
            padding: "18px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "var(--green-200)", fontSize: "0.8125rem" }}>{note}</span>
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map((s) => {
              const item = typeof s === "string" ? { label: s, href: "#" } : s;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-full)",
                    background: "var(--green-700)",
                    color: "var(--gold-300)",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <SocialGlyph label={item.label} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
