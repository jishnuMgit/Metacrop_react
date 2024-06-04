import { InputProps } from '@/utils/types'
import { useField } from 'formik'

type FInputProps = Omit<InputProps, 'onChange' | 'name'> & {
  name: string
}
function FormInput({ label, className = '', ...props }: FInputProps) {
  const [field, meta] = useField(props)
  return (
    <>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        {...field}
        {...props}
        className={`p-1 pl-2 input-shadow ${className}`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-400">{meta.error}</div>
      )}
    </>
  )
}

export default FormInput
