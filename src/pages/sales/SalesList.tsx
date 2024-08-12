import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import { TableHeader, TableBody, TableFooter, TableRow } from '@/components/ui/table'
import { links } from '@/config/constants'
import { useSearch } from '@/hooks'
import type { ApiSalesData, DynamicTableCol, SortOrder, SortTypes } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [sort] = useState<SortOrder>('desc')
  const [sortType, setSortType] = useState<SortTypes>('date')
  const [btnName, setbtnName] = useState('view all')
  const { fetchData, data, fetching, error } = useApi<{
    data?: ApiSalesData[]
  }>()
  const [limit, setLimit] = useState<number>(10)
  const [saleData, setSaleData] = useState<ApiSalesData[] | undefined>()
  const navigate = useNavigate()
  const { searchData, handleEnter, handleQuery, resetState } = useSearch<ApiSalesData>('', 'sales/')
  console.log(error, 'err')

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
    fetchData(`/sales?sort=${sort}&sortType=${sortType}&page=${page}&limit=${limit}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortType, sort])

  useEffect(() => {
    if (searchData) {
      setSaleData(searchData)
      resetState()
    }
  }, [searchData])

  useEffect(() => {
    setSaleData(data?.data)
  }, [data])
  return (
    <>
      <Card className="h-full w-auto dark:bg-dark-primary-bg mx-6 mt-6">
        <Header
          btnClick={() => navigate(links.POS)}
          handleEnter={handleEnter}
          handleQuery={handleQuery}
          setSortType={sortHandler}
          viewAll={viewAll}
          name="Sales"
          btnName={btnName}
        />
        <TableComponent className="dark:px-6">
          <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
          <TableBody fetching={fetching}>
            <>
              {saleData?.map((val, index) => {
                // console.log(val, index, 'vaaaaaaaaaaa')

                const isLast = index === saleData.length - 1
                const classes: string = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                const columns: DynamicTableCol = {
                  col1: { value: 'unknown' },
                  col2: { value: val.PKSaleID },
                  col3: { value: new Date(val.CreatedOn).toLocaleDateString() },
                  col4: { value: val.SoldItems.length },
                  col5: { value: val.TotalAmount, prefix: '$' },
                }
                return (
                  <TableRow
                    status={{
                      text: 'paid',
                      color: 'green',
                      index: 3,
                      classes: 'dark:text-[rgb(33,234,48)]',
                    }}
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
            fetching={fetching}
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
