import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Typography, CardBody } from '@material-tailwind/react'
import TableFooter from './TableFooter'
import TableRow from './TableRow'
import { ApiSalesData, DynamicTableCol } from '@/utils/types'

type TableProps = {
  TABLE_HEAD: string[]
  TABLE_ROWS?: ApiSalesData[]
}

function SortableTable({ TABLE_HEAD, TABLE_ROWS }: TableProps) {
  return (
    <>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map((val, index) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes: string = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'
              const columns: DynamicTableCol = {
                col1: 'unknown',
                col2: val.PKSalesID,
                col3: new Date(val.CreatedOn).toLocaleDateString(),
                col4: val.saled_items.length,
                col5: val.TotalAmount,
              }
              return <TableRow key={index} {...columns} classes={classes} />
            })}
          </tbody>
        </table>
      </CardBody>
      <TableFooter />
    </>
  )
}
export default SortableTable
