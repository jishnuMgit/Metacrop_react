import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import {
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ApiSalesReturn,
  DynamicTableCol,
  SortOrder,
  SortTypes,
} from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useApi } from 'useipa'

const TABLE_HEAD = [
  'Item',
  'Sales Return ID',
  'Status',
  'Date',
  'Total Items',
  'Price',
  'Total Amount',
]
function SalesReturn() {
  const { fetchData, data, fetching } = useApi<{ data?: ApiSalesReturn[] }>()
  const [page, setPage] = useState(1)
  const [sort] = useState<SortOrder>('desc')
  const [limit] = useState<number>(10)
  const [sortType, setSortType] = useState<SortTypes>('date')
  useEffect(() => {
    fetchData('/sales/returns')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortType, page, limit])
  console.log(data)

  return (
    <>
      <Card className="h-full w-full">
        <Header setSortType={setSortType} name="Sales Return" />
        <TableComponent>
          <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
          <TableBody fetching={fetching}>
            <>
              {data?.data?.map((val, index) => {
                const isLast = index === data?.data!.length - 1
                const classes: string = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'
                const columns: DynamicTableCol = {
                  col1: { value: val.Item.ItemName },
                  col2: { value: val.PKReturnID },
                  col3: { value: new Date(val.CreatedOn).toLocaleDateString() },
                  col4: { value: val.Qty },
                  col5: { value: val.Price, prefix: '$' },
                  col6: { value: val.SubTotal },
                }

                return (
                  <TableRow
                    status={{ text: 'returned', color: 'blue-gray' }}
                    key={index}
                    {...columns}
                    classes={classes}
                  />
                )
              })}
            </>
          </TableBody>
        </TableComponent>
        <TableFooter
          fetching={fetching}
          setPage={setPage}
          page={page}
        ></TableFooter>
      </Card>
    </>
  )
}

export default SalesReturn
