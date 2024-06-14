import { useEffect, useRef } from 'react'
import { useAppDispatch } from '@/config/hooks'
import { ProductType } from '@/db'
import { decrement, increment } from '@/redux/order'
import { SmallBtn } from '@/components/ui'
import milkImg from '@/assets/images/milk.png'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
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
              className="p-2 px-3"
              onClick={() => {
                dispatch(decrement(item.PKItemID))
              }}
            >
              <MinusIcon strokeWidth={4} className="h-5 w-5" />
            </SmallBtn>
            <p className="mx-3 w-4 "> {item.qty}</p>
            <SmallBtn
              className=" p-2 px-3"
              onClick={() => dispatch(increment(item.PKItemID))}
            >
              <PlusIcon strokeWidth={4} className="h-5 w-5" />
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
