import clsx from 'clsx'
import React from 'react'

export type InputNumberProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
function InputNumber(props: InputNumberProps) {
  return (
    <input
      type="number"
      {...props}
      className={clsx('bg-transparent dark:focus:bg-black dark:!outline-none', props.className)}
    />
  )
}

export default InputNumber
