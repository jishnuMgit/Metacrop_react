import clsx from 'clsx'
import { Close } from '../icons'

type SidebarProps = {
  side: 'left' | 'right'
  handleClose?: () => void
  children?: React.JSX.Element
}
function Sidebar({ side, handleClose, children }: SidebarProps) {
  return (
    <div
      className={clsx('h-full z-10 top-0 bg-white fixed w-1/4', {
        'left-0': side === 'left',
        'right-0': side === 'right',
      })}
    >
      <Close duration={0} fill="black" onclick={handleClose} />
      {children}
    </div>
  )
}

export default Sidebar
