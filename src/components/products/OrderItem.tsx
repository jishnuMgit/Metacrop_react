import { useEffect, useRef } from 'react'
import { SmallBtn } from '@/components/ui'
import milkImg from '@/assets/images/milk.png'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { ApiItem } from '@/utils/types'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { InputNumber } from '../ui/input'
import { InputNumberProps } from '../ui/input/InputNumber'

type OrderItemProps = {
  item: Partial<ApiItem>
  minusBtn: (id: unknown) => void
  plusBtn: (id: unknown) => void
  delBtnHandler: (id: unknown) => void
  className?: string
  fetching?: boolean
  btn?: boolean
  itemPriceInput?: InputNumberProps
}

function OrderItem({
  item,
  minusBtn,
  plusBtn,
  delBtnHandler,
  className,
  itemPriceInput,
}: OrderItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  console.log(item.Price)

  useEffect(() => {
    itemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [item])
  return (
    <div ref={itemRef} className={clsx('flex mb-4 w-96 lg:w-auto', className)}>
      <div className="flex w-1/2 items-center">
        <div className="flex w-2/12">
          <img className="h-8" src={`${milkImg}`} alt="l" />
        </div>
        <p className="w-7/12 text-base md:font-bold font-semibold">{item.ItemName}</p>
        <div className="w-2/12 flex">
          {'$ '}
          <InputNumber {...itemPriceInput} value={item.Price} className="w-full" />
        </div>
      </div>
      <div className="flex items-center md:justify-center w-1/2">
        <div className="flex items-center justify-items-center">
          <SmallBtn className="p-2 px-3" onClick={() => minusBtn(item.id)}>
            <MinusIcon strokeWidth={4} className="h-5 w-5" />
          </SmallBtn>
          <p className="mx-3 w-4 "> {item.qty}</p>
          <SmallBtn className=" p-2 px-3" onClick={() => plusBtn(item.id)}>
            <PlusIcon strokeWidth={4} className="h-5 w-5" />
          </SmallBtn>
        </div>
        <div className="flex justify-end items-center w-full">
          <p className="font-semibold">{`$${(item.Price! * item.qty!).toFixed(2)}`}</p>
          <div title="Remove Item" className="w-1/3 flex justify-end items-center ">
            <MinusCircleIcon
              onClick={() => delBtnHandler(item.id)}
              className="cursor-pointer hover:fill-red-400 hover:stroke-white"
              color="red"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
