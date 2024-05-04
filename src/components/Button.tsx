import React from 'react'
import { ButtonTypes } from '../utils/types'
type ButtonProps = {
  className?: string
  children: React.JSX.Element | string
  type?: ButtonTypes
}
function Button({ className, children, type = 'button' }: ButtonProps) {
  return (
    <>
      <button
        className={`${className} bg-blue-400 hover:bg-blue-600 w-32 text-white p-2 rounded-md hover:bg-hover-color`}
        type={type}
      >
        {children}
      </button>
    </>
  )
}

export default Button
