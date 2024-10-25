import { useItemList } from '@/hooks/useItem'
import { QueryParamOpts } from '@/utils/types'
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

type ItemCardType = {
  title: string
  queryParam: QueryParamOpts
  icon?: React.ReactNode
}
export function ItemCard({ icon, title, queryParam }: ItemCardType) {
  const { data } = useItemList(queryParam)

  return (
    <Card className="border border-blue-gray-100 shadow-sm dark:bg-dark-primary-bg dark:border-none h-56 overflow-y-auto">
      <CardHeader
        variant="filled"
        color="gray"
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center dark:!bg-dark-btn-color"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography
          variant="h6"
          className="font-semibold text-blue-gray-600 dark:text-dark-text-color mb-4"
        >
          {title}
        </Typography>
      </CardBody>
      {
        <CardFooter className="border-t dark:border-black border-blue-gray-50 p-4">
          <div className="flex "></div>
          {data?.data.map((item, i) => (
            <div className="flex flex-row dark:text-white items-center" key={item.PKItemID}>
              <p className="me-4">{i + 1}.</p>
              <Typography>{item.ItemName}</Typography>
            </div>
          ))}
        </CardFooter>
      }
    </Card>
  )
}
