import { Header } from '@/components/sales'
import { TableComponent } from '@/components/ui'
import { TableHeader, TableBody, TableFooter, TableRow } from '@/components/ui/table'
import { links } from '@/config/constants'
import { useSearch } from '@/hooks'
import { useGetSales } from '@/hooks/useSale'
import { dateParser } from '@/utils/helpers'
import type { ApiSalesData, DynamicTableCol, SortTypes } from '@/utils/types'
import { Card } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TABLE_HEAD = [
  // 'Customer',
  'Sales ID',
  'customer Name',
  'Status',
  'Date',
  
  
  "Payment Method",
  'Total Items',
  'Total Amount',
  // 'Action',
]

const TABLE_HEADAndChild = [
  // 'Customer',
  'Sales ID',
    'customer Name',
    'Status',
  'Date',
  "Payment Method",
  
  'Items Name',
  'Qty',
  'Net Amt'
  // 'Action',
]
function SalesList() {
     const [filterData, setFilterData] = useState<filterDatatype | null>(null);

  const [btnName, setbtnName] = useState('view all')
  const { data, fetching, page, setSortType, setPage } = useGetSales(filterData)
  const [limit, setLimit] = useState<number>(10)
  const [saleData, setSaleData] = useState<ApiSalesData[] | undefined>()
  const navigate = useNavigate()
  const { searchData, handleEnter, handleQuery, resetState } = useSearch<ApiSalesData>('', 'sales/')

  const viewAll = () => {

    if (limit == -1) {
      setbtnName('view all')
      setLimit(10)
        window.location.reload()
      return 
    }
    setbtnName('view page')
    setLimit(-1)
    setPage(1)
  }

  const sortHandler = (val: SortTypes) => {
    setSortType(val)
  }

 useEffect(() => {
  if (searchData) {
    setSaleData(searchData)
    resetState()
  }
}, [searchData])

type Range={
  value:string
  
label:string
}

type filterDatatype={
range:Range
}

  useEffect(() => {
    setSaleData(data?.data)
  }, [data])

  const handleFilterApply = (data: any) => {
    console.log("Filter received in SaleList:", data);
    setFilterData(data);
    // You can use this to fetch filtered data
  };

  return (
    <>
      <Card className="h-full w-auto dark:bg-dark-primary-bg mx-6 mt-6">
        <Header
          btnClick={() => navigate(links.POS)}
          handleEnter={handleEnter}
          onFilterApply={handleFilterApply} 
          handleQuery={handleQuery}
          setSortType={sortHandler}
          viewAll={viewAll}
          name="Sales"
          btnName={btnName}
        />
        <TableComponent className="dark:px-6">
  <TableHeader TABLE_HEAD={filterData?.range == null ? TABLE_HEAD : TABLE_HEADAndChild} />

  <TableBody fetching={fetching} filterData={filterData}>
    <>
      {saleData?.map((val, index) => {
        const isLast = index === saleData.length - 1;
        const classes: string = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

        const status = {
          text: val?.PaymentMethod === 'credit' ? 'Not paid' : 'paid',
          color: val?.PaymentMethod === 'credit' ? 'red' : 'green',
          index: 3,
          classes:
            val?.PaymentMethod !== 'credit'
              ? 'dark:text-[rgb(33,234,48)]'
              : 'dark:text-[rgb(255,0,0)]',
        };

        let columns: DynamicTableCol;

        if (filterData?.range == null) {
          columns = {
            col1: { value: val.PKSaleID },
            col2: { value: val.customer_master?.Name || 'No Name' },
            col3: { value: dateParser(val.CreatedOn) },
            col4: { value: val?.PaymentMethod },
            col5: { value: val.SoldItems.length },
            col6: { value: val.TotalAmount, prefix: '﷼' },
          };
        } else {
          const item = val.SoldItems[0];
          columns = {
            col1: { value: val.PKSaleID },
            col2: { value: val.customer_master?.Name || 'No Name' },
            col3: { value: dateParser(val.CreatedOn) },
            col4: { value: val?.PaymentMethod },
            col5: { value: filterData.range.label },
            col6: { value: item?.Qty },
            col7: { value: item?.SubTotal, prefix: '﷼' },
          };
        }

        return (
          <TableRow
            key={index}
            {...columns}
            classes={classes}
            status={status}
            action
            click
            link={`/sales/${val.PKSaleID}`}
          />
        );
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
