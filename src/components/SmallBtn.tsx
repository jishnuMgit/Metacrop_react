import React from 'react'

type SmallBtnProps = {
  children: React.JSX.Element | string
  className?: string
}

function SmallBtn({ children, className }: SmallBtnProps) {
  return (
    <button
      className={`${className && className} bg-cyan-600 w-6 rounded-sm text-white text-center`}
      type="button"
    >
      {children}
    </button>
  )
}

export default SmallBtn
