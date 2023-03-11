import puppeteer from 'puppeteer'

const generateInvoice = async (htmlFile) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(htmlFile)

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

  // Convert HTML to PDF
  const pdfBuffer = await page.pdf(pdfOptions)

  await browser.close()

  return pdfBuffer
}

export default generateInvoice
