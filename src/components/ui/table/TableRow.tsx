import { DynamicTableCol } from '@/utils/types'
// import { PencilIcon } from '@heroicons/react/24/solid'
import {  Chip,  Typography } from '@material-tailwind/react'//IconButton, Tooltip,Avatar,
import { colors } from '@material-tailwind/react/types/generic'
import clsx from 'clsx'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export type TableRowProps = ({ click: true; link: string } | { click?: false; link?: never }) & {
  classes: string
  action?: boolean
  status?: { text: string; color: colors; index?: number; classes?: string }
} & DynamicTableCol

function TableRow({ classes, action, click = false, status, link, ...props }: TableRowProps) {
  const { index: statusIndex } = status ?? {}
  const navigate = useNavigate()

  const handleClick = () => {
    if (click && link && !window.getSelection()?.toString()) {
      navigate(`${link}`)
    }
    return
  }

  return (
    <tr
      onClick={handleClick}
      className={clsx(
        `hover:bg-blue-gray-50 dark:hover:bg-black/10 dark:border-2 border-solid !border-black `,
        {
          'cursor-pointer': click,
        }
      )}
    >
      {Object.values(props).map((col, index) => {
        return (
          <Fragment key={index}>
            {statusIndex && statusIndex === index + 1 && (
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
                  {/* <Avatar
                    src={`https://picsum.photos/id/${props.col2?.value}/50/50`}
                    alt={'img'}
                    size="sm"
                  ></Avatar> */}
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
          {/* <Tooltip content="Edit Sale">
            <IconButton
              aria-label="Edit sale"
              variant="text"
              className="dark:hover:bg-dark-btn-hover"
            >
              <PencilIcon className="h-4 w-4 dark:text-white " />
            </IconButton>
          </Tooltip> */}
        </td>
      )}
    </tr>
  )
}

export default TableRow
