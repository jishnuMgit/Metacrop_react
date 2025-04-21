import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
import Logo from '../assets/images/connectlylogo.png'

export const generateInvoicePDF = (invoiceData: {
  totalAmount: number
  discount: number
  tax: number
  taxAmount: number
  grandTotal: number
  billNumber?: string
}) => {
  const doc = new jsPDF()

  // Logo
  const logo = Logo
  doc.addImage(logo, 'PNG', 15, 10, 50, 30)

  doc.setFontSize(18)
  doc.text('Invoice', 105, 45, { align: 'center' })

  doc.setFontSize(12)
  doc.text(`Bill Number: ${invoiceData.billNumber ?? '123ABC'}`, 105, 60, { align: 'center' })
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 70, { align: 'center' })

  doc.setLineWidth(0.5)
  doc.line(15, 75, 195, 75)

  doc.setFontSize(14)
  doc.text('Charges:', 15, 90)

  doc.setFontSize(12)
  doc.text(`Subtotal: $${invoiceData.totalAmount.toFixed(2)}`, 15, 100)
  doc.text(`Tax (${invoiceData.tax}%): $${invoiceData.taxAmount.toFixed(2)}`, 15, 110)
  doc.text(`Discount: $${invoiceData.discount.toFixed(2)}`, 15, 120)
  doc.text(`Total: $${invoiceData.grandTotal.toFixed(2)}`, 15, 130)

  doc.setFontSize(10)
  doc.text('THANK YOU, VISIT AGAIN!', 105, 160, { align: 'center' })

  const pdfBlob = doc.output('blob')
  const blobUrl = URL.createObjectURL(pdfBlob)
  window.open(blobUrl)
}
