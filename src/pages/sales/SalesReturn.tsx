import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import {
  TableBody,
  TableFooter,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ApiSalesReturn, DynamicTableCol } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect } from 'react'
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

  useEffect(() => {
    fetchData('/sales/returns')
  }, [])
  console.log(data)

  return (
    <>
      <Card className="h-full w-full">
        <Header name="Sales Return" />
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
          <TableFooter></TableFooter>
        </TableComponent>
      </Card>
    </>
  )
}

export default SalesReturn
