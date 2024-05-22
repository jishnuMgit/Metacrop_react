import Button from '@/components/ui/button/Button'
import ItemContainer from '@/components/ui/ItemContainer'
import OrderItem from './OrderItem'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { clearOrder } from '@/redux/order'

function CurrentOrder() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.order.orders)

  const handleClear = () => {
    dispatch(clearOrder())
  }

  return (
    <>
      {orders.length !== 0 && (
        <ItemContainer className="w-full secondary-shadow">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Current Order</h1>
              <Button type="button" classType="secondary" onClick={handleClear}>
                Clear All
              </Button>
            </div>
            <hr className="h-[2px] my-3 bg-[#cec6b4] border-0 " />
            <div className="overflow-y-auto max-h-36 pe-3">
              {orders.map((val) => (
                <OrderItem item={val} key={val.id} />
              ))}
            </div>
          </div>
        </ItemContainer>
      )}
    </>
  )
}

export default CurrentOrder
