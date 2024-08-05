import { Invoice, ProductContainer } from '@/components'
import Item from '@/components/products/Item'
import OrderItem from '@/components/products/OrderItem'
import { PosBaseMemo } from '@/components/products/PosBase'
import { Button, Input, ItemContainer } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import {
  addToReturn,
  clearReturn,
  decrementReturn,
  incrementReturn,
  removeFromReturns,
  ReturnItemType,
} from '@/redux/returnItem'
import { fetchSale } from '@/redux/sale'
import { Typography } from '@material-tailwind/react'
import { useState } from 'react'

function SalesReturn() {
  const dispatch = useAppDispatch()
  const returnItems = useAppSelector((state) => state.returnItem.sales)
  const soldItems = useAppSelector((state) => state.sale.saleData?.SoldItems)

  const [inputVal, setInputVal] = useState('')
  const handleClick = () => {
    if (inputVal !== '') {
      void dispatch(fetchSale(inputVal))
    }
    return
  }
  const handleAddToReturn = (payload: ReturnItemType) => {
    dispatch(addToReturn(payload))
  }
  const handleDelItem = (id: string | number) => {
    dispatch(removeFromReturns(id as number))
  }
  const handleClear = () => {
    dispatch(clearReturn())
  }
  const minusBtnHandler = (itemId: number) => {
    dispatch(decrementReturn(itemId))
  }
  const plusBtnHander = (soldId: number) => {
    dispatch(incrementReturn(soldId))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  return (
    <div className="flex md:p-5 lg:flex-row flex-col transition-all">
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
            <Button className="w-3/12 ms-auto" onClick={handleClick}>
              Search
            </Button>
          </div>
        </div>
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
                    item={{ ...v.item, qty: v.returnQty, id: v.PKSoldItemID }}
                    key={v.PKSoldItemID}
                  />
                ))
              )}
            </div>
          </div>
        </ItemContainer>
        <Invoice />
      </div>
    </div>
  )
}

export default SalesReturn
