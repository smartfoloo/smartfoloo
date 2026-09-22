// Refreshes the live-project screenshots in images/.
// Viewport is 1600x900 (16:9) to match .project-img's `aspect-ratio: 16/9` in css/style.css —
// keep these in sync if that ever changes.
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "images");

const VIEWPORT = { width: 1600, height: 900 };

const PROJECTS = [
  { name: "Arsenic", url: "https://arsenic.smartfoloo.space", file: "arsenic.png" },
  { name: "Sleeve", url: "https://sleeve.smartfoloo.space/", file: "sleeve.png" },
  { name: "JR East GeoJSON", url: "https://jr-east-geojson.pages.dev", file: "jreastgeojson.png" },
  { name: "Farechart", url: "https://farechart.pages.dev", file: "farechart.png" },
];

async function screenshotOne(browser, { name, url, file }) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000); // let late layout/map tiles settle
    await page.screenshot({ path: path.join(IMAGES_DIR, file) });
    console.log(`✓ ${name} -> images/${file}`);
  } catch (err) {
    console.error(`✗ ${name} (${url}): ${err.message}`);
    process.exitCode = 1;
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch();
for (const project of PROJECTS) {
  await screenshotOne(browser, project);
}
await browser.close();
