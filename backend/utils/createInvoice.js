import fs from 'fs'
import PDFDocument from 'pdfkit'

export const createInvoice = (invoice, path) => {
  let doc = new PDFDocument({ size: 'A4', margin: 50 })

  generateHeader(doc)
  generateCustomerInformation(doc, invoice)
  generateInvoiceTable(doc, invoice)
  generateFooter(doc)

  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

function generateHeader(doc) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Auto Junction.', 50, 50)
    .fontSize(10)
    .moveDown()
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160)

  generateHr(doc, 175)

  const customerInformationTop = 195

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice._id, 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(
      formatDate(new Date(invoice.createdAt)),
      150,
      customerInformationTop + 15
    )

    .font('Helvetica-Bold')
    .text(
      'Name: ' + invoice.shippingAddress.clientName ?? invoice.user.name,
      300,
      customerInformationTop
    )
    .text(
      'Phone Number: ' + invoice.shippingAddress.clientPhoneNumber ??
        invoice.user.phoneNumber,
      300,
      customerInformationTop + 15
    )
    .font('Helvetica')
    .text(invoice.shippingAddress.address, 300, customerInformationTop + 30)
    .text(
      invoice.shippingAddress.city + ', ' + invoice.shippingAddress.postalCode,
      300,
      customerInformationTop + 45
    )
    .moveDown()

  generateHr(doc, 252)
}

function generateInvoiceTable(doc, invoice) {
  let i
  const invoiceTableTop = 330

  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Unit Cost',
    'Quantity',
    'Line Total'
  )
  generateHr(doc, invoiceTableTop + 20)
  doc.font('Helvetica')

  for (i = 0; i < invoice.orderItems.length; i++) {
    const item = invoice.orderItems[i]
    const position = invoiceTableTop + (i + 1) * 30
    generateTableRow(
      doc,
      position,
      item.name,
      formatCurrency(item.price),
      item.quantity,
      formatCurrency(item.price * item.quantity)
    )

    generateHr(doc, position + 20)
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30
  const paidToDatePosition = subtotalPosition + 20
  const duePosition = paidToDatePosition + 25
  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Total: ',
    formatCurrency(invoice.totalPrice)
  )
  doc.font('Helvetica')
}

function generateFooter(doc) {
  doc.fontSize(10).text('Thank you for choosing Auto Junction.', 50, 780, {
    align: 'center',
    width: 500,
  })
}

function generateTableRow(doc, y, item, unitCost, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' })
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke()
}

function formatCurrency(amount) {
  return 'BDT ' + `${amount}`
}

function formatDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return year + '/' + month + '/' + day
}
