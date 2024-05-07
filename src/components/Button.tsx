import React from 'react'
import { ButtonTypes } from '../utils/types'

type ButtonProps = {
  children: React.JSX.Element | string
  onClick?: () => void
  className?: string
  type?: ButtonTypes
}

function Button({
  className,
  children,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        className={`${className} bg-blue-400 hover:bg-blue-600 w-32 text-white p-2 rounded-md hover:bg-hover-color`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
