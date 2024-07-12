import { SortTypes } from '@/utils/types'
import { MagnifyingGlassIcon, SquaresPlusIcon } from '@heroicons/react/24/solid'
import {
  Button,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  name: string
  viewAll?: () => void
  setSortType: (val: SortTypes) => void
  btnName?: string
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
}: HeaderProps) {
  const navigate = useNavigate()
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            {`${name} list`}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {`See information about all ${name}`}
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="hover:bg-gray-900 hover:opacity-100 hover:text-white"
            onClick={viewAll}
            variant="outlined"
            size="sm"
          >
            {btnName}
          </Button>
          <Button
            onClick={() => navigate('/sales/pos')}
            className="flex items-center gap-3"
            size="sm"
          >
            <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />
            {`Add ${name}`}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="date" className="w-full z-0 md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab
                onClick={() => setSortType(value as SortTypes)}
                key={value}
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
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
  )
}

export default Header
