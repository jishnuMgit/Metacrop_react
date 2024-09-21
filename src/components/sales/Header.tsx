import { SortTypes } from '@/utils/types'
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid'
import { CardHeader, Input, Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react'
import { Button } from '../ui'

type HeaderProps = {
  name: string
  viewAll?: () => void
  setSortType: (val: SortTypes) => void
  btnName?: string
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleQuery: (value: string) => void
  btnClick: () => void
}

const TABS = [
  {
    label: 'Recent',
    value: 'date',
  },
  {
    label: 'Item',
    value: 'item',
  },

  {
    label: 'Price',
    value: 'price',
  },
]

function Header({
  name,
  viewAll,
  setSortType,
  btnName = 'view all',
  handleEnter,
  handleQuery,
  btnClick,
}: HeaderProps) {
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-dark-primary-bg">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" className="dark:text-white" color="blue-gray">
            {`${name} list`}
          </Typography>
          <Typography className="mt-1 font-normal dark:text-dark-text-color">
            {`See information about all ${name}`}
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="hover:bg-gray-900 hover:opacity-100"
            onClick={viewAll}
            variant="outlined"
            size="sm"
          >
            {btnName}
          </Button>
          <Button onClick={btnClick} className="flex items-center gap-3" size="sm">
            <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
            {`Add ${name}`}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="date" className="w-full z-0 md:w-max">
          <TabsHeader
            className="dark:bg-black"
            indicatorProps={{
              className: 'dark:bg-dark-btn-color',
            }}
          >
            {TABS.map(({ label, value }, i) => (
              <Tab
                className="dark:text-white"
                onClick={() => {
                  console.log(value)

                  setSortType(value as SortTypes)
                }}
                key={i}
                value={value}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            crossOrigin={''}
            aria-label="search"
            className="dark:bg-black "
            label="Search by id"
            onChange={(e) => handleQuery(e.target.value)}
            onKeyUp={handleEnter}
            labelProps={{ className: 'dark:peer-focus:!text-white' }}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
  )
}

export default Header
