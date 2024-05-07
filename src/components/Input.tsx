import { InputTypes } from '../utils/types'

type InputProps = {
  type: InputTypes
  label?: string
  className?: string
  placeholder?: string
  onChange?: () => void
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
        className={`p-1 pl-2 border border-solid border-slate-200 rounded-md shadow-sm w-full ${className}`}
        type={type}
      />
    </>
  )
}

export default Input
