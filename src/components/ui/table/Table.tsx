import { CardBody, Typography } from '@material-tailwind/react'

function SortableTable({
  children,
  heading,
}: {
  children: React.ReactNode
  className?: string
  heading?: string
}) {
  return (
    <>
      <CardBody className="overflow-x-auto px-0">
        {heading && (
          <Typography variant="h5" color="blue-gray">
            {heading}
          </Typography>
        )}
        <table className="mt-4 w-full min-w-max table-auto text-left border">
          {children}
        </table>
      </CardBody>
    </>
  )
}
export default SortableTable
