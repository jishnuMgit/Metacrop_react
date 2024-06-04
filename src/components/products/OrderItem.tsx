import { useEffect, useRef } from 'react'
import { useAppDispatch } from '@/config/hooks'
import { ProductType } from '@/db'
import { decrement, increment } from '@/redux/order'
import { SmallBtn } from '@/components/ui'
import milkImg from '@/assets/images/milk.png'
type OrderItemProps = {
  item: ProductType
}

function OrderItem({ item }: OrderItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  console.log(item.Price)

  useEffect(() => {
    itemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [item])
  const dispatch = useAppDispatch()
  return (
    <div ref={itemRef}>
      <div className="flex mb-4">
        <div className="flex w-1/2 items-center ">
          <div className="flex w-1/3">
            <img className="h-8" src={`${milkImg}`} alt="l" />
          </div>
          <p className="text-base md:font-bold font-semibold">
            {item.ItemName}
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div className="flex items-center justify-items-center">
            <SmallBtn
              className="bg-[#f3f4f5]"
              onClick={() => {
                dispatch(decrement(item.PKItemID))
              }}
            >
              <p className="text-[30px] leading-[32px]">-</p>
            </SmallBtn>
            <p className="mx-3 "> {item.qty}</p>
            <SmallBtn
              className="bg-[#f3f4f5]"
              onClick={() => dispatch(increment(item.PKItemID))}
            >
              <span className="text-[30px] leading-[26px]  ">+</span>
            </SmallBtn>
          </div>
          <div className="flex justify-end w-full">
            <p className="font-semibold">{`$${(item.Price * item.qty).toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
