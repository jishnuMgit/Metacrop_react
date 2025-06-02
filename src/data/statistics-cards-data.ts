import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/solid'
import { color } from '@material-tailwind/react/types/components/card'
import React from 'react'

// Define the structure of each card
type Footer = {
  color: string
  value: string
  label: string
}
export type StatisticsCardType = {
  color?: color
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  icon: React.ReactNode | any // Assuming you're using React components for the icons
  title: string
  value?: string
  footerProps?: Footer
  footer?: React.ReactNode
}
export const statisticsCardsData: StatisticsCardType[] = [
  {
    color: 'gray',
    icon: BanknotesIcon,
    title: "Today's Revenue",
    value: '$0',
    footerProps: {
      color: 'text-green-500',
      value: '',
      label: 'Gross earnings recorded for the day',
    },
  },
  {
    color: 'gray',
    icon: UsersIcon,
    title: "Today's Users",
    value: '2,300',
    footerProps: {
      color: 'text-green-500',
      value: '',
      label: 'Total active users for today.',
    },
  },
  {
    color: 'gray',
    icon: ArrowDownIcon,
    title: 'Sale Return',
    value: '462',
    footerProps: {
      color: 'text-red-500',
      value: '',
      label: 'Value of products returned',
    },
  },
  {
    color: 'gray',
    icon: ChartBarIcon,
    title: 'Total Sales',
    value: '$0',
    footerProps: {
      color: 'text-green-500',
      value: '',
      label: 'Total gross sales amount ',
    },
  },
]

export default statisticsCardsData
