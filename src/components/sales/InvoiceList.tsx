import { Typography } from '@material-tailwind/react'

function InvoiceList({
  name,
  value,
}: {
  name: string
  value?: string | number
}) {
  return (
    <>
      <div className="flex justify-between w-full">
        <Typography color="blue-gray" className="w-5/12 dark:text-white">
          {name}
        </Typography>
        <Typography color="blue-gray" className="w-2/12 dark:text-white">
          :
        </Typography>
        <Typography color="blue-gray" className="w-5/12 dark:text-white">
          {value}
        </Typography>
      </div>
    </>
  )
}

export default InvoiceList
