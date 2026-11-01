const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "../public/projects");

const newTargets = [
  { name: "auctune", url: "https://auctune.webdemodesigns.co/" },
  { name: "yak-and-go", url: "https://yak-and-go-vercel-deployment.vercel.app/" },
  { name: "crmlogy", url: "https://crmlogy.com/" },
  { name: "discountslife", url: "https://discountslife.com/" },
  { name: "nutrinaturals", url: "https://www.nutrinaturals.org" },
  { name: "transitionthewarrior", url: "https://transitionthewarrior.org/" },
];

async function captureNew() {
  console.log("Launching Edge browser for new project screenshots...");
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  });

  for (const t of newTargets) {
    const dest = path.join(projectsDir, `${t.name}.png`);
    const page = await context.newPage();
    console.log(`\nCapturing ${t.name} (${t.url})...`);

    try {
      await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      console.log(`Page title: ${await page.title()}`);

      // Wait 6 seconds for JS and images to load
      await page.waitForTimeout(6000);

      // Hide preloader overlay if any
      await page.evaluate(() => {
        const allElements = Array.from(document.querySelectorAll("body *"));
        allElements.forEach((el) => {
          const className = (el.className || "").toString().toLowerCase();
          const id = (el.id || "").toString().toLowerCase();
          const style = window.getComputedStyle(el);

          const isLoader =
            className.includes("loader") ||
            className.includes("preloader") ||
            className.includes("splash") ||
            id.includes("loader") ||
            id.includes("preloader") ||
            id.includes("splash");

          const isFixedOverlay =
            (style.position === "fixed" || style.position === "absolute") &&
            parseInt(style.zIndex, 10) > 100 &&
            (parseInt(style.width, 10) > 300 || style.width.includes("100%"));

          if (isLoader || isFixedOverlay) {
            el.style.setProperty("display", "none", "important");
            el.style.setProperty("opacity", "0", "important");
            el.style.setProperty("visibility", "hidden", "important");
          }
        });
      }).catch(() => {});

      // Trigger lazy load
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);

      await page.screenshot({ path: dest });
      const stats = fs.statSync(dest);
      console.log(`✔ Saved ${t.name}.png (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✘ Error capturing ${t.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nNew project captures complete.");
}

captureNew();
