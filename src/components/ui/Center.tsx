import { clsx } from 'clsx/lite'

type CenterProps = {
  children: React.JSX.Element
  className?: string
}
function Center({ children, className }: CenterProps) {
  return (
    <div className={clsx(`flex items-center justify-center`, className)}>
      {children}
    </div>
  )
}

export default Center
