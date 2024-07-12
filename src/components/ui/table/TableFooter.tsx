import { Button, CardFooter, Typography } from '@material-tailwind/react'

type TableFooterProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  isLast?: boolean
  fetching?: boolean
}
function TableFooter({ setPage, page, isLast, fetching }: TableFooterProps) {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        {`Page ${page} of 10`}
      </Typography>
      <div className="flex gap-2">
        <Button
          disabled={fetching}
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
          disabled={fetching}
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
