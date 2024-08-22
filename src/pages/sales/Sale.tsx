import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { EditSale, InvoiceList } from '@/components/sales/'
import { Button, Spinner, TableComponent } from '@/components/ui'
import { TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { fetchSale } from '@/redux/sale'
import { createInvoiceList, createInvoiceValues } from '@/utils/helpers'
import { DynamicTableCol } from '@/utils/types'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { SALE_INVOICE_NAMES } from '@/config/constants'

const ITEM_HEAD = ['Item Name', 'Item ID', 'Status', 'Price', 'Qty', 'SoldPrice', 'SubTotal']

function Sale() {
  const [edit, setEdit] = useState(false)
  const params = useParams()
  const { search } = useLocation()
  // const { fetchData, data, error, fetching } = useApi<{ data?: ApiSalesData }>()
  const dispatch = useAppDispatch()
  const query = new URLSearchParams(search).get('action')
  console.log(query, 'actionnnnnnnnn')

  const { error, fetching, saleData: data } = useAppSelector((state) => state.sale)
  useEffect(() => {
    void dispatch(fetchSale(params.id!))
  }, [dispatch, params.id])

  if (error) {
    throw new Response('NO sale found', {
      status: 404,
      statusText: 'No sales found given id',
    })
  }

  return (
    <>
      {data ? (
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
                    {`Sale Details`}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    {`See information about this sale`}
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={() => setEdit(!edit)}
                    className="flex items-center gap-3"
                    size="sm"
                  >
                    <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
                    {!edit && query !== 'edit' ? `Edit Sale` : `Cancel`}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="md:w-4/12 w-full ">
                <div>
                  <Typography variant="h6" color="blue-gray" className="dark:text-blue-200">
                    {`Invoice Details`}
                  </Typography>
                </div>
                <div className="mb-5 flex flex-col  ">
                  {createInvoiceList(SALE_INVOICE_NAMES, createInvoiceValues(data)).map(
                    (val, index) => (
                      <InvoiceList key={index} name={val.name} value={val.value}></InvoiceList>
                    )
                  )}
                </div>
              </div>
              {!edit && query !== 'edit' ? (
                <>
                  {!!data.SoldItems.length && (
                    <TableComponent heading="Selected Items For Sales">
                      <TableHeader TABLE_HEAD={ITEM_HEAD}></TableHeader>
                      <TableBody fetching={fetching}>
                        <>
                          {data.SoldItems.map((val, index) => {
                            const isLast = index === data.SoldItems.length - 1
                            const classes: string = isLast
                              ? 'p-4'
                              : 'p-4 border-b border-blue-gray-50'
                            const columns: DynamicTableCol = {
                              col1: { value: val?.Item?.ItemName },
                              col2: { value: val.FKItemID },
                              col3: { value: val.Price, prefix: '$' },
                              col4: { value: val?.oldQty ?? 'err' },
                              col5: { value: val.SoldPrice, prefix: '$' },
                              col6: { value: val.SubTotal, prefix: '$' },
                            }
                            return (
                              <TableRow
                                key={index}
                                status={{
                                  text: 'paid',
                                  color: 'green',
                                  classes: 'dark:text-[rgb(33,234,48)]',
                                  index: 3,
                                }}
                                {...columns}
                                classes={classes}
                              />
                            )
                          })}
                        </>
                      </TableBody>
                    </TableComponent>
                  )}

                  {!!data.SalesReturnItems.length && (
                    <TableComponent heading="Returned Items For Sales">
                      <TableHeader
                        TABLE_HEAD={ITEM_HEAD.filter((val) => val !== 'SoldPrice')}
                      ></TableHeader>
                      <TableBody fetching={fetching}>
                        <>
                          {data.SalesReturnItems.map((val, index) => {
                            const isLast = index === data.SoldItems.length - 1
                            const classes: string = isLast
                              ? 'p-4'
                              : 'p-4 border-b border-blue-gray-50'
                            const columns: DynamicTableCol = {
                              col1: { value: val?.Item?.ItemName },
                              col2: { value: val.FKItemID },
                              col3: { value: val.Price, prefix: '$' },
                              col4: { value: val.Qty },
                              col5: { value: val.SubTotal, prefix: '$' },
                            }
                            return (
                              <TableRow
                                status={{
                                  text: 'returned',
                                  color: 'blue-gray',
                                  classes: 'dark:text-[rgb(136,193,221)]',
                                  index: 3,
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
                  )}
                </>
              ) : (
                <>{<EditSale />}</>
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
