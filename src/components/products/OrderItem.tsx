import { useEffect, useRef } from 'react'
import { baseImgUrl } from '../../config/constants'
import { useAppDispatch } from '../../config/hooks'
import { ProductType } from '../../db'
import { decrement, increment } from '../../redux/order'
import SmallBtn from '../SmallBtn'

type OrderItemProps = {
  item: ProductType
}

function OrderItem({ item }: OrderItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    itemRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
    console.log('jjhjg')
  }, [item])
  const dispatch = useAppDispatch()
  return (
    <div ref={itemRef}>
      <div className="flex mb-1 border-b shadow-sm">
        <div className="flex w-1/2 items-center ">
          <div className="flex w-1/2">
            <img
              className="h-8"
              src={`${baseImgUrl}${item.imageSrc}`}
              alt="l"
            />
          </div>
          {item.name}
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div className="flex items-center justify-items-center">
            <SmallBtn
              children={<p className="text-xs">-</p>}
              onClick={() => {
                dispatch(decrement(item.id))
              }}
            />
            <p className="mx-3"> {item.qty}</p>
            <SmallBtn
              children={<p className="text-xs">+</p>}
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
