// icon:close | CSS Icons https://css.gg/ | Astrit

import { IconProps } from '@/utils/types'
import { useEffect, useState } from 'react'

function IconClose({
  onclick,
  fill = 'white',
  duration,
  ...props
}: IconProps & { fill?: string; duration?: number }) {
  const [hide, setHide] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(false)
    }, duration ?? 0)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {!hide && (
        <div className="top-10 right-10 absolute z-[9] cursor-pointer" onClick={onclick}>
          <svg fill="black" viewBox="0 0 24 24" height="2em" width="2em" {...props}>
            <path
              fill={fill}
              d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
            />
          </svg>
        </div>
      )}
    </>
  )
}

export default IconClose
