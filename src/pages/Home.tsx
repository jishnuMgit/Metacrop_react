import React, { Fragment, useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' 
import 'react-date-range/dist/theme/default.css' 

import {
  Typography,
  // Card,
  // CardHeader,
  // CardBody,
  // IconButton,
  // Menu,
  // MenuHandler,
  // MenuList,
  // MenuItem,
  // Avatar,
  // Tooltip,
  // Progress,
} from '@material-tailwind/react'
// import { EllipsisVerticalIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import { StatisticsCard } from '@/widgets/cards'
import { StatisticsChart } from '@/widgets/charts'
import {
  statisticsCardsData,
  // statisticsChartsData,
  
  // projectsTableData,
  // ordersOverviewData,
} from '@/data'
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  // CheckCircleIcon,
  ClockIcon,
  // QueueListIcon,
} from '@heroicons/react/24/solid'
import { chartsConfig } from '@/config'
import { isDarkMode } from '@/utils/helpers'
import { Props } from 'react-apexcharts'
type ChartProps = Props
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { colors } from '@material-tailwind/react/types/generic'
import { useApi } from 'useipa'
import { ApiAnalyticsSales } from '@/utils/types'
import { ItemCard } from '@/widgets/cards/ItemCard'
// import ChartWithDateFilter from '@/data/ChartWithDateFilter'
import Env from '@/config/env'
import useFetch from '@/hooks/useFetch'
import { ApexChart } from '@/data/PieChart'

function inject(this: { value?: string | number }, value?: string | number) {
  this.value = value ? '$' + value : this.value
}

  interface Sybolcurr{
    CurrSym:string

  }
function Home() {

    const [date, setDate] = useState(new Date());
   const [cury, setCury] = useState<Sybolcurr>();
  const handleChange = (date:any) => {
    setDate(date);
    
  };




 interface BraDate{
  cash:number,
  bank:number,
  credit:number
 }
 interface LineData{
  Jan:number
        Feb:number
        Mar:number
        Apr:number
        May:number
        Jun:number
        Jul:number
        Aug:number
        Sep:number
        Oct:number
        Nov:number
        Dec:number
 }

const [barData, setbardata] = useState<BraDate>()
const [LineDatas, setLinedata] = useState<LineData|undefined>()



  const websiteViewsChart: ChartProps = {
  type: 'bar',
  height: 320,
  series: [
    {
      name: 'Sales',
      data: [barData?.cash||0,barData?.bank||0,barData?.credit||0],
    },
  ],
  options: {
    ...chartsConfig,
    colors: isDarkMode() ? ['#EB1616'] : ['#388e3c'],
    plotOptions: {
      bar: {
        columnWidth: '16%',
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ['Cash', 'Bank', 'Credit'],
    },
  },
}

 const statisticsChartsData1 = [
  {
    color: 'white',
    title: 'Website View',
    description: 'Last Campaign Performance',
    chart: websiteViewsChart,
  },
]




const dailySalesChart: ChartProps = {
  type: 'line',
  height: 320,
  series: [
    {
  name: 'Sales',
  data: [
    LineDatas?.Jan ?? 0,
    LineDatas?.Feb ?? 0,
    LineDatas?.Mar ?? 0,
    LineDatas?.Apr ?? 0,
    LineDatas?.May ?? 0,
    LineDatas?.Jun ?? 0,
    LineDatas?.Jul ?? 0,
    LineDatas?.Aug ?? 0,
    LineDatas?.Sep ?? 0,
    LineDatas?.Oct ?? 0,
    LineDatas?.Nov ?? 0,
    LineDatas?.Dec ?? 0,
  ],
}

  ],
  options: {
    ...chartsConfig,
    colors: ['#0288d1'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  },
}



 const statisticsChartsData = [
  {
    color: 'white',
    title: 'Daily Sales',
    description: '15% increase in today sales',
    footerText: 'updated 4 min ago',
    chart: dailySalesChart,
  },

]

    const [showDatePicker, setShowDatePicker] = useState(false)
        


  const { data, fetchData } = useApi<{ data: ApiAnalyticsSales }>()
  useEffect(() => {
    fetchData('/analytics/sales')
  }, [])

    const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(), 
      endDate: new Date(),
      key: 'selection',
    },
  ])
 const FetchData=async()=>{
  // alert(dateRange[0]?.startDate)
      try {
        const FetchBar=await fetch(`${Env.VITE_BASE_URL}/analytics/BarChartData?Sdate=${dateRange[0]?.startDate}&Edate=${dateRange[0]?.endDate}`,{
          method:"GET",
          credentials:'include'
        })

        const AllData=await FetchBar.json()
        setbardata(AllData?.data)
         console.log("barData",barData);
        
      } catch (error) {
        throw new Error()
      }
    }



  const { data: homedatas1, error } = useFetch(`${Env.VITE_BASE_URL}/home/getHomeCurrency`);

  useEffect(() => {
    if (homedatas1?.data) {
      setCury(homedatas1.data);
    }
  }, [homedatas1]);

     const LineDataFetch=async()=>{
  // alert(dateRange[0]?.startDate)
      try {
        const FetchBar=await fetch(`${Env.VITE_BASE_URL}/analytics/LineChart`,{
          method:"GET",
          credentials:'include'
        })

        const AllData=await FetchBar.json()
        setLinedata(AllData?.data)
         console.log("barData",barData);
        
      } catch (error) {
        throw new Error()
      }
    }
   
   
    useEffect(() => {
      LineDataFetch()
     
  // FetchCurr()
  FetchData()
}, [])


//     useEffect(() => {
  
//   FetchData()
// }, [])

  useEffect(()=>{
FetchData()
   

  },[dateRange])
  // For now, just log date range on change — later you can use this to filter chart data
  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection])
    console.log('Selected range:', ranges.selection)
  }
   

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const {data:HomeData}=useFetch(`${Env.VITE_BASE_URL}/home/getHomeCardData`)


  return (
    <div className="mt-12 mx-6">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
  {statisticsCardsData.map(({ icon, title, footerProps, color }, index) => {
  // Dynamically assign value based on index
  let value = '0'
  if (index === 0) value = `${cury?.CurrSym} ${data?.data.todayStat._sum.TotalAmount || 0}`
  if (index === 1) value = `${HomeData?.TodaySalespre || 0}` // No $
  if (index === 2) value = `${cury?.CurrSym} ${HomeData?.SalesReturncash || 0}`
  if (index === 3) value = `${cury?.CurrSym} ${data?.data.totalStat._sum.TotalAmount || 0}`

  return (
    <Fragment key={index}>
      <StatisticsCard
        color={color}
        title={title}
        value={value}
        icon={React.createElement(icon, {
          className: 'w-6 h-6 text-white',
        })}
        footer={
          <Typography className="font-normal text-blue-gray-600">
            <strong className={footerProps?.color}>{footerProps?.value}</strong>
            &nbsp;{footerProps?.label}
          </Typography>
        }
      />
    </Fragment>
  )
})}


      </div>
      {/* <div className="grid xl:grid-cols-2 gap-x-6 gap-y-10 mb-12">
        <ItemCard
          queryParam={{ sort: 'most-saled' }}
          icon={React.createElement(ArrowTrendingUpIcon, {
            className: 'w-6 h-6 text-white ',
          })}
          title="Most Sold"
        />
        <ItemCard
          icon={React.createElement(ArrowTrendingDownIcon, {
            className: 'w-6 h-6 text-white ',
          })}
          queryParam={{ filter: '?filter=least' }}
          title="Least Sold"
        /> */}
        {/* <ItemCard
          icon={React.createElement(QueueListIcon, {
            className: 'w-6 h-6 text-white ',
          })}
          queryParam={{ filter: '?filter=rol' }}
          title="Re Order Level Item"
        /> */}
        
      {/* </div> */}
    
    <div className="mb-[48px] grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      <ApexChart/>
       <ApexChart/>
        <ApexChart/>
    </div>

        <div className="mb-[48px] grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
          
          {showDatePicker && (
        <div className="max-w-md absolute z-10">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#0288d1']}
            className="rounded-md shadow-lg"
          />
        </div>
      )}
      {statisticsChartsData1.map(({ title, color, ...props }) => (
        <StatisticsChart
        
          key={title}
          color={color as colors}
          {...props}
          
          title={title}
          footerElement={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
               
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDatePicker}>
  <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
  <div className="p-2 rounded-md shadow-md bg-white bg-opacity-0">
    <Typography variant="small" className="text-blue-600 text-base">
      {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
    </Typography>
  </div>
</div>

              
              
            </Typography>
          }
        />
      ))}

   

       {statisticsChartsData.map(({ title, footerText, color, ...props }) => (
        <StatisticsChart
        
          key={title}
          color={color as colors}
          {...props}
          
          title={title}
          footerElement={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />

         <DatePicker
      selected={date}
      onChange={handleChange}
      className='ml-5 text-blue-800 bg-white/0 cursor-pointer text-xl'
      showYearPicker
      dateFormat="yyyy"
    />
              
           
              
            </Typography>
          }
        />
      ))}
    </div>
    {/* comment */}
    </div>
  )
}

export default Home
























  {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 dark:border-none shadow-sm dark:bg-dark-primary-bg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6" />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['companies', 'members', 'budget', 'completion'].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ''
                      : 'border-b border-blue-gray-50 dark:border-black'
                  }`

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={'profile'} size="sm" />
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={'profile'}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? '' : '-ml-2.5'
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? 'green' : 'blue'}
                            className="h-1"
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 dark:border-none shadow-sm dark:bg-dark-primary-bg ">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(({ icon, color, title, description }, key) => (
              <div key={title} className="flex items-start gap-4 py-3">
                <div
                  className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                    key === ordersOverviewData.length - 1 ? 'after:h-0' : 'after:h-4/6'
                  }`}
                >
                  {React.createElement(icon, {
                    className: `!w-5 !h-5 ${color}`,
                  })}
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="block font-medium">
                    {title}
                  </Typography>
                  <Typography
                    as="span"
                    variant="small"
                    className="text-xs font-medium text-blue-gray-500"
                  >
                    {description}
                  </Typography>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div> */}
