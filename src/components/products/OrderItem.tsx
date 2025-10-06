// import { useEffect, useRef } from 'react'
// import { SmallBtn } from '@/components/ui'
// import milkImg from '@/assets/images/milk.png'
// import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
// import { ApiItem } from '@/utils/types'
// import { MinusCircleIcon } from '@heroicons/react/24/outline'
// import clsx from 'clsx'
// import { InputNumber } from '../ui/input'
// import { InputNumberProps } from '../ui/input/InputNumber'

// type OrderItemProps = {
//   item: Partial<ApiItem>
//   button:string
//   minusBtn: (id: unknown) => void
//   plusBtn: (id: unknown) => void
//   delBtnHandler: (id: unknown) => void
//   className?: string
//   fetching?: boolean
//   btn?: boolean
//   itemPriceInput?: InputNumberProps
// }

// function OrderItem({
//   item,
//   button,
//   minusBtn,
//   plusBtn,
//   delBtnHandler,
//   // className,
//   itemPriceInput,
// }: OrderItemProps) {
//   const itemRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     itemRef.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'nearest',
//     })
//   }, [item])

//   return (
//     <div ref={itemRef} className={clsx('flex mb-4  lg:w-auto')}>
//       <div className="flex  items-center">
//         <div className="flex w-6/12">
//           <img className="h-8" src={`${milkImg}`} alt="l" />
//         </div>
//         <p className="w-7/11 text-base md:font-bold font-semibold">{item.ItemName}</p>
//         <div className="w-2/11 flex lg:mr-10">
//           {'$ '}
//           <InputNumber {...itemPriceInput} value={item.Price}  className="w-full" />
//         </div>
//       </div>
//       <div className="flex items-center md:justify-center w-1/2 ">
//         <div className="flex items-center  justify-items-center">
//           <SmallBtn className="p-2 px-3" onClick={() => minusBtn(item.id)}>
//             <MinusIcon strokeWidth={4} className="h-3 " />
//           </SmallBtn>
//           <p className="mx-3 w-4 "> {item.qty}</p>
//           <SmallBtn className=" p-2 px-3" onClick={() => plusBtn(item.id)}>
//             <PlusIcon strokeWidth={4} className="h-3" />
//           </SmallBtn>
//         </div>
//         <div className="flex justify-end items-center w-full">
//           <p className="font-semibold">{`$${(item.Price! * item.qty!).toFixed(2)}`}</p>

//     <div className="mx-5 flex flex-row items-center">
//   <p className="whitespace-nowrap">{`Tax: ${item.TaxPer}$`}</p>
// </div>

//           <div title="Remove Item" className="w-1/3 flex justify-end items-center ">
//             <MinusCircleIcon
//               onClick={() => delBtnHandler(item.id)}
//               className="cursor-pointer hover:fill-red-400 hover:stroke-white"
//               color="red"
//               width={24}
//               height={24}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderItem



import { useEffect, useRef } from 'react'
import { SmallBtn } from '@/components/ui'
import milkImg from '@/assets/images/milk.png'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { InputNumber } from '../ui/input'
import { InputNumberProps } from '../ui/input/InputNumber'
import { ApiItem } from '@/utils/types'

type OrderItemProps = {
  item: Partial<ApiItem>
  button: string
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

  useEffect(() => {
    itemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [item])

  return (
    <div
      ref={itemRef}
      className={clsx(
        'flex flex-col lg:flex-row items-center justify-between w-full p-4 rounded-md shadow-sm mb-3',
        className
      )}
    >
      {/* Item Details */}
      <div className="flex items-center w-full lg:w-7/12 space-x-4">
        <img className="h-10 w-10 object-contain" src={milkImg} alt="item" />

        <p className="text-sm md:text-base font-medium w-3/6 truncate">
          {item.ItemName}
        </p>

        <div className="w-2/6">
          <InputNumber
            {...itemPriceInput}
            value={item.Price}
            className="w-full"
          />
        </div>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-5/12 mt-4 lg:mt-0 space-y-3 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <SmallBtn onClick={() => minusBtn(item.id)}>
            <MinusIcon className="h-4 w-4" />
          </SmallBtn>
          <p className="text-sm font-semibold w-6 text-center">{item.qty}</p>
          <SmallBtn onClick={() => plusBtn(item.id)}>
            <PlusIcon className="h-4 w-4" />
          </SmallBtn>
        </div>

        <div className="text-sm ml-4 font-semibold text-right whitespace-nowrap">
          {`Total: ﷼${(item.Price! * item.qty!).toFixed(2)}`}
        </div>

        <div className="text-md m-5 font-medium text-gray-600 whitespace-nowrap">
          {`Tax: ${(item.TaxPer)} %`}
        </div>

        <div className="flex items-center justify-end">
          <MinusCircleIcon
            onClick={() => delBtnHandler(item.id)}
            className="cursor-pointer hover:fill-red-500 hover:stroke-white"
            color="red"
            width={22}
            height={22}
            title="Remove Item"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderItem
