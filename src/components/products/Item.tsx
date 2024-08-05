import { baseImgUrl } from '@/config/constants'
import { ApiItem } from '@/utils/types'
import clsx from 'clsx'
import React from 'react'

type ItemProps = {
  item: ApiItem
  onClick?: () => void
  small?: boolean
  qtyElement?: React.JSX.Element
}

function Item({ item, onClick, small, qtyElement }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className=" p-1 cursor-pointer hover:bg-blue-400 w-full h-full border border-sm dark:border-black py-3"
    >
      <div className="flex flex-col items-center">
        <img
          className={clsx({ 'h-10': !small, 'h-6': small })}
          src={`${baseImgUrl}${item.PKItemID % 5 == 0 ? 'milk.png' : 'groceries.png'}`}
        />
        <p className="text-[#28251f] dark:text-white text-sm">
          {item.ItemName}
        </p>
        {qtyElement ? (
          <>{qtyElement}</>
        ) : (
          <span className="font-semibold">{item.HSNCode}</span>
        )}
      </div>
    </div>
  )
}

export default Item
