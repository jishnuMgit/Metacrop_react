import React from 'react'

type LiProps = {
  children: React.JSX.Element | string
  active?: boolean
}
function Li({ children, active = false }: LiProps) {
  return (
    <>
      <a
        href="#"
        className={`block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${!active ? 'text-xl text-[#747474]' : 'text-black text text-2xl'} `}
      >
        {children}
      </a>
    </>
  )
}

export default Li
