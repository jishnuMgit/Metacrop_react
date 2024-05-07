import { baseImgUrl } from '../../config/constants'
import { useAppDispatch } from '../../config/hooks'
import { ProductType } from '../../db'
import { decrement, increment } from '../../redux/order'
import SmallBtn from '../SmallBtn'

type OrderItemProps = {
  item: ProductType
}
function OrderItem({ item }: OrderItemProps) {
  const dispatch = useAppDispatch()
  return (
    <div>
      <div className="flex mb-7">
        <div className="flex  w-1/2">
          <div className="flex w-1/2">
            <img
              className="h-10"
              src={`${baseImgUrl}${item.imageSrc}`}
              alt="l"
            />
          </div>
          {item.name}
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div className="flex items-center justify-items-center">
            <SmallBtn
              children={'-'}
              onClick={() => {
                dispatch(decrement(item.id))
              }}
            />
            <p className="mx-4"> {item.qty}</p>
            <SmallBtn
              children={'+'}
              onClick={() => dispatch(increment(item.id))}
            />
          </div>
          <div className="flex justify-end w-full">
            <p>{`$${item.price * item.qty}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
