import { Button, Typography } from '@material-tailwind/react'
import OrderItem from '../products/OrderItem'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import InvoiceList from './InvoiceList'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { fetchSale, removeSoldItem, updateSaleData } from '@/redux/sale'
import { useEffect, useMemo, useState } from 'react'
import { useApi } from 'useipa'
import { ReturnItem, UpdateSale } from '@/schema'
import { AnimatedAlert } from '../ui/Alert'
import { Spinner } from '../ui'

function EditSale() {
  const [alertOpen, setAlertOpen] = useState(false)
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.sale.saleData)
  const { mutate, error, fetching, data: apiData } = useApi<boolean>()
  const total = useMemo(
    () => data?.SoldItems.reduce((acc, val) => acc + val.Qty * val.Price, 0),
    [data]
  )
  const minusBtnHandler = (id: number) => {
    dispatch(updateSaleData({ PKSoldItemID: id, operation: 'DEC' }))
    return
  }
  const plusBtnHandler = (id: number) => {
    dispatch(updateSaleData({ PKSoldItemID: id, operation: 'INC' }))
    return
  }

  const removeItem = (id: string | number) => {
    dispatch(removeSoldItem(id))
  }
  const updateSale = async () => {
    const parsedData = await UpdateSale.validate(data, { stripUnknown: true })
    console.log(parsedData, 'parseddata')

    mutate(`/sales/${data?.PKSaleID}`, parsedData, { method: 'PUT' })
  }

  const wrapperUpdateSale = () => {
    updateSale().catch((e) => console.log(e))
  }

  const returnHandler = async (id: number, qty: number) => {
    const returnItemData = await ReturnItem.validate({
      PKSoldItemID: id,
      returnQty: qty,
    })
    mutate(`/sales/return-item/${data?.PKSaleID}`, returnItemData)
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
      void dispatch(fetchSale(data?.PKSaleID as string))
      setAlertOpen(true)
    }
  }, [apiData])

  return (
    <>
      {data && (
        <div className="flex w-full border-solid border-t-8 pt-5">
          <div className="flex w-3/4 flex-col ">
            {!fetching ? (
              data.SoldItems?.map((val) => (
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
                        onClick={() =>
                          wrapperReturnitem(val.PKSoldItemID, val.Qty)
                        }
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
          <div className="w-1/2">
            <div className=" flex flex-col w-1/2 ms-auto">
              <Typography variant="h6" color="blue-gray">
                {`Update Details`}
              </Typography>

              <div className="mb-5 flex flex-col ">
                {[
                  {
                    name: 'Sale Date',
                    value: new Date(data.CreatedOn).toLocaleDateString(),
                  },
                  {
                    name: 'Modified Date',
                    value: new Date().toLocaleDateString(),
                  },
                  {
                    name: 'Sale Id',
                    value: data.PKSaleID,
                  },
                  {
                    name: 'Total Items',
                    value: data?.SoldItems.length,
                  },
                  {
                    name: 'Total Amount',
                    value: `$` + total,
                  },
                ].map((val, index) => (
                  <InvoiceList
                    key={index}
                    name={val.name}
                    value={val.value}
                  ></InvoiceList>
                ))}
              </div>
            </div>
            <Button
              loading={fetching}
              onClick={wrapperUpdateSale}
              className="dark:bg-white flex items-center gap-3 mt-5 ms-auto"
              size="sm"
            >
              <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
              {`Update Sale`}
            </Button>
          </div>
        </div>
      )}
      <AnimatedAlert open={alertOpen} onClose={() => setAlertOpen(false)}>
        {'Sale Updated successfully'}
      </AnimatedAlert>
    </>
  )
}

export default EditSale
