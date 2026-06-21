"use client";

import { useState, type ReactNode } from "react";

/**
 * Thepla House — Tabs
 * Underline tab bar. Controlled or uncontrolled. The active tab shows a gold
 * underline; tabs are keyboard-navigable buttons.
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

export interface TabsProps {
  tabs?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  fitted?: boolean;
}

export function Tabs({ tabs = [], value, defaultValue, onChange, fitted = false }: TabsProps) {
  const [internal, setInternal] = useState<string | undefined>(
    defaultValue ?? (tabs[0] && tabs[0].id),
  );
  const active = value !== undefined ? value : internal;
  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: fitted ? 0 : 4,
        borderBottom: "1.5px solid var(--color-outline-variant)",
        overflowX: "auto",
      }}
    >
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => select(t.id)}
            style={{
              flex: fitted ? 1 : "initial",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "12px 16px",
              minHeight: 48,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
              whiteSpace: "nowrap",
              transition: "color var(--duration-fast) var(--ease-standard)",
            }}
          >
            {t.icon && <span aria-hidden="true">{t.icon}</span>}
            {t.label}
            {t.count != null && (
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: "var(--radius-pill)",
                  background: isActive ? "var(--maroon-100)" : "var(--cream-200)",
                  color: isActive ? "var(--maroon-700)" : "var(--color-on-surface-variant)",
                }}
              >
                {t.count}
              </span>
            )}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 8,
                right: 8,
                bottom: -1.5,
                height: 3,
                borderRadius: "3px 3px 0 0",
                background: "var(--color-secondary)",
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: "transform var(--duration-base) var(--ease-soft)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
