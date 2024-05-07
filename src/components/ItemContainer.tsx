import React from 'react'

type ItemContainerProps = {
  children: React.JSX.Element
  className?: string
}
function ItemContainer({ children, className }: ItemContainerProps) {
  return (
    <div
      className={`flex flex-col  bg-white m-3 border rounded-lg shadow-gray-500 shadow-md border-blue-400 p-5 h-96 overflow-y-auto  ${className ? className : 'w-1/2'}`}
    >
      {children}
    </div>
  )
}

export default ItemContainer
