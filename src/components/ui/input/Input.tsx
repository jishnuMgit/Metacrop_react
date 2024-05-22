import { ChangeEvent } from 'react'
import { InputTypes } from '@/utils/types'

type InputProps = {
  type: InputTypes
  label?: string
  className?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
function Input({
  label,
  type,
  placeholder,
  className = '',
  onChange,
}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className={`p-1 pl-2 input-shadow ${className}`}
        type={type}
      />
    </>
  )
}

export default Input
