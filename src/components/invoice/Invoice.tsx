import { useMemo } from 'react'
import ItemContainer from '../ui/ItemContainer'
import InvoiceLi from './InvoiceLi'
import { useAppSelector } from '@/config/hooks'
import { Center } from '../ui/'
import { Button } from '../ui/'
import { BillGenerate } from '@/schema'
import { useApi } from 'useipa'
import SalesData from './SalesData'

function Invoice() {
  const orders = useAppSelector((state) => state.order.orders)
  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.Price, 0),
    [orders]
  )
  const { mutate, success } = useApi()
  const handleClick = async (): Promise<void> => {
    const items = await BillGenerate.validate(orders, { stripUnknown: true })
    mutate('/sales/create', { items, totalAmount })
  }

  if (success) {
    return <SalesData></SalesData>
  }
  const tax = 5
  const taxAmount = (tax / 100) * totalAmount
  const discount = 0.5
  const grandTotal = totalAmount + taxAmount - discount
  return (
    <>
      {orders.length !== 0 && (
        <>
          <ItemContainer className="w-full">
            <div className="flex flex-col w-full">
              <InvoiceLi start="Bill Number" end="123ABC" />
              <InvoiceLi start="SubTotal" end={`$ ` + totalAmount.toFixed(2)} />
              <InvoiceLi
                start={`Tax (${tax + '%'}) `}
                end={taxAmount.toFixed(2)}
              />
              <InvoiceLi start="Discount" end={discount} />
              <InvoiceLi
                start="Total:"
                end={`$ ` + grandTotal.toFixed(2)}
                bold
              />
            </div>
          </ItemContainer>
          <Center>
            <Button
              onClick={handleClick}
              className="ms-3"
              classType="secondary"
            >
              Generate Bill
            </Button>
          </Center>
        </>
      )}
    </>
  )
}

export default Invoice
