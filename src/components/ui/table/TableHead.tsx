import { Typography } from '@material-tailwind/react'

function TableHead({ TABLE_HEAD }: { TABLE_HEAD: string[] }) {
  return (
    <thead>
      <tr>
        {TABLE_HEAD.map((head) => (
          <th
            key={head}
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-transparent p-4 transition-colors hover:bg-blue-gray-50 dark:hover:bg-gray-50/60"
          >
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 dark:text-white"
            >
              {head}
              {/* {index !== TABLE_HEAD.length - 1 && (
                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
              )} */}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
