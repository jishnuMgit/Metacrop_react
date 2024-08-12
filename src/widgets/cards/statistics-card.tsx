import { StatisticsCardType } from '@/data'
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import PropTypes from 'prop-types'

export function StatisticsCard({
  color = 'blue',
  icon,
  title,
  value,
  footer = null,
}: StatisticsCardType) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none">
      <CardHeader
        variant="filled"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center dark:!bg-dark-btn-color"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography
          variant="small"
          className="font-normal text-blue-gray-600 dark:text-dark-text-color"
        >
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="dark:text-white">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t dark:border-black border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

StatisticsCard.propTypes = {
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
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
}

StatisticsCard.displayName = '/src/widgets/cards/statistics-card.tsx'

export default StatisticsCard
