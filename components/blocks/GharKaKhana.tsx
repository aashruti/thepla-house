import type { CSSProperties } from "react";

/**
 * GharKaKhana — the brand promise in the four languages its customers actually
 * speak. Each line carries its own `lang`, so screen readers switch voice and
 * search engines see genuinely multilingual copy rather than mojibake.
 */
const LINES: { lang: string; label: string; text: string; gujarati?: boolean }[] = [
  { lang: "en", label: "English", text: "We'll bring ghar ka khana to your door!" },
  {
    lang: "gu",
    label: "ગુજરાતી",
    text: "અમે ઘર જેવું સ્વાદિષ્ટ ભોજન તમારા ઘર સુધી પહોંચાડીશું!",
    gujarati: true,
  },
  { lang: "hi", label: "हिंदी", text: "हम घर का स्वादिष्ट खाना आपके दरवाज़े तक पहुँचाएँगे!" },
  { lang: "mr", label: "मराठी", text: "आम्ही घरच्या चवीचं स्वादिष्ट जेवण तुमच्या दारापर्यंत पोहोचवू!" },
];

export function GharKaKhana({ style, className }: { style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={style}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
        {LINES.map((line) => (
          <li key={line.lang} style={{ display: "grid", gap: 2 }}>
            <span
              className="seglabel"
              lang={line.lang}
              style={{ color: "var(--gold-300)", fontFamily: line.gujarati ? "var(--font-gujarati)" : undefined }}
            >
              {line.label}
            </span>
            <span
              lang={line.lang}
              style={{
                fontFamily: line.gujarati ? "var(--font-gujarati)" : "var(--font-body)",
                color: "var(--cream-50)",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
              }}
            >
              {line.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GharKaKhana;
