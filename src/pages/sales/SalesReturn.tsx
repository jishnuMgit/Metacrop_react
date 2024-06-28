import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import {
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ApiSalesReturn, DynamicTableCol, SortTypes } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useApi } from 'useipa'

const TABLE_HEAD = [
  'Customer',
  'Sales Return ID',
  'Status',
  'Date',
  'Total Items',
  'Total Amount',
  'Action',
]
function SalesReturn() {
  const { fetchData, data } = useApi<{ data?: ApiSalesReturn[] }>()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortTypes>('desc')
  const [limit, setLimit] = useState<number>(10)
  const [sortType, setSortType] = useState<SortTypes>('date')
  useEffect(() => {
    fetchData('/sales/returns')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortType, page, limit])

  return (
    <>
      <Card className="h-full w-full">
        <Header setSortType={setSortType} name="Sales Return" />
        <TableComponent>
          <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
          <TableBody>
            <>
              {data?.data?.map((val, index) => {
                const isLast = index === data?.data!.length - 1
                const classes: string = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'
                const columns: DynamicTableCol = {
                  col1: 'unknown',
                  col2: val.PKReturnID,
                  col3: new Date(val.CreatedOn).toLocaleDateString(),
                  col4: val.Qty,
                  col5: val.SubTotal,
                }
                return <TableRow key={index} {...columns} classes={classes} />
              })}
            </>
          </TableBody>
        </TableComponent>
        <TableFooter setPage={setPage} page={page}></TableFooter>
      </Card>
    </>
  )
}

export default SalesReturn
