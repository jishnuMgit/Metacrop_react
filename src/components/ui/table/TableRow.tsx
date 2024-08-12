import { DynamicTableCol } from '@/utils/types'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Avatar, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { colors } from '@material-tailwind/react/types/generic'
import clsx from 'clsx'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export type TableRowProps = {
  classes: string
  action?: boolean
  click?: boolean
  status?: { text: string; color: colors; index?: number; classes?: string }
} & DynamicTableCol

function TableRow({ classes, action, click = false, status, ...props }: TableRowProps) {
  const { index: statusIndex = 3 } = status!

  const navigate = useNavigate()
  const handleClick = () => {
    if (click) {
      navigate(`/sales/${props.col2?.value}`)
    }
    return
  }

  return (
    <tr
      onClick={handleClick}
      className={clsx(
        `hover:bg-blue-gray-50 dark:hover:bg-[rgba(0,0,0,0.075)] dark:border-2 border-solid !border-black`,
        {
          'cursor-pointer': click,
        }
      )}
    >
      {Object.values(props).map((col, index) => {
        return (
          <Fragment key={index}>
            {statusIndex === index + 1 && (
              <td className={classes}>
                <div key={index} className="w-max">
                  <Chip
                    className={status?.classes}
                    variant="ghost"
                    size="sm"
                    value={status?.text}
                    color={status?.color}
                  />
                </div>
              </td>
            )}
            <td className={classes}>
              {index === 0 ? (
                <div className="flex items-center gap-3">
                  <Avatar
                    src={`https://picsum.photos/id/${props.col2?.value}/50/50`}
                    alt={'img'}
                    size="sm"
                  ></Avatar>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal dark:text-dark-text-color"
                    >
                      {clsx(col?.prefix, col?.value)}
                    </Typography>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col dark:text-dark-text-color">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal dark:text-dark-text-color"
                  >
                    {clsx(col?.prefix, col?.value)}
                  </Typography>
                </div>
              )}
            </td>
          </Fragment>
        )
      })}

      {action && (
        <td className={classes}>
          <Tooltip content="Edit Sale">
            <IconButton variant="text" className="dark:hover:bg-dark-btn-hover">
              <PencilIcon className="h-4 w-4 dark:text-white " />
            </IconButton>
          </Tooltip>
        </td>
      )}
    </tr>
  )
}

export default TableRow
