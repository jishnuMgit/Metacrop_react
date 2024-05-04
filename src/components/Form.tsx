import type React from 'react'

type FormProps = {
  children: React.JSX.Element
  classname?: string
}
function Form({ children }: FormProps) {
  return (
    <form
      className={`relative ${'z-0 md:w-8/12 w-10/12 mx-auto border border-slate-100 rounded-md shadow-sm p-7 bg-white'} `}
    >
      {/* {fetching && <Loader />} */}
      {children}
    </form>
  )
}

export default Form
