#!/usr/bin/env node

/**
 * Export JSON from back-office data
 * Prepares structured JSON for Eleventy build
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/_data");

function exportJson() {
  const exportData = {
    consoles: [],
    guides: [],
    accessories: [],
    videos: [],
    images: [],
    metadata: {
      exported_at: new Date().toISOString(),
      total_published: 0,
      version: "1.0.0",
      performance_budget: {
        html_kb: 50,
        images_kb: 150,
        js_kb: 30,
        css_kb: 20,
      },
    },
  };

  // Create directory if needed
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write template
  fs.writeFileSync(
    path.join(dataDir, "content.json"),
    JSON.stringify(exportData, null, 2)
  );

  console.log("✅ JSON export template created:", path.join(dataDir, "content.json"));
}

exportJson();
