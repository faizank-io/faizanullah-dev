const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "../public/projects");

const remaining = [
  { name: "crmlogy", url: "https://crmlogy.com/" },
  { name: "discountslife", url: "https://discountslife.com/" },
  { name: "nutrinaturals", url: "https://www.nutrinaturals.org" },
];

async function captureRemaining() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });

  for (const t of remaining) {
    const dest = path.join(projectsDir, `${t.name}.png`);
    const page = await context.newPage();
    console.log(`Capturing ${t.name} (${t.url})...`);

    try {
      await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(5000);

      // Scroll slightly & hide preloaders
      await page.evaluate(() => {
        const loaders = document.querySelectorAll(
          "[class*='loader'], [id*='loader'], [class*='preloader'], [id*='preloader']"
        );
        loaders.forEach((el) => {
          el.style.setProperty("display", "none", "important");
        });
      }).catch(() => {});

      await page.screenshot({ path: dest });
      const stats = fs.statSync(dest);
      console.log(`✔ Saved ${t.name}.png (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✘ Error on ${t.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("Done remaining 3.");
}

captureRemaining();
