import { paths } from '@/config/constants'
import { clsx } from 'clsx'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type LiProps = {
  children: React.JSX.Element | string
  link?: (typeof paths)[keyof typeof paths]
  active?: boolean
  className?: string
}
function Li({ children, active = false, link, className }: LiProps) {
  const location = useLocation().pathname

  if (location === '/') {
    active = typeof children === 'string' && children.toLowerCase() === 'home'
  } else {
    active =
      location.split('/')[1] ===
      (typeof children === 'string' && children.toLowerCase())
  }
  const liClass = clsx(
    !className &&
      `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`,
    !active && 'text-lg text-[#747474]',
    active && 'text-black text text-xl',
    !!className && className
  )
  console.log(liClass, active, location)

  return (
    <>
      <div>
        {link ? (
          <Link to={link} className={liClass}>
            {children}
          </Link>
        ) : (
          <li className={liClass}>{children}</li>
        )}
      </div>
    </>
  )
}

export default Li
