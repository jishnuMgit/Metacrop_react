import { Invoice, ProductContainer } from '@/components'
import Item from '@/components/products/Item'
import OrderItem from '@/components/products/OrderItem'
import { PosBaseMemo } from '@/components/products/PosBase'
import {
  Button,
  ErrorText,
  Input,
  ItemContainer,
  Modal,
  Success,
} from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import {
  addToReturn,
  clearReturn,
  decrementReturn,
  incrementReturn,
  PayloadIDs,
  removeFromReturns,
  ReturnItemType,
} from '@/redux/returnItem'
import { clearSaleState, fetchSale } from '@/redux/sale'
import { ReturnItemSchema } from '@/schema'
import { Typography } from '@material-tailwind/react'
import { useEffect, useMemo, useState } from 'react'
import { useApi } from 'useipa'

function SalesReturn() {
  const [inputVal, setInputVal] = useState('')
  const [modal, setModal] = useState(false)
  const { mutate, fetching, success } = useApi()
  const dispatch = useAppDispatch()
  const returnItems = useAppSelector((state) => state.returnItem.sales)
  const soldItems = useAppSelector((state) => state.sale.saleData?.SoldItems)
  const saleError = useAppSelector((state) => state.sale.error)
  const totalAmount = useMemo(
    () =>
      returnItems.reduce(
        (acc, sale) =>
          acc + sale.items.reduce((a, i) => a + i.returnQty! * i.item.Price, 0),
        0
      ),
    [returnItems]
  )

  const handleSubmit = () => {
    ;(async () => {
      const returnData = await ReturnItemSchema.validate(returnItems, {
        stripUnknown: true,
      })
      mutate('/sales/return-items', returnData)
      console.table(returnData)
    })().catch((err) => console.log(err))
  }
  const handleSearch = () => {
    if (inputVal !== '') {
      void dispatch(fetchSale(inputVal))
    }
    return
  }
  const handleAddToReturn = (payload: ReturnItemType) => {
    dispatch(addToReturn(payload))
  }
  const handleDelItem = (id: unknown) => {
    dispatch(removeFromReturns(id as PayloadIDs))
  }
  const handleClear = () => {
    dispatch(clearReturn())
  }
  const minusBtnHandler = (ids: unknown) => {
    dispatch(decrementReturn(ids as PayloadIDs))
  }
  const plusBtnHander = (ids: unknown) => {
    dispatch(incrementReturn(ids as PayloadIDs))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }
  useEffect(() => {
    if (success) {
      dispatch(clearReturn())
      dispatch(clearSaleState())
      setModal(true)
      setInputVal('')
    }
  }, [success])

  return (
    <div className="flex md:p-5 lg:flex-row flex-col transition-all">
      <Modal isOpen={modal} handleClose={() => setModal(false)}>
        <Success></Success>
      </Modal>
      <PosBaseMemo className="max-h-none">
        <div className="flex flex-col w-full mb-5">
          <Typography variant="h3" className="mb-3">
            Add Sales Return
          </Typography>
          <div className="flex">
            <Input
              value={inputVal}
              placeholder="Search Invoice"
              type="text"
              className=" indent-7 mb-0 w-8/12 h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0] dark:placeholder:text-dark-text-color dark:bg-black dark:border-none dark:focus-visible:outline-none"
              onChange={handleChange}
            />
            <Button className="w-3/12 ms-auto" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <> {saleError && <ErrorText message={saleError.message} />}</>
        <>
          {soldItems && (
            <ProductContainer>
              <>
                {soldItems?.map((val, i) => (
                  <Item
                    onClick={() =>
                      handleAddToReturn({
                        saleId: val.FKSaleID,
                        PKSoldItemID: val.PKSoldItemID,
                        item: { ...val, ItemName: val.Item.ItemName },
                      })
                    }
                    qtyElement={
                      <>
                        <span>Total Qty : {val.Qty}</span>
                      </>
                    }
                    item={val.Item}
                    key={i}
                  />
                ))}
              </>
            </ProductContainer>
          )}
        </>
      </PosBaseMemo>
      <div className="flex flex-col mt-3 lg:mt-0 lg:w-1/2 lg:ms-4 items-center ">
        <ItemContainer className="w-full mb-4">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Return Items</h1>
              <Button
                disabled={returnItems.length === 0}
                className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
                onClick={handleClear}
              >
                Clear All
              </Button>
            </div>
            <hr className="h-[2px] my-3 bg-[#cec6b4] border-0 " />
            <div className="overflow-y-auto max-h-96 pe-3">
              {returnItems.map((val) =>
                val.items.map((v) => (
                  <OrderItem
                    delBtnHandler={handleDelItem}
                    minusBtn={minusBtnHandler}
                    plusBtn={plusBtnHander}
                    item={{
                      Price: v.item.Price,
                      ItemName: v.item.ItemName,
                      qty: v.returnQty,
                      id: {
                        soldItemId: v.PKSoldItemID,
                        saleId: v.item.FKSaleID,
                      },
                    }}
                    key={v.PKSoldItemID}
                  />
                ))
              )}
            </div>
          </div>
        </ItemContainer>
        <Invoice
          btnProps={{
            btnname: 'Return Sales',
            handleClick: handleSubmit,
            disabled: returnItems.length === 0,
          }}
          fetching={fetching}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  )
}

export default SalesReturn
