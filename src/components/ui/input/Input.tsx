import { InputProps } from '@/utils/types'

function Input({
  label,
  type,
  value = '',
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
        value={value}
        type={type}
      />
    </>
  )
}

export default Input
