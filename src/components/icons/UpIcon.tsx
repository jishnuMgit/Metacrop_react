import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
function UpIcon() {
  const [show, setShow] = useState<boolean>(false)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 1000) {
      setShow(true)
    } else {
      setShow(false)
    }
  })
  return (
    <>
      {show && (
        <a href="#">
          <div className="fixed right-1 bottom-1 z-50 rounded-full bg-contain">
            <ArrowUpCircleIcon
              strokeWidth={0}
              className="h-10 w-10 dark:text-dark-btn-color text-white"
            />
          </div>
          <div className="fixed right-3 bottom-3 bg-white h-5 w-5 rounded-full"></div>
        </a>
      )}
    </>
  )
}

export default UpIcon
