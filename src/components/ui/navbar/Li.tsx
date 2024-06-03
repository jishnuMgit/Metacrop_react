import { paths } from '@/config/constants'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type LiProps = {
  children: React.JSX.Element | string
  link?: (typeof paths)[keyof typeof paths]
  active?: boolean
}
function Li({ children, active = false, link = '#link' }: LiProps) {
  const location = useLocation().pathname
  if (location === '/') {
    active = typeof children === 'string' && children.toLowerCase() === 'home'
  } else {
    active =
      location.split('/')[1] ===
      (typeof children === 'string' && children.toLowerCase())
  }

  return (
    <>
      <Link
        to={link}
        className={`block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${!active ? 'text-lg text-[#747474]' : 'text-black text text-xl'} `}
      >
        {children}
      </Link>
    </>
  )
}

export default Li
