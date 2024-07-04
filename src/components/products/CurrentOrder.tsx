import { ItemContainer, Button } from '@/components/ui'
import OrderItem from './OrderItem'
import { decrement, increment } from '@/redux/order'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { clearOrder } from '@/redux/order'

function CurrentOrder() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.order.orders)

  const handleClear = () => {
    dispatch(clearOrder())
  }
  const minusBtnHandler = (itemId: number) => {
    dispatch(decrement(itemId))
  }
  const plusBtnHander = (itemId: number) => {
    dispatch(increment(itemId))
  }

  return (
    <>
      <ItemContainer className="w-full">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Current Order</h1>
            <Button type="button" classType="secondary" onClick={handleClear}>
              Clear All
            </Button>
          </div>
          <hr className="h-[2px] my-3 bg-[#cec6b4] border-0 " />
          <div className="overflow-y-auto max-h-96 pe-3">
            {orders.map((val) => (
              <OrderItem
                minusBtn={minusBtnHandler}
                plusBtn={plusBtnHander}
                item={val}
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
