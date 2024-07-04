import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
} from '@/components/ui/table'
import type {
  ApiSalesData,
  DynamicTableCol,
  SortOrder,
  SortTypes,
} from '@/utils/types'
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
  const [sort, setSort] = useState<SortOrder>('desc')
  const [sortType, setSortType] = useState<SortTypes>('date')
  const [btnName, setbtnName] = useState('view all')
  const { fetchData, data, fetching } = useApi<{ data?: ApiSalesData[] }>()
  const [limit, setLimit] = useState<number>(10)

  const viewAll = () => {
    if (limit == -1) {
      setbtnName('view all')
      return setLimit(10)
    }
    setbtnName('view page')
    setLimit(-1)
    setPage(1)
  }
  const sortHandler = (val: SortTypes) => {
    setSortType(val)
  }
  useEffect(() => {
    fetchData(
      `/sales?sort=${sort}&sortType=${sortType}&page=${page}&limit=${limit}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortType, sort])
  console.log(data)

  return (
    <>
      <Card className="h-full w-full">
        <Header
          setSortType={sortHandler}
          viewAll={viewAll}
          name="Sales"
          btnName={btnName}
        />
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
                  col2: val.PKSaleID,
                  col3: new Date(val.CreatedOn).toLocaleDateString(),
                  col4: val.SoldItems.length,
                  col5: val.TotalAmount,
                }
                return (
                  <TableRow
                    key={index}
                    {...columns}
                    classes={classes}
                    click
                    action
                  />
                )
              })}
            </>
          </TableBody>
        </TableComponent>
        {limit !== -1 && (
          <TableFooter
            page={page}
            setPage={setPage}
            isLast={data?.data?.length !== limit}
          ></TableFooter>
        )}
      </Card>
    </>
  )
}

export default SalesList
