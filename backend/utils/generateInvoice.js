import puppeteer from 'puppeteer'
import {chromium} from 'playwright'

const generateInvoice = async (htmlFile) => {
  let browser
  let page
  let pdfBuffer

   // PDF options
   const pdfOptions = {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
  }

  try {
    // Try to use Puppeteer first
    browser = await puppeteer.launch({
      executablePath: '/path/to/chrome',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.setContent(htmlFile);
    pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();
  } catch (error) {
    // If Puppeteer is not available, fallback to Playwright
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.setContent(htmlFile);
    pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();
  }

  return pdfBuffer
}

export default generateInvoice
