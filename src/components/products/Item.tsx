import { ApiItem } from '@/utils/types'
import clsx from 'clsx'
import React from 'react'
import milkImg from '@/assets/images/milk.png'
import groceryImg from '@/assets/images/groceries.png'

type ItemProps = {
  item: ApiItem
  onClick?: () => void
  isSmall?: boolean
  qtyElement?: React.JSX.Element
}

function Item({ item, onClick, isSmall, qtyElement }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className=" p-1 cursor-pointer hover:bg-blue-400 w-full h-full border border-sm dark:border-black py-3"
    >
      <div className="flex flex-col items-center">
        <img
          alt="img"
          className={clsx({ 'h-10': !isSmall, 'h-6': isSmall })}
          src={`${item.PKItemID % 5 == 0 ? milkImg : groceryImg}`}
        />
        <p className="text-[#28251f] dark:text-white text-sm">{item.ItemName}</p>
        {qtyElement ? <>{qtyElement}</> : <span className="font-semibold">{item.HSNCode}</span>}
      </div>
    </div>
  )
}

export default Item
