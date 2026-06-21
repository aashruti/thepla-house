"use client";

import {
  useId,
  useState,
  type SelectHTMLAttributes,
} from "react";

/**
 * Thepla House — Select
 * Native <select> styled to match Input, with a custom maroon chevron.
 */
export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  helper?: string;
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  id,
  options = [],
  placeholder = "Choose…",
  helper,
  error,
  disabled = false,
  required = false,
  value,
  ...rest
}: SelectProps) {
  const [focus, setFocus] = useState(false);
  const reactId = useId();
  const fieldId = id || reactId;
  const invalid = Boolean(error);
  const borderColor = invalid
    ? "var(--color-error)"
    : focus
      ? "var(--color-secondary-active)"
      : "var(--color-outline)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "var(--font-body)",
        width: "100%",
      }}
    >
      {label && (
        <label
          htmlFor={fieldId}
          style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-on-surface)" }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--color-error)", marginLeft: 2 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={fieldId}
          disabled={disabled}
          required={required}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={helper || error ? `${fieldId}-desc` : undefined}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            minHeight: 46,
            padding: "12px 40px 12px 14px",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: value ? "var(--color-on-surface)" : "var(--color-on-surface-variant)",
            background: disabled ? "var(--color-surface-container-high)" : "var(--color-surface)",
            border: `1.5px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
            boxShadow: focus && !invalid ? "var(--shadow-focus)" : "none",
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
            transition:
              "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
          }}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 14,
            pointerEvents: "none",
            color: "var(--color-primary)",
            fontSize: 12,
          }}
        >
          ▾
        </span>
      </div>
      {(helper || error) && (
        <span
          id={`${fieldId}-desc`}
          style={{
            fontSize: "0.8125rem",
            color: invalid ? "var(--color-error)" : "var(--color-on-surface-variant)",
          }}
        >
          {error || helper}
        </span>
      )}
    </div>
  );
}

export default Select;
