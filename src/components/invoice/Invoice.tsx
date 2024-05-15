import { useMemo } from 'react'
import ItemContainer from '../ItemContainer'
import InvoiceLi from './InvoiceLi'
import { useAppSelector } from '../../config/hooks'
import Center from '../Center'
import Button from '../Button'

function Invoice() {
  const orders = useAppSelector((state) => state.order.orders)
  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.price, 0),
    [orders]
  )
  return (
    <>
      {orders.length !== 0 && (
        <>
          <ItemContainer className="w-full">
            <div className="flex flex-col w-full">
              <InvoiceLi start="Bill Number" end="123ABC" />
              <InvoiceLi start="SubTotal" end="100" />
              <InvoiceLi start="Discount" end="0" />
              <InvoiceLi start="Tax" end="0%" />
              <InvoiceLi
                start="Total:"
                end={`$ ` + totalAmount.toFixed(2)}
                bold
              />
            </div>
          </ItemContainer>
          <Center>
            <Button className="ms-3" classType="secondary">
              Generate Bill
            </Button>
          </Center>
        </>
      )}
    </>
  )
}

export default Invoice
