#!/usr/bin/env node
/**
 * Parses public/menu.pdf (a real text-layer PDF, not a scan — verified via
 * page.getTextContent()) into structured { section, name, price } entries.
 *
 * Run this locally after replacing public/menu.pdf:
 *   npm run menu:extract
 *
 * It writes data/menu-extracted.json for you to review, then (separately,
 * by hand) fold into data/menu.ts / lib/seo.ts if the output looks right.
 * This is a best-effort layout parser for a loosely-gridded marketing PDF —
 * always skim the output before trusting it, especially the "unmatched"
 * section at the bottom.
 *
 * How the PDF is laid out (why this isn't a simple top-to-bottom read):
 * each page is a multi-column table (e.g. "Thepla | Breakfast N Snacks |
 * Main Course ..."), but column content isn't grid-aligned — a dish's price
 * is right-aligned and often sits closer (in x) to the *next* column's
 * header than to its own. So columns are only used to track multi-line
 * (wrapped) dish names; a price is paired with whichever name-fragment is
 * immediately to its left on the same physical text row, which is reliable
 * regardless of column boundaries.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PDF_PATH = path.join(ROOT, "public/menu.pdf");
const OUT_PATH = path.join(ROOT, "data/menu-extracted.json");

const ROW_TOLERANCE = 3; // pt; items within this y-delta are "the same row"
const PRICE_RE = /₹\s*[\d,]+(?:\.\d+)?/;
const PRICE_ONLY_RE = /^₹\s*[\d,]+(?:\.\d+)?$/;
// A real dish name never gets this long — past this, a column's pending
// buffer has drifted into unrelated notes/footer text and should be dropped
// rather than kept accumulating (and later glued onto an unrelated price).
const MAX_PENDING_CHARS = 70;
// Entries at or above this length still closed cleanly but are worth a
// human glance — flagged separately instead of mixed into the clean list.
const SUSPECT_NAME_CHARS = 45;
// These are always the tail of a wrapped combo name ("X Sabji + 3 Phulka
// Roti + Dal Rice") in this menu, never a complete dish on their own — when
// the wrap-linking misses, they surface as bare, context-free entries. A
// length cutoff can't catch this without also flagging real short dishes
// (e.g. "Fafda"), so this is a targeted blocklist instead.
const FRAGMENT_ONLY_NAMES = new Set(["rice", "dal rice", "roti", "phulka roti", "dal"]);

function groupRows(items) {
  const rows = [];
  for (const it of items) {
    let row = rows.find((r) => Math.abs(r.y - it.y) < ROW_TOLERANCE);
    if (!row) {
      row = { y: it.y, items: [] };
      rows.push(row);
    }
    row.items.push(it);
  }
  rows.sort((a, b) => b.y - a.y); // top of page first
  for (const row of rows) row.items.sort((a, b) => a.x - b.x);
  return rows;
}

/** Column header anchors, used only for the cosmetic "section" label —
 *  never for pairing a price to a name (see parsePage for why). */
function columnAnchors(rows) {
  const header = rows[0];
  return header.items.map((it) => ({ x: it.x, label: it.str.trim() })).sort((a, b) => a.x - b.x);
}

function sectionFor(x, anchors) {
  let label = anchors[0]?.label ?? "";
  for (const a of anchors) if (a.x <= x + 20) label = a.label; // +20: labels sit slightly right of body text
  return label;
}

function cleanText(s) {
  return s.replace(/\s+/g, " ").trim();
}

/** Max horizontal distance (pt) allowed when linking two fragments — either
 *  a wrapped name continuing on the row below, or a price to its name. This
 *  PDF's columns aren't grid-aligned (a name can start left of its own
 *  column header, and a price can sit past the midpoint into the next
 *  column), so we deliberately don't bucket by fixed column boundaries —
 *  we link purely by "closest x, within reason" instead. */
const LINK_MAX_DX = 60;

function parsePage(rows, anchors, priceFont) {
  const clean = [];
  const suspect = [];
  const unmatched = [];
  const headerLabels = new Set(anchors.map((a) => a.label));
  // Open (unclosed) name threads: fragments of a dish name not yet paired
  // with a price, keyed by their approximate x so a later row's continuation
  // or a same-row price can find them by proximity rather than column index.
  let openThreads = []; // { x, text }

  function emit(x, name, price) {
    if (FRAGMENT_ONLY_NAMES.has(name.toLowerCase())) {
      unmatched.push({ type: "fragment-only-name", name, price });
      return;
    }
    const entry = { section: sectionFor(x, anchors), name, price };
    if (name.length > SUSPECT_NAME_CHARS) suspect.push(entry);
    else clean.push(entry);
  }

  function nearestThreadIndex(x, maxDx = LINK_MAX_DX) {
    let best = -1;
    let bestDx = Infinity;
    for (let i = 0; i < openThreads.length; i++) {
      const dx = Math.abs(openThreads[i].x - x);
      if (dx < bestDx && dx <= maxDx) {
        best = i;
        bestDx = dx;
      }
    }
    return best;
  }

  for (const row of rows) {
    for (let i = 0; i < row.items.length; i++) {
      const it = row.items[i];
      const str = it.str.trim();
      if (!str || headerLabels.has(str)) continue;

      const priceOnly = PRICE_ONLY_RE.test(str);
      const embedded = !priceOnly && str.match(PRICE_RE);
      if (priceOnly || embedded) {
        const priceText = priceOnly ? str : embedded[0];
        const leadingText = priceOnly ? "" : cleanText(str.slice(0, embedded.index));

        // Prefer the thread the immediately preceding row item just fed
        // (handles same-row pairing, including multi-fragment drop-caps,
        // since each fragment updates its thread's rowRef as it's seen
        // below). Otherwise fall back to nearest-x across all open threads
        // — a wrapped name wasn't closed on the row it started.
        let idx = i > 0 ? openThreads.findIndex((t) => t.rowRef === row.items[i - 1]) : -1;
        if (idx === -1) idx = nearestThreadIndex(it.x);

        const threadText = idx !== -1 ? openThreads[idx].text : "";
        if (idx !== -1) openThreads.splice(idx, 1);
        const name = cleanText(`${threadText} ${leadingText}`);
        if (name) emit(it.x, name, priceText.replace(/\s+/g, " "));
        else unmatched.push({ type: "price-without-name", price: priceText, x: it.x, y: row.y });
        continue;
      }

      // Plain text: section/sub-section headings ("Roti", "Chaat Corner",
      // "Corporate Special") consistently render in the same font as prices,
      // distinct from the dish-name font — so font identity (not word count
      // or "alone on its row", which missed headings sharing a row with
      // other columns' content and let them glue onto the next real dish
      // name) is what tells a heading apart from a name fragment here.
      if (priceFont && it.fontName === priceFont) continue;

      const linkIdx = nearestThreadIndex(it.x);
      if (linkIdx !== -1) {
        const thread = openThreads[linkIdx];
        thread.text = `${thread.text} ${str}`;
        thread.x = it.x;
        thread.rowRef = it;
        if (thread.text.length > MAX_PENDING_CHARS) {
          unmatched.push({ type: "runaway-thread-discarded", text: cleanText(thread.text) });
          openThreads.splice(linkIdx, 1);
        }
      } else {
        openThreads.push({ x: it.x, text: str, rowRef: it });
      }
    }
  }

  for (const t of openThreads) {
    if (t.text.trim()) unmatched.push({ type: "name-without-price", name: cleanText(t.text) });
  }

  return { clean, suspect, unmatched };
}

async function main() {
  const doc = await pdfjsLib.getDocument(PDF_PATH).promise;
  const pages = [];
  const allSuspect = [];
  const allUnmatched = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const items = content.items
      .filter((it) => it.str && it.str.trim())
      .map((it) => ({ str: it.str, x: it.transform[4], y: it.transform[5], fontName: it.fontName }));
    if (!items.length) continue;

    // Prices and section/sub-section headings consistently share one font,
    // distinct from the font used for actual dish names — a far more
    // reliable "is this a heading, not a dish name" signal than guessing
    // from word count (which misfires on short real dishes like "Chana Chat").
    const priceFont = items.find((it) => PRICE_ONLY_RE.test(it.str.trim()))?.fontName;

    const rows = groupRows(items);
    const anchors = columnAnchors(rows);
    const { clean, suspect, unmatched } = parsePage(rows, anchors, priceFont);
    pages.push({ page: p, entries: clean });
    for (const s of suspect) allSuspect.push({ page: p, ...s });
    for (const u of unmatched) allUnmatched.push({ page: p, ...u });
  }

  const totalEntries = pages.reduce((n, p) => n + p.entries.length, 0);
  const result = {
    generatedFrom: "public/menu.pdf",
    totalEntries,
    pages,
    needsReview: allSuspect,
    unmatched: allUnmatched,
  };
  writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));

  console.log(`Extracted ${totalEntries} clean dish/price pairs from ${pages.length} page(s).`);
  console.log(`${allSuspect.length} entries flagged in "needsReview" (unusually long name — check by eye).`);
  console.log(`${allUnmatched.length} fragments discarded/unpaired (see "unmatched").`);
  console.log(`Written to ${path.relative(ROOT, OUT_PATH)} — review before using it anywhere.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
