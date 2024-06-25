import { TableComponent } from '@/components/ui'
const TABLE_HEAD = [
  'Customer',
  'Sales Return ID',
  'Status',
  'Date',
  'Total Items',
  'Total Amount',
  'Action',
]
function SalesReturn() {
  return <TableComponent TABLE_HEAD={TABLE_HEAD}></TableComponent>
}

export default SalesReturn
