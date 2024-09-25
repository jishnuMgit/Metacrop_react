import { Button, ItemContainer } from '@/components/ui'
import OrderItem from './OrderItem'
import { decrement, editPrice, increment, removeFrmOrders } from '@/redux/order'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { clearOrder } from '@/redux/order'

function CurrentOrder() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.order.orders)
  const handleDelItem = (id: unknown) => {
    dispatch(removeFrmOrders(id as number))
  }

  const handleClear = () => {
    dispatch(clearOrder())
  }

  const minusBtnHandler = (itemId: unknown) => {
    dispatch(decrement(itemId as number))
  }

  const plusBtnHander = (itemId: unknown) => {
    dispatch(increment(itemId as number))
  }

  return (
    <>
      <ItemContainer className="w-full mb-4">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Current Order</h1>
            <Button
              disabled={orders.length === 0}
              className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
              onClick={handleClear}
            >
              Clear All
            </Button>
          </div>
          <hr className="h-[2px] my-3 bg-[#cec6b4] border-0 " />
          <div className="overflow-y-auto max-h-96 pe-3">
            {orders.map((val) => (
              <OrderItem
                itemPriceInput={{
                  onChange: (e) => {
                    dispatch(
                      editPrice({ PKItemID: val.PKItemID, customPrice: Number(e.target.value) })
                    )
                  },
                }}
                delBtnHandler={handleDelItem}
                minusBtn={minusBtnHandler}
                plusBtn={plusBtnHander}
                item={{ ...val, id: val.PKItemID }}
                key={val.PKItemID}
              />
            ))}
          </div>
        </div>
      </ItemContainer>
    </>
  )
}

export default CurrentOrder
