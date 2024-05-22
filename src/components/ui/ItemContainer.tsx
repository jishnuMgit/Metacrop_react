import React from 'react'

type ItemContainerProps = {
  children: React.JSX.Element
  className?: string
}

function ItemContainer({ children, className }: ItemContainerProps) {
  return (
    <div
      className={`flex flex-col bg-white container-shadow m-3 rounded-[35px] p-5 md:px-7 h-min max-h-[30rem] ${className ? className : 'md:w-1/2'} sm:w-full`}
    >
      {children}
    </div>
  )
}

export default ItemContainer
