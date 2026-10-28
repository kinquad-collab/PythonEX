/* Builds the downloadable PDFs in pdfs/ by printing the real site pages.
 *
 *   npm install playwright && npx playwright install chromium
 *   node scripts/build-pdfs.js
 *
 * Set CHROMIUM_PATH to use a specific Chromium/Chrome binary instead of Playwright's.
 * Outputs: pdfs/uNN.pdf for each ready unit, pdfs/full-course.pdf, pdfs/glossary.pdf
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'pdfs');
fs.mkdirSync(outDir, { recursive: true });

// Read the course registry the same way the site does, so PDFs match the site.
function loadUnits() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'content', 'course.js'), 'utf8'), ctx);
  vm.runInContext('var COURSE = window.COURSE;', ctx);
  fs.readdirSync(path.join(root, 'content'))
    .filter(f => /^u\d+\.js$/.test(f))
    .sort()
    .forEach(f => vm.runInContext(fs.readFileSync(path.join(root, 'content', f), 'utf8'), ctx, { filename: f }));
  return ctx.COURSE.units;
}

const footer = (label) =>
  `<div style="font-size:8px;width:100%;padding:0 0.6in;color:#666;display:flex;justify-content:space-between;">` +
  `<span>PythonEX · ${label}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;

(async () => {
  const units = loadUnits().filter(u => u.status === 'ready');
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] } : {}
  );
  const page = await browser.newPage();

  async function render(url, file, label) {
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(() => document.body.getAttribute('data-ready') === '1', null, { timeout: 30000 });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: path.join(outDir, file),
      format: 'Letter',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footer(label),
      margin: { top: '0.6in', bottom: '0.7in', left: '0.6in', right: '0.6in' }
    });
    console.log('wrote pdfs/' + file);
  }

  for (const u of units) {
    const url = 'file://' + path.join(root, 'lesson.html') + `?unit=${u.id}&print=1`;
    await render(url, `${u.id}.pdf`, `Unit ${u.num}: ${u.title}`);
  }
  await render('file://' + path.join(root, 'lesson.html') + '?unit=all&print=1', 'full-course.pdf', 'Full course');
  await render('file://' + path.join(root, 'glossary.html') + '?print=1', 'glossary.pdf', 'Glossary');

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
