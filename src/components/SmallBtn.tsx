import React from 'react'

type SmallBtnProps = {
  children: React.JSX.Element | string
  onClick: () => void
  className?: string
}

function SmallBtn({ children, className, onClick }: SmallBtnProps) {
  return (
    <button
      className={`${className && className} bg-cyan-600 p-1 w-6 h-fit rounded-full text-white text-center hover:bg-cyan-700`}
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default SmallBtn
