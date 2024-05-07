import Button from '../Button'
import ItemContainer from '../ItemContainer'
import OrderItem from './OrderItem'
import { useAppDispatch, useAppSelector } from '../../config/hooks'
import { clearOrder } from '../../redux/order'
import { useMemo } from 'react'

function CurrentOrder() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.order.orders)
  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.price, 0),
    [orders]
  )
  const handleClear = () => {
    dispatch(clearOrder())
  }

  return (
    <>
      {orders.length !== 0 && (
        <ItemContainer>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Current Order</h1>
              <Button type="button" onClick={handleClear}>
                Clear All
              </Button>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {orders.map((val) => (
              <OrderItem item={val} key={val.id} />
            ))}
            <div className="flex justify-end">
              <h1>Total:{totalAmount}</h1>
            </div>
          </div>
        </ItemContainer>
      )}
    </>
  )
}

export default CurrentOrder
