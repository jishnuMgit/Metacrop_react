import React from 'react'

type SmallBtnProps = {
  children: React.JSX.Element | string
  onClick: () => void
  className?: string
}

function SmallBtn({ children, className, onClick }: SmallBtnProps) {
  return (
    <button
      className={`${className && className}  p-1 w-10  rounded-md text-[#4e483b[] text-center hover:bg-cyan-700`}
      type="button"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default SmallBtn
