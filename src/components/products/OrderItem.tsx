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
  }, [item])
  const dispatch = useAppDispatch()
  return (
    <div ref={itemRef}>
      <div className="flex mb-4">
        <div className="flex w-1/2 items-center ">
          <div className="flex w-1/3">
            <img className="h-8" src={`${baseImgUrl}${'milk.png'}`} alt="l" />
          </div>
          <p className="text-base font-bold">{item.name}</p>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div className="flex items-center justify-items-center">
            <SmallBtn
              className="bg-[#f3f4f5]"
              children={<p className="text-[30px] leading-[32px]">-</p>}
              onClick={() => {
                dispatch(decrement(item.id))
              }}
            />
            <p className="mx-3 "> {item.qty}</p>
            <SmallBtn
              className="bg-[#f3f4f5]"
              children={<span className="text-[30px] leading-[26px]  ">+</span>}
              onClick={() => dispatch(increment(item.id))}
            />
          </div>
          <div className="flex justify-end w-full">
            <p className="font-semibold">{`$${(item.price * item.qty).toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
