import clsx from 'clsx'

type SpinnerProps = {
  small?: boolean
  className?: string
}

function Spinner({ small, className }: SpinnerProps) {
  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        !small && 'h-32',
        className
      )}
    >
      <div className="flex flex-wrap justify-evenly gap-4">
        <div className="h-24 w-52 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-24 w-52 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-24 w-52 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-24 w-52 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
    </div>
  )
}

export default Spinner
