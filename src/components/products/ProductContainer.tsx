import clsx from 'clsx'
import React from 'react'

type ProductContainerProps = {
  className?: string
  onClick?: () => void
  children: React.JSX.Element
}

function ProductContainer({ className, children }: ProductContainerProps) {
  return (
    <div
      className={clsx(
        'grid grid-flow-row xl:grid-cols-4 grid-cols-3 max-h-[450px] justify-items-center items-center bor overflow-y-auto pe-3 ',
        className
      )}
    >
      <>{children}</>
    </div>
  )
}

export default ProductContainer
