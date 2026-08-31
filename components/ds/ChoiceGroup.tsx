"use client";

import { useId, useState, type CSSProperties } from "react";

/**
 * Thepla House — ChoiceGroup
 * A labelled group of radio (single) or checkbox (multi) options, styled to
 * match Input/Select. Each option is a full-width tappable card so long
 * qualifying questions stay readable on mobile.
 */
export type ChoiceOption = string | { value: string; label: string; helper?: string };

export interface ChoiceGroupProps {
  label?: string;
  name: string;
  options: ChoiceOption[];
  /** "radio" = one answer, "checkbox" = many. */
  multiple?: boolean;
  /** Single value for radio; array for checkbox. */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  helper?: string;
  error?: string;
  required?: boolean;
  /** Lay the options out in two columns from md up. */
  columns?: 1 | 2;
}

function normalise(o: ChoiceOption) {
  return typeof o === "string" ? { value: o, label: o, helper: undefined } : o;
}

export function ChoiceGroup({
  label,
  name,
  options,
  multiple = false,
  value,
  onChange,
  helper,
  error,
  required = false,
  columns = 1,
}: ChoiceGroupProps) {
  const reactId = useId();
  const [focused, setFocused] = useState<string | null>(null);
  const invalid = Boolean(error);
  const selected = multiple ? (Array.isArray(value) ? value : []) : value ? [String(value)] : [];

  const toggle = (v: string) => {
    if (!onChange) return;
    if (!multiple) {
      onChange(v);
      return;
    }
    onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  };

  const listStyle: CSSProperties = {
    display: "grid",
    gap: 8,
    gridTemplateColumns: columns === 2 ? "repeat(auto-fit, minmax(200px, 1fr))" : "1fr",
  };

  return (
    <fieldset
      style={{ border: 0, margin: 0, padding: 0, fontFamily: "var(--font-body)", width: "100%" }}
      aria-describedby={helper || error ? `${reactId}-desc` : undefined}
    >
      {label && (
        <legend
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-on-surface)",
            padding: 0,
            marginBottom: 8,
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--color-error)", marginLeft: 2 }} aria-hidden="true">
              *
            </span>
          )}
        </legend>
      )}
      <div style={listStyle}>
        {options.map((o) => {
          const opt = normalise(o);
          const checked = selected.includes(opt.value);
          const isFocused = focused === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                gap: 11,
                alignItems: "flex-start",
                padding: "12px 14px",
                background: checked ? "var(--color-surface-container)" : "var(--color-surface)",
                border: `1.5px solid ${
                  invalid
                    ? "var(--color-error)"
                    : checked
                      ? "var(--color-primary)"
                      : isFocused
                        ? "var(--color-secondary-active)"
                        : "var(--color-outline-variant)"
                }`,
                borderRadius: "var(--radius-md)",
                boxShadow: isFocused ? "var(--shadow-focus)" : "none",
                cursor: "pointer",
                transition: "border-color var(--duration-fast) var(--ease-standard)",
              }}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={opt.value}
                checked={checked}
                required={required && !multiple}
                onChange={() => toggle(opt.value)}
                onFocus={() => setFocused(opt.value)}
                onBlur={() => setFocused(null)}
                style={{
                  marginTop: 3,
                  width: 17,
                  height: 17,
                  flexShrink: 0,
                  accentColor: "var(--color-primary)",
                  cursor: "pointer",
                }}
              />
              <span style={{ display: "block" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.9375rem",
                    lineHeight: 1.45,
                    color: "var(--color-on-surface)",
                    fontWeight: checked ? 600 : 400,
                  }}
                >
                  {opt.label}
                </span>
                {opt.helper && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      lineHeight: 1.45,
                      color: "var(--color-on-surface-variant)",
                      marginTop: 2,
                    }}
                  >
                    {opt.helper}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {(helper || error) && (
        <span
          id={`${reactId}-desc`}
          role={invalid ? "alert" : undefined}
          style={{
            display: "block",
            marginTop: 6,
            fontSize: "0.8125rem",
            color: invalid ? "var(--color-error)" : "var(--color-on-surface-variant)",
          }}
        >
          {error || helper}
        </span>
      )}
    </fieldset>
  );
}

export default ChoiceGroup;
