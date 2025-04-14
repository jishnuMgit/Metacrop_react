import { BanknotesIcon, UserPlusIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/solid'
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
      value: '+55%',
      label: 'than last week',
    },
  },
  {
    color: 'gray',
    icon: UsersIcon,
    title: "Today's Users",
    value: '2,300',
    footerProps: {
      color: 'text-green-500',
      value: '+3%',
      label: 'than last month',
    },
  },
  {
    color: 'gray',
    icon: UserPlusIcon,
    title: 'New Clients',
    value: '3,462',
    footerProps: {
      color: 'text-red-500',
      value: '-2%',
      label: 'than yesterday',
    },
  },
  {
    color: 'gray',
    icon: ChartBarIcon,
    title: 'Total Sales',
    value: '$0',
    footerProps: {
      color: 'text-green-500',
      value: '+5%',
      label: 'than yesterday',
    },
  },
]

export default statisticsCardsData
