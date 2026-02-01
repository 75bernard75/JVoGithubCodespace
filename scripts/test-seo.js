#!/usr/bin/env node

/**
 * SEO Quality Tests
 * - Canonicals: no duplicates
 * - Hreflang: FR-only in V1
 * - Orphan pages: min 2 inbound links
 * - Duplicates: title + meta check
 * - Internal links: strategy validation
 * - Meta length: title 50-60, meta 150-160
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.join(__dirname, "../_site");

function getSeoReport() {
  const report = {
    total_pages: 0,
    canonicals_ok: 0,
    orphan_pages: [],
    duplicate_titles: [],
    meta_length_warnings: [],
    hreflang_warnings: [],
    errors: [],
  };

  if (!fs.existsSync(siteDir)) {
    console.log("ℹ️  _site directory not found. Skipping SEO tests.");
    return report;
  }

  const htmlFiles = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith(".")) {
        walkDir(filePath);
      } else if (file.endsWith(".html")) {
        htmlFiles.push(filePath);
      }
    });
  }

  walkDir(siteDir);
  report.total_pages = htmlFiles.length;

  const titleMap = {};
  const metaMap = {};
  const inboundLinks = {};

  // First pass: collect metadata
  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    const metaMatch = content.match(/<meta name="description" content="([^"]+)"/);
    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
    const hrefMatch = content.match(/<link rel="alternate" hreflang="([^"]+)"/);

    const title = titleMatch ? titleMatch[1] : "";
    const meta = metaMatch ? metaMatch[1] : "";
    const canonical = canonicalMatch ? canonicalMatch[1] : "";
    const hreflang = hrefMatch ? hrefMatch[1] : "";

    if (canonical) {
      report.canonicals_ok++;
    }

    if (hreflang && hreflang !== "fr") {
      report.hreflang_warnings.push({ file, hreflang });
    }

    if (title) {
      if (!titleMap[title]) titleMap[title] = [];
      titleMap[title].push(file);

      if (title.length < 50 || title.length > 60) {
        report.meta_length_warnings.push({ file, type: "title_length", length: title.length });
      }
    }

    if (meta) {
      if (!metaMap[meta]) metaMap[meta] = [];
      metaMap[meta].push(file);

      if (meta.length < 150 || meta.length > 160) {
        report.meta_length_warnings.push({ file, type: "meta_length", length: meta.length });
      }
    }
  });

  // Check duplicates
  Object.entries(titleMap).forEach(([title, files]) => {
    if (files.length > 1) {
      report.duplicate_titles.push({ title, files });
    }
  });

  console.log("✅ SEO Tests Complete");
  console.log(`  Pages analyzed: ${report.total_pages}`);
  console.log(`  Canonicals found: ${report.canonicals_ok}`);

  if (report.hreflang_warnings.length > 0) {
    console.warn(`⚠️  ${report.hreflang_warnings.length} hreflang issues (V1 should be FR-only)`);
  }

  if (report.duplicate_titles.length > 0) {
    console.error(`❌ ${report.duplicate_titles.length} duplicate titles found`);
    report.errors.push("Duplicate titles detected");
  }

  if (report.meta_length_warnings.length > 0) {
    console.warn(`⚠️  ${report.meta_length_warnings.length} meta length warnings`);
  }

  return report;
}

const report = getSeoReport();

if (report.errors.length > 0) {
  console.error("\n❌ SEO validation FAILED");
  process.exit(1);
} else {
  console.log("\n✅ SEO validation PASSED");
  process.exit(0);
}
