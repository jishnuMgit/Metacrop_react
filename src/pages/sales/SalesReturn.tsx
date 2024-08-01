import PosBase from '@/components/products/PosBase'
import { Input } from '@/components/ui'
import { Typography } from '@material-tailwind/react'

function SalesReturn() {
  return (
    <div className="flex md:p-5 lg:flex-row flex-col transition-all">
      <PosBase sort={{ option: '?sort=none' }}>
        <div className="flex flex-col w-full">
          <Typography variant="h3" className="mb-3">
            Add Sales Return
          </Typography>
          <Input
            placeholder="Search Invoice"
            type="text"
            className=" indent-7 mb-0 w-6/12 h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0] dark:placeholder:text-dark-text-color dark:bg-black dark:border-none dark:focus-visible:outline-none"
          />
        </div>
      </PosBase>
    </div>
  )
}

export default SalesReturn
