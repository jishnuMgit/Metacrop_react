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
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from 'useipa'

const ITEM_HEAD = ['Name', 'Item ID', 'Status', 'Qty', 'Price', 'SubTotal']

function Sale() {
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
      <Card className="h-full w-full">
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
                onClick={() => navigate('/sales/pos')}
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
          <div>
            <Typography variant="h6" color="blue-gray">
              {`Invoice Details`}
            </Typography>
          </div>
          <div className="mb-5">
            <Typography color="blue-gray">
              Date : {data?.data?.CreatedOn}
            </Typography>
            <Typography color="blue-gray">
              Sale Id : {data?.data?.PKSaleID}
            </Typography>
            <Typography color="blue-gray">
              Total items : {data?.data?.SoldItems.length}
            </Typography>
            <Typography color="blue-gray">
              Total Amount : ${data?.data?.TotalAmount}
            </Typography>
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
                  return <TableRow key={index} {...columns} classes={classes} />
                })}
              </>
            </TableBody>
          </TableComponent>
        </CardBody>
      </Card>
    </>
  )
}

export default Sale
