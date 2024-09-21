import { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Success } from '@/components/ui'
import { CurrentOrder, Invoice } from '@/components'
import { PosBaseMemo } from '@/components/products'
import { ApiItem, SortOption } from '@/utils/types'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { BillGenerate } from '@/schema'
import { addToOrders, clearOrder } from '@/redux/order'
import { createInvoiceList, createInvoiceValues } from '@/utils/helpers'
import { SALE_INVOICE_NAMES } from '@/config/constants'
import { useAddSale } from '@/hooks/useSale'

function Pos() {
  const [sort, setSort] = useState<SortOption>({ option: 'most-saled' })
  const orders = useAppSelector((state) => state.order.orders)
  const discount = useAppSelector((state) => state.order.discount)
  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.Price, 0),
    [orders]
  )
  const [isOpen, setisOpen] = useState(false)
  const { handleMutate, success, fetching, data, clearState } = useAddSale()
  const dispatch = useAppDispatch()

  const handleSubmit = async (): Promise<void> => {
    const items = await BillGenerate.validate(orders, { stripUnknown: true })
    handleMutate({ items, totalAmount, discount })
  }
  const handleSubmitWrapper = () => {
    handleSubmit().catch(
      () =>
        new Response('Validation Error', {
          status: 400,
          statusText: 'Validation Error',
        })
    )
  }
  const itemClickHandler = (item: ApiItem) => {
    dispatch(addToOrders(item))
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
        <>
          {data?.data && (
            <Success data={createInvoiceList(SALE_INVOICE_NAMES, createInvoiceValues(data.data))} />
          )}
        </>
      </Modal>
      <div className="flex md:p-5 lg:flex-row flex-col transition-all">
        <PosBaseMemo itemClickHandler={itemClickHandler} sort={sort}>
          <div className="flex w-full justify-between ">
            <Button
              onClick={() => setSort({ option: '?sort=none' })}
              className="md:w-32 rounded-sm"
            >
              All
            </Button>
            <Button
              onClick={() => setSort({ option: '?sort=recent' })}
              className="md:w-32 rounded-sm"
            >
              Recent
            </Button>
            <Button
              onClick={() => setSort({ option: 'most-saled' })}
              className="md:w-32  rounded-sm"
            >
              Most
            </Button>
          </div>
        </PosBaseMemo>
        <div className="flex flex-col mt-3 lg:mt-0 lg:w-1/2 lg:ms-4 items-center ">
          <CurrentOrder />
          <Invoice
            btnProps={{
              btnname: 'Generate Bill',
              handleClick: handleSubmitWrapper,
              disabled: orders.length === 0,
            }}
            fetching={fetching}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </>
  )
}

export default Pos
