import React from 'react'
import { ButtonTypes } from '@/utils/types'
import { btnStyles } from '@/config/constants'

type ButtonProps = {
  children: React.JSX.Element | string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  classType?: keyof typeof btnStyles
  className?: string
  type?: ButtonTypes
}

function Button({
  className,
  children,
  type = 'button',
  classType = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        className={`${className} ${btnStyles[classType]} w-32 p-2`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
