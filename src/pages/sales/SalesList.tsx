import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
} from '@/components/ui/table'
import { ApiSalesData, DynamicTableCol } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useApi } from 'useipa'

const TABLE_HEAD = [
  'Customer',
  'Sales ID',
  'Status',
  'Date',
  'Total Items',
  'Total Amount',
  'Action',
]

function SalesList() {
  const [page, setPage] = useState(1)
  const { fetchData, data, fetching } = useApi<{ data?: ApiSalesData[] }>()
  const [limit, setLimit] = useState<number>(10)
  const viewAll = () => {
    setLimit(-1)
    setPage(1)
  }
  useEffect(() => {
    fetchData(`/sales?sort=desc&page=${page}&limit=${limit}`)
  }, [page, limit])
  console.log(data)

  return (
    <>
      <Card className="h-full w-full">
        <Header viewAll={viewAll} name="Sales" />
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
                  col1: 'unknown',
                  col2: val.PKSalesID,
                  col3: new Date(val.CreatedOn).toLocaleDateString(),
                  col4: val.saled_items.length,
                  col5: val.TotalAmount,
                }
                return <TableRow key={index} {...columns} classes={classes} />
              })}
            </>
          </TableBody>
        </TableComponent>
        {limit !== -1 && <TableFooter setPage={setPage}></TableFooter>}
      </Card>
    </>
  )
}

export default SalesList
