"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { Button } from "@/components/ds/Button";

/**
 * Thepla House — PdfMenu
 * Renders the live menu PDF inline (client-side, via pdf.js) so the PDF file is
 * the single source of truth: replace /public/menu.pdf to update prices and the
 * page updates automatically — nothing else to touch.
 *
 * Why canvas instead of <iframe src="menu.pdf">: iOS Safari and many mobile
 * browsers refuse to render a PDF inline in an iframe (blank frame or a forced
 * download). Rendering each page to a high-resolution canvas shows the menu
 * inline everywhere, stays crisp, and supports native pinch-to-zoom. A Download
 * button still serves the original PDF for anyone who wants the file.
 */

// Worker is emitted by the bundler and version-matched to the installed lib.
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_URL = "/menu.pdf";
const DOWNLOAD_NAME = "Thepla-House-Menu.pdf";

/** Backing-store width per page (px). High enough that pinch-zoom stays sharp. */
const RENDER_WIDTH = 2200;

type Status = "loading" | "ready" | "error";

export function PdfMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  const docRef = useRef<PDFDocumentProxy | null>(null);

  // Load the document once.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    const task = pdfjsLib.getDocument(PDF_URL);
    task.promise.then(
      (doc) => {
        if (cancelled) {
          void doc.destroy();
          return;
        }
        docRef.current = doc;
        setNumPages(doc.numPages);
        setStatus("ready");
      },
      (err) => {
        if (cancelled) return;
        console.error("Menu PDF failed to load", err);
        setStatus("error");
      },
    );
    return () => {
      cancelled = true;
      void docRef.current?.destroy();
      docRef.current = null;
    };
  }, []);

  // Paint each page into its canvas once pages exist in the DOM.
  useEffect(() => {
    if (status !== "ready" || numPages === 0) return;
    const doc = docRef.current;
    const container = containerRef.current;
    if (!doc || !container) return;

    let cancelled = false;
    const tasks: RenderTask[] = [];

    (async () => {
      for (let n = 1; n <= doc.numPages; n++) {
        if (cancelled) return;
        const canvas = container.querySelector<HTMLCanvasElement>(
          `canvas[data-page="${n}"]`,
        );
        if (!canvas) continue;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        const page = await doc.getPage(n);
        if (cancelled) return;
        const base = page.getViewport({ scale: 1 });
        const scale = RENDER_WIDTH / base.width;
        const viewport = page.getViewport({ scale });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.aspectRatio = `${base.width} / ${base.height}`;

        const task = page.render({ canvasContext: ctx, viewport });
        tasks.push(task);
        try {
          await task.promise;
        } catch {
          /* render cancelled on unmount — ignore */
        }
      }
    })();

    return () => {
      cancelled = true;
      tasks.forEach((t) => t.cancel());
    };
  }, [status, numPages]);

  return (
    <div>
      {/* Actions */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Button as="a" href={PDF_URL} download={DOWNLOAD_NAME} variant="primary">
          <span aria-hidden="true" style={{ marginRight: 8 }}>⤓</span>
          Download menu (PDF)
        </Button>
        <Button as="a" href={PDF_URL} target="_blank" rel="noopener" variant="ghost">
          Open in new tab
        </Button>
      </div>

      {/* Pages */}
      <div ref={containerRef} aria-busy={status === "loading"}>
        {status === "error" ? (
          <div
            role="alert"
            style={{
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-outline-variant)",
              background: "var(--color-surface)",
              padding: "28px 24px",
              textAlign: "center",
              fontFamily: "var(--font-body)",
              color: "var(--ink-600)",
            }}
          >
            <p style={{ margin: "0 0 14px" }}>
              We couldn&rsquo;t preview the menu here. You can still open or download it:
            </p>
            <Button as="a" href={PDF_URL} target="_blank" rel="noopener" variant="primary">
              Open the menu (PDF)
            </Button>
          </div>
        ) : status === "loading" ? (
          <div
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              aspectRatio: "842 / 595",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-outline-variant)",
              background:
                "linear-gradient(110deg, var(--cream-50) 30%, var(--gold-50) 50%, var(--cream-50) 70%)",
              backgroundSize: "200% 100%",
              animation: "pdfShimmer 1.4s ease-in-out infinite",
              color: "var(--ink-600)",
              fontFamily: "var(--font-body)",
            }}
          >
            Loading menu…
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {Array.from({ length: numPages }, (_, i) => (
              <canvas
                key={i + 1}
                data-page={i + 1}
                aria-label={`Menu page ${i + 1} of ${numPages}`}
                role="img"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "842 / 595",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-outline-variant)",
                  boxShadow: "var(--shadow-md)",
                  background: "var(--color-surface)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pdfShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default PdfMenu;
