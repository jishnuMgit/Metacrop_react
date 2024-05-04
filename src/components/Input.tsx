import { InputTypes } from '../utils/types'

type InputProps = {
  label?: string
  type: InputTypes
  placeholder?: string
}
function Input({ label, type, placeholder }: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="p-1 pl-2 mb-3 border border-solid border-slate-200 rounded-md shadow-sm w-full"
        type={type}
      />
    </>
  )
}

export default Input
