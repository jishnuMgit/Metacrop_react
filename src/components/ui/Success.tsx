import { useEffect, useState } from 'react'
import Center from './Center'
import tickIcon from '@/assets/images/icon-tick.png'
import clsx from 'clsx'
import InvoiceList, { InvoiceListProps } from '../sales/InvoiceList'

function Success({ data }: { data: InvoiceListProps[] }) {
  const [small, setsmall] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setsmall(true)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Center start={small} className="flex-col h-full ">
      <>
        <div className={clsx(small && 'flex ')}>
          <img
            className={clsx(
              { 'h-32 w-32': !small, 'w-10 h-10 ': small },
              'duration-1000 transition-all '
            )}
            src={tickIcon}
          />
          <div
            className={clsx(
              ` ${small ? 'text-sm my-auto ms-3' : 'text-3xl'} transition-all duration-1000 font-semibold`
            )}
          >
            Success
          </div>
        </div>
        <div
          className={`${small ? 'opacity-1' : 'opacity-0'} w-64 mt-10 transition-opacity duration-1000`}
        >
          {data.map((val, index) => (
            <InvoiceList key={index} name={val.name} value={val.value}></InvoiceList>
          ))}
        </div>
      </>
    </Center>
  )
}

export default Success
