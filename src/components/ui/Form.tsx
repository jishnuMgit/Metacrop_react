import { clsx } from 'clsx'
import type React from 'react'

type FormProps = {
  children: React.JSX.Element
  className?: string
  onSubmit?: () => void
}
function Form({ className, children, onSubmit }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        `relative z-0 md:w-8/12 w-10/12 mx-auto border border-slate-100 rounded-md shadow-sm p-7 bg-white`,
        className
      )}
    >
      {/* {fetching && <Loader />} */}
      {children}
    </form>
  )
}

export default Form
