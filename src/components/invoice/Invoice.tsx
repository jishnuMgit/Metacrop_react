// import InvoiceLi from './InvoiceLi'
// import { ItemContainer, Center, Button } from '../ui'
// import { InputNumber } from '../ui/input'
// import { useAppDispatch, useAppSelector } from '@/config/hooks'
// import { setDiscount, setDiscountOnBlur } from '@/redux/order'

// type InvoiceProps = {
//   btnProps: {
//     btnname: string
//     handleClick: () => void
//     disabled?: boolean
//   }
//   totalAmount: number
//   fetching: boolean
// }

// function Invoice({ btnProps, totalAmount, fetching }: InvoiceProps) {
//   const dispatch = useAppDispatch()
//   const discount = useAppSelector((state) => state.order.discount)
//   const tax = 0
//   const taxAmount = (tax / 100) * totalAmount
//   const grandTotal = totalAmount + taxAmount - Number(discount ?? 0)

//   return (
//     <>
//       <ItemContainer className="w-full">
//         <div className="flex flex-col w-full">
//           <InvoiceLi start="Bill Number" end="123ABC" />
//           <InvoiceLi start="SubTotal" end={`$ ` + totalAmount.toFixed(2)} />
//           <InvoiceLi start={`Tax (${tax + '%'}) `} end={taxAmount.toFixed(2)} />
//           <InvoiceLi
//             start="Discount"
//             end={
//               <>
//                 <InputNumber
//                   placeholder="0"
//                   className="text-right min-w-14 max-w-36 "
//                   value={discount}
//                   onBlur={() => {
//                     dispatch(setDiscountOnBlur())
//                   }}
//                   onChange={(e) => dispatch(setDiscount(e.target.value))}
//                 />
//               </>
//             }
//           />
//           <InvoiceLi start="Total:" end={`$ ` + grandTotal.toFixed(2)} bold />
//         </div>
//       </ItemContainer>
//       <Center className="mt-4">
//         <Button
//           onClick={btnProps.handleClick}
//           disabled={btnProps.disabled}
//           className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
//           loading={fetching}
//         >
//           {btnProps.btnname}
//         </Button>
//       </Center>
//     </>
//   )
// }

// export default Invoice

import InvoiceLi from './InvoiceLi'
import { ItemContainer, Center, Button } from '../ui'
import { InputNumber } from '../ui/input'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { setDiscount, setDiscountOnBlur } from '@/redux/order'
import { generateInvoicePDF } from '@/utils/generateInvoicePDF'

type InvoiceProps = {
  btnProps: {
    btnname: string
    handleClick?: () => void
    disabled?: boolean
  }
  user:any
  type:string
  selectedDate:string
  selectedOption:string
  store:any
  totalAmount: number
  fetching: boolean
}

function Invoice({ btnProps, totalAmount,type, fetching }: InvoiceProps) {
  const dispatch = useAppDispatch()
  const discount = useAppSelector((state) => state.order.discount)
    const orders = useAppSelector((state) => state.order.orders)

  const tax = 0
  const taxAmount = (tax / 100) * totalAmount
  const grandTotal = totalAmount + taxAmount - Number(discount ?? 0)

  // const orders = useAppSelector((state) => state.order.orders)

  const handleGeneratePDF = async () => {
    try {

      if(type!=='return'){
 await generateInvoicePDF({
        totalAmount,
        discount: Number(discount ?? 0),
        tax,
        taxAmount,
        grandTotal,
        billNumber: '123ABC',
        orders,
      })
      }
     
      window.location.reload()
    } catch (error) {
      console.error('Error generating invoice PDF:', error)
    }
  }

  return (
    <>
      <ItemContainer className="w-full">
        <div className="flex flex-col w-full">
          <InvoiceLi start="Bill Number" end="123ABC" />
          <InvoiceLi start="SubTotal" end={`﷼ ` + totalAmount.toFixed(2)} />
          {/* <InvoiceLi start={`Tax (${tax + '%'}) `} end={taxAmount.toFixed(2)} /> */}
          <InvoiceLi
            start="Discount"
            end={
              <InputNumber
                placeholder="0"
                className="text-right min-w-14 max-w-36"
                value={discount}
                onBlur={() => dispatch(setDiscountOnBlur())}
                onChange={(e) => dispatch(setDiscount(e.target.value))}
              />
            }
          />
          <InvoiceLi start="Total:" end={`﷼ ` + grandTotal.toFixed(2)} bold />
        </div>
      </ItemContainer>

      <Center className="mt-4">
        <Button
          onClick={() => {
            btnProps.handleClick && btnProps.handleClick()
            handleGeneratePDF().catch((error) => console.error('Error in onClick handler:', error))
          }}
          disabled={btnProps.disabled}
          className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
          loading={fetching}
        >
          {btnProps.btnname}
        </Button>
      </Center>
    </>
  )
}

export default Invoice
