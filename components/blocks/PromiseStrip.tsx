import type { CSSProperties } from "react";

/**
 * PromiseStrip — deep-green health-claims band. Stacks on mobile, splits into
 * a divided row on desktop. A check glyph keeps each claim legible without colour.
 */
export interface PromiseItem {
  title: string;
  detail: string;
}

export const DEFAULT_PROMISES: PromiseItem[] = [
  { title: "100% whole wheat", detail: "No maida, ever" },
  { title: "Sunflower oil only", detail: "No palm oil" },
  { title: "Zero preservatives", detail: "No artificial colours" },
  { title: "Jain & vegan", detail: "Clearly tagged" },
  { title: "Made fresh after order", detail: "Cooked when you order" },
];

function Check() {
  return (
    <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: "var(--green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span aria-hidden="true" style={{ display: "inline-block", width: 8, height: 14, border: "solid var(--gold-300)", borderWidth: "0 2.5px 2.5px 0", transform: "rotate(45deg)", marginBottom: 3 }} />
    </span>
  );
}

export interface PromiseStripProps {
  items?: PromiseItem[];
  style?: CSSProperties;
  className?: string;
}

export function PromiseStrip({ items = DEFAULT_PROMISES, style, className }: PromiseStripProps) {
  return (
    <section className={className} style={{ background: "var(--green-700)", ...style }} aria-label="Our promise">
      <div className="th-container" style={{ paddingTop: 28, paddingBottom: 28 }}>
        <div className="promise-grid">
          {items.map((item, i) => (
            <div key={item.title} style={{ display: "contents" }}>
              {i > 0 && <span className="promise-divider" aria-hidden="true" />}
              <div className="promise-item">
                <Check />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--cream-50)", fontSize: "1.0625rem" }}>{item.title}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--green-200)", fontSize: "0.8125rem" }}>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromiseStrip;
