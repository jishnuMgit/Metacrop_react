import { clsx } from 'clsx/lite'

type CenterProps = {
  children: React.JSX.Element
  className?: string
  start?: boolean
}
function Center({ children, className, start }: CenterProps) {
  return (
    <div
      className={clsx(
        `flex items-center ${start ? 'justify-start' : 'justify-center'}`,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Center
