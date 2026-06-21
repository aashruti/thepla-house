"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ds/Input";
import { Select } from "@/components/ds/Select";
import { Textarea } from "@/components/ds/Textarea";
import { Button } from "@/components/ds/Button";

export interface EnquiryField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  helper?: string;
  /** span the full width of the 2-column grid */
  full?: boolean;
}

export interface EnquiryFormProps {
  kind: string;
  fields: EnquiryField[];
  submitLabel?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm({ kind, fields, submitLabel = "Send enquiry" }: EnquiryFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const setField = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const val = (values[f.name] || "").trim();
      if (f.required && !val) next[f.name] = `${f.label} is required`;
      else if (f.type === "email" && val && !EMAIL_RE.test(val)) next[f.name] = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, data: values }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues({});
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        style={{
          background: "var(--color-success-container)",
          border: "1px solid var(--leaf-200)",
          borderRadius: "var(--radius-xl)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", color: "var(--green-700)", fontSize: "1.5rem", margin: "0 0 8px" }}>
          Thank you — we&apos;ve got it.
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-700)", margin: 0 }}>
          The Thepla House team will get back to you shortly. For anything urgent, call +91 98195 55065.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 18 }} className="enquiry-form">
      {fields.map((f) => {
        const common = {
          label: f.label,
          required: f.required,
          error: errors[f.name],
          helper: f.helper,
          value: values[f.name] || "",
        };
        const span = f.full || f.type === "textarea" ? { gridColumn: "1 / -1" } : undefined;
        return (
          <div key={f.name} style={span}>
            {f.type === "textarea" ? (
              <Textarea {...common} rows={4} placeholder={f.placeholder} onChange={(e) => setField(f.name, e.target.value)} />
            ) : f.type === "select" ? (
              <Select {...common} options={f.options} placeholder={f.placeholder || "Choose…"} onChange={(e) => setField(f.name, e.target.value)} />
            ) : (
              <Input {...common} type={f.type || "text"} placeholder={f.placeholder} onChange={(e) => setField(f.name, e.target.value)} />
            )}
          </div>
        );
      })}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Button as="button" type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
        {status === "error" && (
          <span role="alert" style={{ fontFamily: "var(--font-body)", color: "var(--color-error)", fontSize: "0.875rem" }}>
            Something went wrong. Please try again or call +91 98195 55065.
          </span>
        )}
      </div>
    </form>
  );
}

export default EnquiryForm;
