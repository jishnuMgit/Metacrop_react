import { InputProps } from '@/utils/types'
import { Input } from '@material-tailwind/react'
import clsx from 'clsx'
import { useField } from 'formik'

type FInputProps = Omit<InputProps, 'onChange' | 'name'> & {
  name: string
}
function FormInput({ label, className = '', ...props }: FInputProps) {
  const [field, meta] = useField(props)
  return (
    <>
      {label && <label htmlFor={props.name}>{label}</label>}
      <Input
        crossOrigin={undefined}
        {...field}
        {...props}
        size="lg"
        className={clsx(' !border-t-blue-gray-200 focus:!border-t-gray-900 ', className)}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
      />
      {meta.touched && meta.error && <div className="text-red-400">{meta.error}</div>}
    </>
  )
}

export default FormInput
