import { TableComponent } from '@/components/ui'
import { TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { ApiSalesData, DynamicTableCol } from '@/utils/types'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from 'useipa'

const ITEM_HEAD = ['Item Name', 'Item ID', 'Status', 'Qty', 'Price', 'SubTotal']

function InvoiceList({
  name,
  value,
}: {
  name: string
  value?: string | number
}) {
  return (
    <>
      <div className="flex justify-between w-full">
        <Typography color="blue-gray" className="w-5/12">
          {name}
        </Typography>
        <Typography color="blue-gray" className="w-2/12">
          :
        </Typography>
        <Typography color="blue-gray" className="w-5/12">
          {value}
        </Typography>
      </div>
    </>
  )
}

function Sale() {
  const [edit, setEdit] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const { fetchData, data, error, fetching } = useApi<{ data?: ApiSalesData }>()
  useEffect(() => {
    fetchData(`/sales/${params.id}`)
  }, [])

  if (error) {
    return <>No sales Found on given id: {`${params.id}`}</>
  }
  console.log(data)

  return (
    <>
      {data && (
        <>
          <Card className="h-full mx-5 mt-5 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h4" color="blue-gray">
                    {`Sale Deatails`}
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    {`See information about this sale`}
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={() => setEdit(true)}
                    className="flex items-center gap-3"
                    size="sm"
                  >
                    <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
                    {`Edit Sale`}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="w-3/12">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {`Invoice Details`}
                  </Typography>
                </div>
                <div className="mb-5 flex flex-col ">
                  {[
                    {
                      name: 'Sale Date',
                      value: new Date(
                        data.data!.CreatedOn
                      ).toLocaleDateString(),
                    },
                    {
                      name: 'Modified Date',
                      value: new Date(
                        data.data!.ModifiedOn
                      ).toLocaleDateString(),
                    },
                    {
                      name: 'Sale Id',
                      value: data.data!.PKSaleID,
                    },
                    {
                      name: 'Total Items',
                      value: data.data?.SoldItems.length,
                    },
                    {
                      name: 'Total Amount',
                      value: `$` + data.data?.TotalAmount,
                    },
                  ].map((val, index) => (
                    <InvoiceList
                      key={index}
                      name={val.name}
                      value={val.value}
                    ></InvoiceList>
                  ))}
                </div>
              </div>

              <TableComponent heading="Selected Items For Sales">
                <TableHeader TABLE_HEAD={ITEM_HEAD}></TableHeader>
                <TableBody fetching={fetching}>
                  <>
                    {data?.data?.SoldItems.map((val, index) => {
                      console.log(val)

                      const isLast = index === data?.data!.SoldItems.length - 1
                      const classes: string = isLast
                        ? 'p-4'
                        : 'p-4 border-b border-blue-gray-50'
                      const columns: DynamicTableCol = {
                        col1: val.Item.ItemName,
                        col2: val.FKItemID,
                        col3: val.Qty,
                        col4: val.Price,
                        col5: val.SubTotal,
                      }
                      return (
                        <TableRow key={index} {...columns} classes={classes} />
                      )
                    })}
                  </>
                </TableBody>
              </TableComponent>
            </CardBody>
          </Card>
        </>
      )}
    </>
  )
}

export default Sale
