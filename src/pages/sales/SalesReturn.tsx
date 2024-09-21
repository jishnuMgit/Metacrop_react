import { useLocation, useParams } from 'react-router-dom'
import { InvoiceList } from '@/components/sales/'
import { Spinner, TableComponent } from '@/components/ui'
import { TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { createInvoiceList, createReturnInvoice } from '@/utils/helpers'
import { DynamicTableCol } from '@/utils/types'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { SALES_RETURN_INVOICE } from '@/config/constants'
import { useGetSalesReturnById } from '@/hooks/useSalesReturn'

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

function Sale() {
  const params = useParams()
  const { search } = useLocation()
  const { response, fetching } = useGetSalesReturnById(params.id)
  const query = new URLSearchParams(search).get('action')
  console.log(query, 'actionnnnnnnnn')

  return (
    <>
      {response ? (
        <>
          <Card className="h-full mx-5 mt-5 dark:bg-dark-primary-bg">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none dark:bg-dark-primary-bg"
            >
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h4" color="blue-gray" className="dark:text-white">
                    {`Sales Return Details`}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    {`See information about this sales return`}
                  </Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="md:w-5/12 w-full ">
                <div>
                  <Typography variant="h6" color="blue-gray" className="dark:text-blue-200">
                    {`Invoice Details`}
                  </Typography>
                </div>
                <div className="mb-5 flex flex-col  ">
                  {createInvoiceList(SALES_RETURN_INVOICE, createReturnInvoice(response.data!)).map(
                    (val, index) => (
                      <InvoiceList key={index} name={val.name} value={val.value}></InvoiceList>
                    )
                  )}
                </div>
              </div>
              {response.data && (
                <>
                  <TableComponent heading="Selected Items For Sales Return">
                    <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
                    <TableBody fetching={fetching}>
                      <>
                        {response?.data?.SalesReturnItems.map((val, index) => {
                          const isLast = index === response.data!.SalesReturnItems.length - 1
                          const classes: string = isLast
                            ? 'p-4'
                            : 'p-4 border-b border-blue-gray-50'
                          const columns: DynamicTableCol = {
                            col1: { value: val.Item.ItemName },
                            col2: { value: val.FKReturnID },
                            col3: { value: val.FKSaleID ?? 'No sale' },
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
                </>
              )}
            </CardBody>
          </Card>
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Sale
