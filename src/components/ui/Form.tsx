import { clsx } from 'clsx'
import type React from 'react'

type FormProps = {
  children: React.JSX.Element
  className?: string
  onSubmit?: () => void
}
function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={clsx(className)}>
      {/* {fetching && <Loader />} */}
      {children}
    </form>
  )
}

export default Form
