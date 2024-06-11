import React from 'react'
import { ButtonTypes } from '@/utils/types'
import { btnStyles } from '@/config/constants'
import { Spinner } from '..'
import clsx from 'clsx'

type ButtonProps = {
  children: React.JSX.Element | string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  classType?: keyof typeof btnStyles
  className?: string
  type?: ButtonTypes
  fetching?: boolean
}

function Button({
  className,
  children,
  type = 'button',
  classType = 'primary',
  onClick,
  fetching,
}: ButtonProps) {
  return (
    <>
      <button
        className={clsx(`${className} ${btnStyles[classType]} w-32`, {
          'p-2': !fetching,
          'p-1': fetching,
        })}
        type={type}
        onClick={onClick}
        disabled={fetching}
      >
        {fetching ? <Spinner small /> : <>{children}</>}
      </button>
    </>
  )
}

export default Button
