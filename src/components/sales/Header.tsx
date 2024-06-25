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

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Recent',
    value: 'monitored',
  },
  {
    label: 'Price',
    value: 'unmonitored',
  },
]
function Header({ name, viewAll }: { name: string; viewAll?: () => void }) {
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
          <Button onClick={viewAll} variant="outlined" size="sm">
            view all
          </Button>
          <Button className="flex items-center gap-3" size="sm">
            <SquaresPlusIcon strokeWidth={2} className="h-4 w-4" />{' '}
            {`Add ${name}`}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full z-0 md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
  )
}

export default Header
