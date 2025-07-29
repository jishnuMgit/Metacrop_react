// import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { EditSale, InvoiceList } from '@/components/sales/'
import { Spinner, TableComponent } from '@/components/ui'
import { TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { createInvoiceList, createInvoiceValues } from '@/utils/helpers'
import { DynamicTableCol } from '@/utils/types'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { SALE_INVOICE_NAMES } from '@/config/constants'
import { useGetSaleById } from '@/hooks/useSale'
import { PrinterIcon } from '@heroicons/react/24/solid'
import { generateInvoicePDF2 } from '@/utils/generateInvoicePDF2'
import type { ApiItem } from '@/utils/types' // make sure you import this type
import { useState } from 'react'

const ITEM_HEAD = ['Item Name', 'Item ID', 'Status', 'Price', 'Qty', 'Tax', 'SubTotal']

function Sale() {
  const [edit, setEdit] = useState(false)
  console.log(setEdit);
  
  const params = useParams()
  const { search } = useLocation()
  const query = new URLSearchParams(search).get('action')
  const { fetching, data } = useGetSaleById(params.id)

  const handleGeneratePDF = async () => {
  try {
    const convertedItems: ApiItem[] = (data?.SoldItems ?? []).map((item, idx) => ({
  Class: '',
  CreatedBy: 0,
  CreatedOn: new Date().toISOString(),
  DelFlag: 0,
  FKCmpID: 0,
  FKGroupID: 0,
  FKManufactureID: 0,
  FKStoreID: 0,
  FKUnitID: 0,
  HSNCode: '',
  ItemCode: '',
  ItemName: String(item.ItemName ?? ''),
  Lcost: 0,
  MaxLevel: 0,
  ModifiedBy: 0,
  ModifiedOn: 0,
  PKItemID: item.FKItemID ?? idx,
  Price: item.Price ?? 0,
  taxAmt: item.taxAmt ?? 0,
  Qty: item.Qty ?? 1,
  ReOrderLevel: 0,
  RepFlag: 0,
  TaxPer: 0,
  qty: item.Qty ?? 1,
  id: idx, // placeholder, adjust if needed
  customPrice: item.SoldPrice ?? undefined,
}))

    await generateInvoicePDF2({
      totalAmount: Number(data?.TotalAmount),
      discount: Number(data?.Discount ?? 0),
      tax: 0,
      taxAmount: 0,
      grandTotal: 0,
      billNumber: '123ABC',
      orders: convertedItems,
    })
  } catch (error) {
    console.error('Error generating invoice PDF:', error)
  }
}


  return (
    <>
      {data ? (
        <Card className="h-full mx-5 mt-5 dark:bg-dark-primary-bg">
          <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-dark-primary-bg">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h4" color="blue-gray" className="dark:text-white">
                  Sale Details
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about this sale
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <div className="md:w-5/12 w-full ">
              <Typography variant="h6" color="blue-gray" className="dark:text-blue-200">
                Invoice Details
              </Typography>
              <div className="mb-5 flex flex-col">
                {createInvoiceList(SALE_INVOICE_NAMES, createInvoiceValues(data)).map((val, index) => (
                  <InvoiceList key={index} name={val.name} value={val.value} />
                ))}
              </div>
              <button
                onClick={handleGeneratePDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                <PrinterIcon className="h-5 w-5" />
                <span>Print Invoice</span>
              </button>
            </div>

            {!edit && query !== 'edit' ? (
              <>
                {!!data?.SoldItems?.length && (
                  <TableComponent heading="Selected Items For Sales">
                    <TableHeader TABLE_HEAD={ITEM_HEAD} />
<TableBody fetching={fetching} filterData={data?.SalesReturnItems ?? []}>
                      {data?.SoldItems.map((val, index) => {
                        const isLast = index === data.SoldItems.length - 1
                        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                        const columns: DynamicTableCol = {
                          col1: { value: val.ItemName },
                          col2: { value: val.FKItemID },
                          col3: { value: val.SoldPrice || val.Price, prefix: '﷼' },
                          col4: { value: val.oldQty ?? 'err' },
                          col5: { value: '﷼' + (val.taxAmt || 0) },
                          col6: {
                            value: (val.SoldPrice * val.Qty + val.taxAmt * val.Qty),
                            prefix: '﷼',
                          },
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
                    </TableBody>
                  </TableComponent>
                )}

                {!!data?.SalesReturnItems?.length && (
                  <TableComponent heading="Returned Items For Sales">
                    <TableHeader TABLE_HEAD={ITEM_HEAD.filter((val) => val !== 'SoldPrice')} />
<TableBody fetching={fetching} filterData={data?.SoldItems ?? []}>
                      {data.SalesReturnItems.map((val, index) => {
                        const isLast = index === data.SalesReturnItems.length - 1
                        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                        const columns: DynamicTableCol = {
                          col1: { value: val?.Item?.ItemName },
                          col2: { value: val.FKItemID },
                          col3: { value: val.Price, prefix: '﷼' },
                          col4: { value: val.Qty },
                          col5: { value: val.SubTotal, prefix: '﷼' },
                        }
                        return (
                          <TableRow
                            key={index}
                            status={{
                              text: 'returned',
                              color: 'blue-gray',
                              classes: 'dark:text-[rgb(136,193,221)]',
                              index: 3,
                            }}
                            {...columns}
                            classes={classes}
                          />
                        )
                      })}
                    </TableBody>
                  </TableComponent>
                )}
              </>
            ) : (
              <EditSale />
            )}
          </CardBody>
        </Card>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Sale
