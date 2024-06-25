import { DynamicTableCol } from '@/utils/types'
import { PencilIcon } from '@heroicons/react/24/solid'
import {
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'

export type TableRowProps = {
  classes: string
} & DynamicTableCol

function TableRow({ classes, ...props }: TableRowProps) {
  const paid = true
  return (
    <tr className="hover:bg-blue-gray-50">
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar
            src={`https://picsum.photos/id/${props.col2}/50/50`}
            alt={'img'}
            size="sm"
          ></Avatar>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {props.col1}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {props.col2}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={paid ? 'paid' : 'pending'}
            color={paid ? 'green' : 'blue-gray'}
          />
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.col3}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {props.col4}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {'$' + props.col5}
        </Typography>
      </td>
      <td className={classes}>
        <Tooltip content="Edit Sale">
          <IconButton variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  )
}

export default TableRow
