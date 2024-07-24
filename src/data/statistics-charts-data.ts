import { chartsConfig } from '@/config'
import { isDarkMode } from '@/utils/helpers'
import { color } from '@material-tailwind/react/types/components/alert'
import { Props } from 'react-apexcharts'

type ChartProps = Props

const websiteViewsChart: ChartProps = {
  type: 'bar',
  height: 220,
  series: [
    {
      name: 'Views',
      data: [50, 20, 10, 22, 50, 10, 40],
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
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    },
  },
}

const dailySalesChart: ChartProps = {
  type: 'line',
  height: 220,
  series: [
    {
      name: 'Sales',
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
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

const completedTaskChart: ChartProps = {
  type: 'line',
  height: 220,
  series: [
    {
      name: 'Sales',
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ['#388e3c'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
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
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: 'Tasks',
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
}

export type ChartDataType = {
  color: color
  title?: string
  description: string
  footerElement?: React.ReactNode | null
  chart: Props
}
export const statisticsChartsData = [
  {
    color: 'white',
    title: 'Website View',
    description: 'Last Campaign Performance',
    footerText: 'campaign sent 2 days ago',
    chart: websiteViewsChart,
  },
  {
    color: 'white',
    title: 'Daily Sales',
    description: '15% increase in today sales',
    footerText: 'updated 4 min ago',
    chart: dailySalesChart,
  },
  {
    color: 'white',
    title: 'Completed Tasks',
    description: 'Last Campaign Performance',
    footerText: 'just updated',
    chart: completedTasksChart,
  },
]

export default statisticsChartsData
