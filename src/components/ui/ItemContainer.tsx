import { clsx } from 'clsx'
import React from 'react'

type ItemContainerProps = {
  children: React.JSX.Element
  className?: string
}

function ItemContainer({ children, className }: ItemContainerProps) {
  return (
    <div
      className={clsx(
        `flex flex-col bg-white rounded-sm p-5 lg:px-7 h-min max-h-[30rem] dark:bg-dark-primary-bg`,
        className,
        { 'lg:w-1/2': !className },
        'sm:w-full'
      )}
    >
      {children}
    </div>
  )
}

export default ItemContainer
