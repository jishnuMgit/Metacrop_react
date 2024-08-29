import React from 'react'
import { Drawer, Typography, IconButton } from '@material-tailwind/react'

type SidebarProps = {
  side: 'left' | 'right'
  handleClose: () => void
  children?: React.JSX.Element
  open: boolean
}
function Sidebar({ side, handleClose, children, open }: SidebarProps) {
  return (
    <Drawer placement={side} open={open} onClose={handleClose} className="p-4 m-0 dark:bg-black">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="dark:text-white">
          Metacorp
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          aria-label="close settings"
          title="Close"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>
      {/* <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography> */}

      {children}
    </Drawer>
  )
}
export default Sidebar
