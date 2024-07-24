import { CardFooter, Typography } from '@material-tailwind/react'
import { Button } from '../button'

type TableFooterProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  isLast?: boolean
  fetching?: boolean
}
function TableFooter({ setPage, page, isLast }: TableFooterProps) {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 dark:border-black p-4">
      <Typography
        variant="small"
        color={'blue-gray'}
        className="font-normal dark:text-dark-text-color"
      >
        {`Page ${page} of 10`}
      </Typography>
      <div className="flex gap-2">
        <Button
          disabled={page == 1}
          onClick={() => {
            setPage((page) => {
              if (page !== 1) return page - 1
              return page
            })
          }}
          variant="outlined"
          size="sm"
        >
          Previous
        </Button>
        <Button
          disabled={isLast}
          onClick={() => {
            if (isLast) {
              return
            }
            setPage((page) => page + 1)
          }}
          variant="outlined"
          size="sm"
        >
          Next
        </Button>
      </div>
    </CardFooter>
  )
}

export default TableFooter
