import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import { TableBody, TableFooter, TableHeader, TableRow } from '@/components/ui/table'
import { links } from '@/config/constants'
import { useSearch } from '@/hooks'
import { ApiSalesReturnItem, DynamicTableCol, SortOrder, SortTypes } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useApi } from 'useipa'

const TABLE_HEAD = [
  'Item',
  'Sales Return ID',
  'Sale ID',
  'Status',
  'Date',
  'Quantity',
  'Price',
  'Total Amount',
]
/**
 * Sales return List
 * @states
 * @limit - Page limit. howmany items in one page.
 */
function SalesReturnList() {
  const { fetchData, data, fetching } = useApi<{ data?: ApiSalesReturnItem[] }>()
  const [page, setPage] = useState(1)
  const [sort] = useState<SortOrder>('desc')
  const [limit] = useState<number>(10)
  const [sortType, setSortType] = useState<SortTypes>('date')
  const [saleData, setSaleData] = useState<ApiSalesReturnItem[] | undefined>()
  const { handleEnter, handleQuery, searchData, resetState } = useSearch<
    ApiSalesReturnItem | undefined
  >('', 'sales/returns/')

  const navigate = useNavigate()
  useEffect(() => {
    fetchData(`/sales/returns/?sort=${sort}&sortType=${sortType}&page=${page}&limit=${limit}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortType, page, limit])
  console.log(data)
  useEffect(() => {
    if (searchData) {
      setSaleData(searchData)
      resetState()
    }
  }, [searchData, data])

  useEffect(() => {
    if (data) {
      setSaleData(data.data)
      return
    }
  }, [data])

  return (
    <>
      <Card className="h-full w-auto dark:bg-dark-primary-bg mx-6 mt-6">
        <Header
          btnClick={() => navigate(links.ADD_SALES_RETURN)}
          setSortType={setSortType}
          name="Sales Return"
          handleEnter={handleEnter}
          handleQuery={handleQuery}
        />
        <TableComponent className="dark:px-6">
          <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
          <TableBody fetching={fetching}>
            <>
              {saleData?.map((val, index) => {
                const isLast = index === saleData.length - 1
                const classes: string = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                const columns: DynamicTableCol = {
                  col1: { value: val.Item.ItemName },
                  col2: { value: val.FKReturnID },
                  col3: { value: val.FKSaleID },
                  col4: { value: new Date(val.CreatedOn).toLocaleDateString() },
                  col5: { value: val.Qty },
                  col6: { value: val.Price, prefix: '$' },
                  col7: { value: val.SubTotal, prefix: '$' },
                }

                return (
                  <TableRow
                    status={{
                      text: 'returned',
                      color: 'blue-gray',
                      index: 4,
                      classes: 'dark:text-[rgb(136,193,221)]',
                    }}
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
          isLast={data?.data?.length !== limit}
          setPage={setPage}
          page={page}
        ></TableFooter>
      </Card>
    </>
  )
}

export default SalesReturnList
