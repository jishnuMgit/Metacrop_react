import { InputProps } from '@/utils/types'

function Input({
  label,
  type,
  name,
  value,
  placeholder,
  className = '',
  onChange,
  onKeyUp,
}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        className={`p-1 pl-2 ${className}`}
        value={value}
        type={type}
        name={name}
      />
    </>
  )
}

export default Input
