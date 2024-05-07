import React from 'react'

type SmallBtnProps = {
  children: React.JSX.Element | string
  onClick: () => void
  className?: string
}

function SmallBtn({ children, className, onClick }: SmallBtnProps) {
  return (
    <button
      className={`${className && className} bg-cyan-600 w-6 rounded-md text-white text-center`}
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default SmallBtn
