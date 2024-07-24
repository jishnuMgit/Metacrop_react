import { ChartDataType } from '@/data'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

export function StatisticsChart({
  color = 'blue',
  title,
  description,
  footerElement = null,
  chart,
}: ChartDataType) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none">
      <CardHeader
        className="dark:bg-dark-primary-bg"
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
      >
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="px-6 pt-0 dark:bg-dark-primary-bg">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footerElement && (
        <CardFooter className="border-t border-blue-gray-50 dark:border-black px-6 py-5">
          {footerElement}
        </CardFooter>
      )}
    </Card>
  )
}

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'blue-gray',
    'gray',
    'brown',
    'deep-orange',
    'orange',
    'amber',
    'yellow',
    'lime',
    'light-green',
    'green',
    'teal',
    'cyan',
    'light-blue',
    'blue',
    'indigo',
    'deep-purple',
    'purple',
    'pink',
    'red',
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
}

StatisticsChart.displayName = '/src/widgets/charts/statistics-chart.jsx'

export default StatisticsChart
