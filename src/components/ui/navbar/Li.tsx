import { links } from '@/config/constants'
import { clsx } from 'clsx'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type LiProps = {
  children: React.JSX.Element | string
  link?: (typeof links)[keyof typeof links]
  active?: boolean
  className?: string
  path?: string
  dropdown?: boolean
}
function Li({ children, active = false, link, className, path, dropdown }: LiProps) {
  const location = useLocation().pathname

  if (location === '/') {
    active = typeof children === 'string' && children.toLowerCase() === 'home'
  } else {
    active =
      location.split('/')[1] === ((typeof children === 'string' && children.toLowerCase()) || path)
  }
  const liClass = clsx(
    !className &&
      `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:hover:text-blue-200 md:p-0`,
    !active && 'text-md text-[#747474] dark:text-dark-text-color',
    active && 'text-black text text-md font-semibold  dark:text-blue-200',
    !!className && className,
    dropdown && location.split('/')[2] === path && 'bg-gray-100 dark:bg-dark-primary-bg'
  )

  return (
    <>
      {link ? (
        <li>
          <Link to={link} className={liClass}>
            {children}
          </Link>
        </li>
      ) : (
        <li className={liClass}>{children}</li>
      )}
    </>
  )
}

export default Li
