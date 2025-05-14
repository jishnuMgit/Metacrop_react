// import jsPDF from 'jspdf'
// // import autoTable from 'jspdf-autotable'
// import Logo from '../assets/images/connectlylogo.png'

// export const generateInvoicePDF = (invoiceData: {
//   totalAmount: number
//   discount: number
//   tax: number
//   taxAmount: number
//   grandTotal: number
//   billNumber?: string
// }) => {
//   const doc = new jsPDF()

//   // Logo
//   const logo = Logo
//   doc.addImage(logo, 'PNG', 15, 10, 50, 30)

//   doc.setFontSize(18)
//   doc.text('Invoice', 105, 45, { align: 'center' })

//   doc.setFontSize(12)
//   doc.text(`Bill Number: ${invoiceData.billNumber ?? '123ABC'}`, 105, 60, { align: 'center' })
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 70, { align: 'center' })

//   doc.setLineWidth(0.5)
//   doc.line(15, 75, 195, 75)

//   doc.setFontSize(14)
//   doc.text('Charges:', 15, 90)

//   doc.setFontSize(12)
//   doc.text(`Subtotal: $${invoiceData.totalAmount.toFixed(2)}`, 15, 100)
//   doc.text(`Tax (${invoiceData.tax}%): $${invoiceData.taxAmount.toFixed(2)}`, 15, 110)
//   doc.text(`Discount: $${invoiceData.discount.toFixed(2)}`, 15, 120)
//   doc.text(`Total: $${invoiceData.grandTotal.toFixed(2)}`, 15, 130)

//   doc.setFontSize(10)
//   doc.text('THANK YOU, VISIT AGAIN', 105, 160, { align: 'center' })

//   const pdfBlob = doc.output('blob')
//   const blobUrl = URL.createObjectURL(pdfBlob)
//   window.open(blobUrl)
// }
import easyinvoice from 'easyinvoice'
import { ApiItem } from './types'

export const generateInvoicePDF = async (invoiceData: {
  totalAmount: number
  discount: number
  tax: number
  taxAmount: number
  grandTotal: number
  billNumber?: string
  orders: ApiItem[]
}) => {
  const products = invoiceData.orders.map((item) => ({
    quantity: item.qty.toString(),
    description: item.ItemName,
    price: item.Price,
    tax: item.TaxPer.toFixed(2),
  }))
  console.log('products: ', products)
  const data = {
    document_title: 'Invoice',
    currency: 'USD',
    tax_not_included: false,
    tax_percent: invoiceData.tax,
    discount: invoiceData.discount,
    tax_type: 'VAT',
    logo: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAKlJREFUWIXt0rENgDAMBdGznn/nncJ1KwRUrK4xA40c+0lS8wv4DbMnOcnHLMgBN8bMzgh4wf9QxkCBAgQIECBA4H+CBnxRgz0nWXLdtrBL2SAcTJzUKDiQ3a+Ad0LxQZj8+xUsy7jBoqUwKAYMGDBgwYMAA//0L1hDc62CyALP5Q6kX3IjAc+jYgkDwIECBAgQIAAAQK9DgBtA9HTMBHi6AAAAABJRU5ErkJggg==',
    sender: {
      company: 'Collectly',
      address: 'Oman',
    },
    client: {
      company: 'Client Name',
      address: 'Client Address',
    },
    invoiceNumber: invoiceData.billNumber ?? '123ABC',
    invoiceDate: new Date().toLocaleDateString(),
    products: products,
  }
  const result = await easyinvoice.createInvoice(data)
  const link = document.createElement('a')
  link.href = 'data:application/pdf;base64,' + result.pdf
  link.download = 'invoice.pdf'
  link.click()
  const pdfWindow = window.open()
  pdfWindow?.document.write(
    `<iframe width='100%' height='100%' src='data:application/pdf;base64,${result.pdf}'></iframe>`
  )
}
