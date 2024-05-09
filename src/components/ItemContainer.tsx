import React from 'react'

type ItemContainerProps = {
  children: React.JSX.Element
  className?: string
}

function ItemContainer({ children, className }: ItemContainerProps) {
  return (
    <div
      className={`flex flex-col  bg-[#ece9df] m-3 border-2 rounded-lg shadow-xl shadow-slate-200 border-[#b4cee3] p-5 max-h-[30rem] overflow-y-auto  ${className ? className : 'w-1/2'}`}
    >
      {children}
    </div>
  )
}

export default ItemContainer
