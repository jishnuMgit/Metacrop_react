import { useEffect, useMemo, useState } from 'react'
import InvoiceLi from './InvoiceLi'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { BillGenerate } from '@/schema'
import { useApi } from 'useipa'
import { Success, ItemContainer, Center, Button } from '../ui'
import { Modal } from '@/components/ui'
import { clearOrder } from '@/redux/order'

function Invoice() {
  const orders = useAppSelector((state) => state.order.orders)
  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.Price, 0),
    [orders]
  )
  const [isOpen, setisOpen] = useState(false)
  const { mutate, success, error, fetching, clearState } = useApi()
  const dispatch = useAppDispatch()
  const tax = 5
  const taxAmount = (tax / 100) * totalAmount
  const discount = 0.5
  const grandTotal = totalAmount + taxAmount - discount
  const handleClick = async (): Promise<void> => {
    if (orders.length === 0) {
      return
    }

    const items = await BillGenerate.validate(orders, { stripUnknown: true })
    mutate('/sales/create', { items, totalAmount })
  }
  const handleClickWrapper = () => {
    handleClick().catch(
      () =>
        new Response('Validation Error', {
          status: 400,
          statusText: 'Validation Error',
        })
    )
  }
  if (error) {
    console.log(error)

    throw new Response(error.message, {
      status: error?.status,
      statusText: error.message,
    })
  }
  const handleClose = () => {
    setisOpen(false)
    clearState()
    dispatch(clearOrder())
  }
  useEffect(() => {
    if (success) {
      setisOpen(true)
    }
  }, [success])

  return (
    <>
      <Modal handleClose={handleClose} center isOpen={isOpen}>
        <Success />
      </Modal>

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
            <InvoiceLi start="Total:" end={`$ ` + grandTotal.toFixed(2)} bold />
          </div>
        </ItemContainer>
        <Center>
          <Button
            onClick={handleClickWrapper}
            className="ms-3"
            classType="secondary"
            fetching={fetching}
          >
            Generate Bill
          </Button>
        </Center>
      </>
    </>
  )
}

export default Invoice
