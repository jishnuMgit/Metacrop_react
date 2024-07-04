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
        <Typography color="blue-gray" className="w-5/12">
          {name}
        </Typography>
        <Typography color="blue-gray" className="w-2/12">
          :
        </Typography>
        <Typography color="blue-gray" className="w-5/12">
          {value}
        </Typography>
      </div>
    </>
  )
}

export default InvoiceList
