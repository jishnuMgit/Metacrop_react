import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import { ApiSalesData } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect } from 'react'
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
  const { fetchData, data } = useApi<{ data?: ApiSalesData[] }>()

  useEffect(() => {
    fetchData('/sales?sort=desc')
  }, [])

  return (
    <>
      <Card className="h-full w-full">
        <Header />
        <TableComponent
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={data?.data}
        ></TableComponent>
      </Card>
    </>
  )
}

export default SalesList
