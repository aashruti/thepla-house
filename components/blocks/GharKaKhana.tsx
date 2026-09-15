"use client";

import { useEffect, useState } from "react";

/**
 * GharKaKhana — the brand promise, cycling through the four languages its
 * customers speak.
 *
 * Every line is rendered at once, stacked in a single grid cell, and only the
 * active one is visible. The cell is therefore always as tall as the longest
 * translation, so the surrounding CTA never jumps as the text changes. Each
 * line keeps its own `lang`, and only the English line is exposed to assistive
 * tech — a screen reader would otherwise re-announce the headline every few
 * seconds.
 */
const LINES: { lang: string; text: string; gujarati?: boolean }[] = [
  { lang: "en", text: "We'll bring ghar ka khana to your door!" },
  { lang: "gu", text: "અમે ઘર જેવું સ્વાદિષ્ટ ભોજન તમારા ઘર સુધી પહોંચાડીશું!", gujarati: true },
  { lang: "hi", text: "हम घर का स्वादिष्ट खाना आपके दरवाज़े तक पहुँचाएँगे!" },
  { lang: "mr", text: "आम्ही घरच्या चवीचं स्वादिष्ट जेवण तुमच्या दारापर्यंत पोहोचवू!" },
];

const INTERVAL_MS = 3200;

export function GharKaKhana() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Honour reduced-motion: stay on English rather than cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % LINES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span style={{ display: "grid" }}>
      {LINES.map((line, i) => (
        <span
          key={line.lang}
          lang={line.lang}
          aria-hidden={i === 0 ? undefined : true}
          style={{
            gridArea: "1 / 1",
            opacity: i === active ? 1 : 0,
            transition: "opacity 500ms var(--ease-soft, ease)",
            fontFamily: line.gujarati ? "var(--font-gujarati)" : undefined,
          }}
        >
          {line.text}
        </span>
      ))}
    </span>
  );
}

export default GharKaKhana;
