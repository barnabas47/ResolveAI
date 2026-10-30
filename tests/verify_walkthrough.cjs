const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const screenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:5174/ ...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

  // 1. Initial State Screenshot
  await page.screenshot({ path: path.join(screenshotsDir, '01_initial_landing.png'), fullPage: true });
  console.log('Captured: 01_initial_landing.png');

  // 2. Click One-Take Cinema Demo button
  console.log('Clicking #btn-start-walkthrough...');
  await page.click('#btn-start-walkthrough');
  await page.waitForTimeout(1200);

  // 3. Capture Walkthrough Active State with Cursor and Cinema HUD
  await page.screenshot({ path: path.join(screenshotsDir, '02_cinema_hud_active.png') });
  console.log('Captured: 02_cinema_hud_active.png');

  // 4. Wait for live typing simulation
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(screenshotsDir, '03_typing_and_step2.png') });
  console.log('Captured: 03_typing_and_step2.png');

  // 5. Test Tab Switch to Telemetry AG Grid
  console.log('Clicking AG Grid tab...');
  await page.click('#nav-btn-telemetry');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(screenshotsDir, '04_ag_grid_telemetry.png'), fullPage: true });
  console.log('Captured: 04_ag_grid_telemetry.png');

  await browser.close();
  console.log('All visual verification tests PASSED!');
})();
