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

interface InvoiceData {
  totalAmount: number
  discount: number
  tax: number
  taxAmount: number
  grandTotal: number
  billNumber?: string
  orders: ApiItem[]
}

// Format item description
const formatItemDescription = (item: ApiItem): string => {
  const taxPer = Number(item?.taxAmt ?? 0)
  const price = Number(item?.Price ?? 1) // Avoid division by 0
  const taxRate = price ? ((taxPer / price) * 100).toFixed(2) : '0.00'
  return `${item.ItemName} (Qty: ${item.Qty ?? 1})\nTax: ₹${taxPer}/unit (${taxRate}%)`
}

export const generateInvoicePDF2 = async (invoiceData: InvoiceData): Promise<void> => {
  console.log('invoiceData', invoiceData)

  const products = invoiceData.orders.map((item) => {
    const qty = Number(item?.Qty ?? item?.qty ?? 0)
    const price = Number(item?.Price ?? 0)
    const tax = Number(item?.TaxPer || item?.taxAmt || 0)

    return {
      quantity: qty.toString(),
      description: formatItemDescription(item),
      price,
      taxRate: price ? Number(((tax / price) * 100).toFixed(2)) : 0,
    }
  })

  const invoiceNumber = invoiceData.billNumber ?? `INV-${Date.now()}`

  const data = {
    document_title: 'Tax Invoice',
    currency: 'INR',
    tax_not_included: false,
    sender: {
      company: 'Your Store Name',
      address: 'Store Address, Kochi, Kerala\nGSTIN: 32XXXXXXXXX1Z5',
      zip: '682016',
      city: 'Kochi',
      country: 'India',
    },
    client: {
      company: 'Customer Name',
      address: 'Customer Address\nPhone: 9876543210',
    },
    invoiceNumber: invoiceNumber,
    invoiceDate: new Date().toLocaleDateString('en-IN'),
    products: products,
    bottomNotice: 'Payment Mode: UPI\nThank you for shopping with us!',
    settings: {
      currency: 'INR',
      taxNotation: 'gst',
      format: 'A5' as 'A5',
      marginTop: 5,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 5,
    },
    translate: {
      invoice: 'Invoice',
      quantity: 'Qty',
      price: 'Rate',
      description: 'Item',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
    },
    totals: [
      { name: 'Discount', amount: -invoiceData.discount },
      { name: 'Grand Total', amount: invoiceData.grandTotal },
    ],
  }

  try {
    const result = await easyinvoice.createInvoice(data)

    // Trigger file download
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${result.pdf}`
    link.download = `Invoice-${invoiceNumber}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Open PDF in new window
    const pdfWindow = window.open()
    pdfWindow?.document.write(
      `<iframe width='100%' height='100%' src='data:application/pdf;base64,${result.pdf}'></iframe>`
    )
  } catch (error) {
    console.error('❌ Failed to generate invoice PDF:', error)
    alert('Failed to generate invoice. Please try again.')
  }
}
