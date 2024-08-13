import { Typography } from '@material-tailwind/react'
import OrderItem from '../products/OrderItem'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import InvoiceList from './InvoiceList'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { fetchSale, removeSoldItem, updateSaleData } from '@/redux/sale'
import { useEffect, useMemo, useState } from 'react'
import { useApi } from 'useipa'
import { SalesReturnSchema, UpdateSale } from '@/schema'
import { AnimatedAlert } from '../ui/Alert'
import { Button, Spinner } from '../ui'
import { createInvoiceList } from '@/utils/helpers'

function EditSale() {
  const [alertOpen, setAlertOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { saleData, touched } = useAppSelector((state) => state.sale)
  const { mutate, error, fetching, data: apiData } = useApi<boolean>()
  const total = useMemo(
    () => saleData?.SoldItems.reduce((acc, val) => acc + val.Qty * val.Price, 0),
    [saleData]
  )
  const minusBtnHandler = (id: number) => {
    dispatch(updateSaleData({ id, operation: 'DEC' }))
    return
  }
  const plusBtnHandler = (id: number) => {
    dispatch(updateSaleData({ id, operation: 'INC' }))
    return
  }

  const removeItem = (id: unknown) => {
    dispatch(removeSoldItem(id as number))
  }
  const updateSale = async () => {
    const parsedData = await UpdateSale.validate(saleData, {
      stripUnknown: true,
    })
    console.log(parsedData, 'parseddata')

    mutate(`/sales/${saleData?.PKSaleID}`, parsedData, { method: 'PUT' })
  }

  const wrapperUpdateSale = () => {
    updateSale().catch((e) => console.log(e))
  }

  const returnHandler = async (id: number, qty: number) => {
    const returnItemData = await SalesReturnSchema.validate({
      sales: [
        {
          saleId: saleData?.PKSaleID,
          items: [{ PKSoldItemID: id, returnQty: qty }],
        },
      ],
    })
    mutate(`/sales/return-items`, returnItemData)
  }
  const wrapperReturnitem = (id: number, qty: number) => {
    returnHandler(id, qty).catch((e) => console.log(e))
  }
  if (error) {
    throw new Response(error.message, {
      status: error?.status,
      statusText: error.message,
    })
  }
  useEffect(() => {
    if (apiData) {
      void dispatch(fetchSale(saleData?.PKSaleID as string))
      setAlertOpen(true)
    }
  }, [apiData])

  return (
    <>
      {saleData && (
        <div className="flex flex-col md:flex-row w-full border-solid border-t-8 pt-5 ">
          <div className="flex w-full overflow-auto md:w-3/4 flex-col ">
            {!fetching ? (
              saleData.SoldItems?.map((val) => (
                <div key={val.PKSoldItemID}>
                  {val.Qty !== 0 && (
                    <div className="flex ">
                      <div className="flex flex-col w-11/12">
                        <OrderItem
                          delBtnHandler={removeItem}
                          minusBtn={() => minusBtnHandler(val.PKSoldItemID)}
                          plusBtn={() => plusBtnHandler(val.PKSoldItemID)}
                          item={{
                            PKItemID: val.FKItemID,
                            qty: val.Qty,
                            ItemName: val.Item.ItemName,
                            Price: val.Price,
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => wrapperReturnitem(val.PKSoldItemID, val.Qty)}
                        size="sm"
                        className="h-10 ml-5"
                      >
                        Return
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <div className="w-full md:w-1/2">
            <div className=" flex flex-col md:w-8/12 ms-auto">
              <Typography variant="h6" color="blue-gray" className="dark:text-blue-200">
                {`Update Details`}
              </Typography>

              <div className="mb-5 flex flex-col">
                {createInvoiceList({ ...saleData, TotalAmount: total! }).map((val, index) => (
                  <InvoiceList key={index} name={val.name} value={val.value}></InvoiceList>
                ))}
              </div>
            </div>
            <Button
              disabled={!touched}
              loading={fetching}
              onClick={wrapperUpdateSale}
              className="flex items-center gap-3 mt-5 ms-auto"
              size="sm"
            >
              <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
              {`Update Sale`}
            </Button>
          </div>
        </div>
      )}
      <AnimatedAlert color="green" open={alertOpen} onClose={() => setAlertOpen(false)}>
        {'Sale Updated successfully'}
      </AnimatedAlert>
    </>
  )
}

export default EditSale
