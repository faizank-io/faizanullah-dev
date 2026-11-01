const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const dest = path.join(__dirname, "../public/projects/crmlogy.png");

async function fixCrmlogy() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });

  console.log("Fixing CRMLogy screenshot...");
  await page.goto("https://crmlogy.com/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);

  // Click close button if available
  const closeBtn = await page.$("button:has-text('OKAY, GOT IT'), button:has-text('No thanks'), [class*='close']");
  if (closeBtn) {
    console.log("Clicking modal close button...");
    await closeBtn.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Nuke any remaining modal or backdrop elements
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("body *"));
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const text = (el.textContent || "").toLowerCase();
      if (
        (style.position === "fixed" || style.position === "absolute") &&
        (parseInt(style.zIndex, 10) > 50 || text.includes("summer sale") || text.includes("20% off"))
      ) {
        el.style.setProperty("display", "none", "important");
      }
    });
    document.body.style.filter = "none";
    document.body.style.overflow = "auto";
  });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: dest });
  console.log("✔ Saved crmlogy.png");

  await browser.close();
}

fixCrmlogy();
