import { CardBody } from '@material-tailwind/react'

function SortableTable({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          {children}
        </table>
      </CardBody>
    </>
  )
}
export default SortableTable
