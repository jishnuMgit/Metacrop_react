import { useParams } from 'react-router-dom'
import { InvoiceList } from '@/components/sales/'
import { Spinner, TableComponent } from '@/components/ui'
import { TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { createInvoiceList, createReturnInvoice } from '@/utils/helpers'
import { DynamicTableCol } from '@/utils/types'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { SALES_RETURN_INVOICE } from '@/config/constants'
import { useGetSalesReturnById } from '@/hooks/useSalesReturn'
import { useEffect, useState } from 'react'
import useFetch from '@/hooks/useFetch'
import Env from '@/config/env'
import { PrinterIcon } from '@heroicons/react/24/solid'
import { generateInvoicePDF2 } from '@/utils/generateInvoicePDF2'

const TABLE_HEAD = [
  'Item',
  'Sales Return ID',
  'Sale ID',
  'Status',
  'Date',
  'Quantity',
  'Tax',
  'Price',
  'Total Amount',
]
interface Sybolcurr{
    CurrSym:string

  }

function Sale() {
  const params = useParams()
  const { response, fetching } = useGetSalesReturnById(params.id)
  const [Cury,setCury]=useState<Sybolcurr>()
  const { data: homedatas1 } = useFetch(`${Env.VITE_BASE_URL}/home/getHomeCurrency`);

  useEffect(() => {
    if (homedatas1?.data) {
      setCury(homedatas1.data);
    }
  }, [homedatas1]);

      console.log("response",response);


      // const Fetchchild=async()=>{
      //   try {
      //     const FetchData=await fetch() 
      //   } catch (error) {
          
      //   }
      // }
       const handleGeneratePDF = async () => {
      try {
        await generateInvoicePDF2({
          totalAmount :Number(response?.data?.totalReturnAmount),
          discount: Number( 0),
          tax:Number(response?.data),
          taxAmount:Number(0),
          grandTotal:0,
          billNumber: '123ABC',
          orders:response?.data?.Childs,
        })
        // alert("ji")
        // window.location.reload()
      } catch (error) {
        console.error('Error generating invoice PDF:', error)
      }
    }
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
                  {createInvoiceList(SALES_RETURN_INVOICE, createReturnInvoice(response?.data?.items!))?.map(
                    (val, index) => (
                      <InvoiceList key={index} name={val.name} value={val.value}></InvoiceList>
                    )
                  )}
                </div>
<button
      onClick={() => handleGeneratePDF()}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
    >
      <PrinterIcon className="h-5 w-5" />
      <span>Print Invoice</span>
    </button>               </div>
              {response.data && (
                <>
                  <TableComponent heading="Selected Items For Sales Return">
                    <TableHeader TABLE_HEAD={TABLE_HEAD}></TableHeader>
                    <TableBody fetching={fetching}>
                      <>
                        {response?.data?.Childs?.map((val:any, index:any) => {
                          const isLast = index === response.data!?.Childs.length - 1
                          const classes: string = isLast
                            ? 'p-4'
                            : 'p-4 border-b border-blue-gray-50'
                          const columns: DynamicTableCol = {
                            col1: { value: val.Item.ItemName },
                            col2: { value: val.FKReturnID },
                            col3: { value: val.FKSaleID ?? 'No sale' },
                            col4: { value: new Date(val.createdOn).toLocaleDateString() },
                            col5: { value: val.Qty },
                            col6:{value:val.TaxPer},
                            col7: { value: val.Price, prefix: `${Cury?.CurrSym}` },
                            col8: { value: val.SubTotal, prefix: `${Cury?.CurrSym}` },
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
