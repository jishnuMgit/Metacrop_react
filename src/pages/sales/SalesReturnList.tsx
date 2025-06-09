import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import { TableBody, TableFooter, TableHeader, TableRow } from '@/components/ui/table'
import { links } from '@/config/constants'
import { useSearch } from '@/hooks'
import { ApiSalesReturn, DynamicTableCol } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { dateParser } from '@/utils/helpers'
import { useGetSalesReturnList } from '@/hooks/useSalesReturn'
import useFetch from '@/hooks/useFetch'
import Env from '@/config/env'

const TABLE_HEAD = [ 'Sales Return ID', 'Date', 'status', 'Total Amount']
 interface Sybolcurr{
    CurrSym:string

  }
function SalesReturnList() {
  const { data, fetching, limit, page, setSortType, setPage } = useGetSalesReturnList()
  const [Cury,setCury]=useState<Sybolcurr>()
  const [saleData, setSaleData] = useState<ApiSalesReturn[] | undefined>()
  const { handleEnter, handleQuery, searchData, resetState } = useSearch<
    ApiSalesReturn | undefined
  >('', 'sales/returns/')

  const navigate = useNavigate()
  const { data: homedatas1 } = useFetch(`${Env.VITE_BASE_URL}/home/getHomeCurrency`);

  useEffect(() => {
    if (homedatas1?.data) {
      setCury(homedatas1.data);
    }
  }, [homedatas1]);
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
          name="Sales Return "
          handleEnter={handleEnter}
          handleQuery={handleQuery}
        />
        <TableComponent className="dark:px-6">
          <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
          <TableBody 
            
          fetching={fetching}>
            <>
              {saleData?.map((val, index) => {
                const isLast = index === saleData?.length - 1
                const classes: string = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                const columns: DynamicTableCol = {
                  // col1: { value: 'unknown' },
                  col2: { value: val.PKReturnID },
                  col3: { value: dateParser(val.createdOn).split(',')[0] },
                  // col4: { value: val.SalesReturnItems?.length },
                  col5: { value: val.totalReturnAmount, prefix: `${Cury?.CurrSym}` },
                }

                return (
                  <TableRow
                 status={{
  text: 'Returned',
  color: 'red',
  index: 3,
  classes: 'font-semibold text-red-600 dark:text-red-400 italic tracking-wide',
}}

                    key={index}
                    {...columns}
                    classes={classes}
                    click
                    link={`/sales/return/${val.PKReturnID}`}
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
