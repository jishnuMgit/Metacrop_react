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
          <div className="fixed right-1 bottom-1 z-50 rounded-full">
            <ArrowUpCircleIcon strokeWidth={0} className="h-10 w-10" />
          </div>
        </a>
      )}
    </>
  )
}

export default UpIcon
