import { SortTypes } from '@/utils/types'
import { SquaresPlusIcon } from '@heroicons/react/24/solid'
import { CardHeader,  Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react'// MagnifyingGlassIcon,Input
import { Button } from '../ui'
// import { useEffect, useState } from 'react'
// import Select from 'react-select';
import { Filter } from '../Fliter/Filter'
import { useLocation } from 'react-router-dom'

type HeaderProps = {
  name: string
    onFilterApply: (data: any) => void;

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
  // const options = [
  //   { value: 'thisWeek', label: 'jishnu' },
  //   { value: 'lastWeek', label: 'john' },
  //   { value: 'thisMonth', label: 'marco' },
  //   { value: 'custom', label: 'veenu' },
  // ];
  //  const options1 = [
  //   { value: 'thisWeek', label: 'milk' },
  //   { value: 'lastWeek', label: 'cheese' },
  //   { value: 'thisMonth', label: 'taco' },
  //   { value: 'custom', label: 'bun' },
  // ];

  //   const options2 = [
  //   { value: 'date', label: 'date' },
  //   { value: 'customer', label: 'customer' },
  //   { value: 'product', label: 'product' },
  
  // ];

function Header({
  name,
  viewAll,
  setSortType,
  btnName = 'view all',
  // handleEnter,
  // handleQuery,
  onFilterApply,
  btnClick,
}: HeaderProps) {
// const today = new Date().toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

// const [startDate, setStartDate] = useState(today);
// const [endDate, setEndDate] = useState(today);
// const [selectedOption, setSelectedOption] = useState('');
// const [selectedOptionproduct, setSelectedOptionproduct] = useState('');
// const [selectedfilter, setSelectedfilter] = useState(options2[0]);


//   useEffect(()=>{
// // alert('date change')
//   },[startDate,endDate])
// alert(name)
const location = useLocation();
// alert(location.pathname)
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
            className="hover:bg-gray-900 hover:opacity-100 hover:text-white"
            onClick={()=> btnName ==="view all"?window.location.reload():viewAll }
            variant="outlined"
            size="sm"
          >
            {btnName} 
          </Button>
         
{location.pathname==='/sales/list' && (
  <Filter onApply={onFilterApply} />
)}
          
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
      {/* Start Date */}
      {/* Start Date */}
   
 {/* <div className="relative">
      <label className="text-white mb-2 text-sm block">Select Range</label>
      <Select
        options={options2}
        value={selectedfilter}
        defaultValue={'date'}
        onChange={(options1) => setSelectedfilter(options1)}
        className="text-black"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }),
          singleValue: (base) => ({ ...base, color: 'white' }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'rgba(30,30,30,0.9)',
            color: 'white',
            zIndex: 9999,
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#555' : 'transparent',
            color: 'white',
          }),
        }}
      />
    </div> */}

    

     
        {/* <div className="w-full md:w-72">
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
        </div> */}
      </div>
      {/* <div className='flex gap-5'>
      <div>
           <div className="flex gap-4">
      <div className="flex flex-col">
        <label className="text-white mb-2 text-sm">From</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-transparent border border-white/30 rounded-md px-4 py-2 text-white placeholder-white focus:outline-none focus:ring focus:border-white/50 [&::-webkit-calendar-picker-indicator]:invert"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white mb-2 text-sm">To</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-transparent border border-white/30 rounded-md px-4 py-2 text-white placeholder-white focus:outline-none focus:ring focus:border-white/50 [&::-webkit-calendar-picker-indicator]:invert"
        />
      </div>
    </div>

      <div className='mt-5 flex flex-col gap-8'>
         <div className="relative">
      <label className="text-white mb-2 text-sm block">Select customer</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => setSelectedOption(option)}
        className="text-black"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }),
          singleValue: (base) => ({ ...base, color: 'white' }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'rgba(30,30,30,0.9)',
            color: 'white',
            zIndex: 9999,
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#555' : 'transparent',
            color: 'white',
          }),
        }}
      />
    </div>

     <div className="relative">
      <label className="text-white mb-2 text-sm block">Select Range</label>
      <Select
        options={options1}
        value={selectedOptionproduct}
        onChange={(options1) => setSelectedOptionproduct(options1)}
        className="text-black"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }),
          singleValue: (base) => ({ ...base, color: 'white' }),
          menu: (base) => ({
            ...base,
            backgroundColor: 'rgba(30,30,30,0.9)',
            color: 'white',
            zIndex: 9999,
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#555' : 'transparent',
            color: 'white',
          }),
        }}
      />
    </div>
      </div>
    <div>
      
    </div>
      </div>
      </div> */}
    </CardHeader>
  )
}

export default Header
