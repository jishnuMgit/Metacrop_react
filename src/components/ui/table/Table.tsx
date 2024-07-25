import { CardBody, Typography } from '@material-tailwind/react'
import clsx from 'clsx'

function SortableTable({
  children,
  heading,
  className,
}: {
  children: React.ReactNode
  className?: string
  heading?: string
}) {
  return (
    <>
      <CardBody
        className={clsx(
          'overflow-x-auto px-0 dark:bg-dark-primary-bg',
          className
        )}
      >
        {heading && (
          <Typography
            variant="h5"
            color="blue-gray"
            className="dark:text-white"
          >
            {heading}
          </Typography>
        )}
        <table className="mt-4 w-full min-w-max table-auto text-left border dark:border-2 dark:border-black">
          {children}
        </table>
      </CardBody>
    </>
  )
}
export default SortableTable
