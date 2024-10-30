import { Alert, AlertProps } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

type AnimatedAlertProps = {
  open: boolean
  onClose?: () => void
  children: string | React.JSX.Element | React.JSX.Element[]
  timeout?: number
  className?: string
} & AlertProps

export function AnimatedAlert({ open, onClose, children, timeout, ...props }: AnimatedAlertProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(() => false)
      if (onClose) {
        onClose()
      }
    }, timeout ?? 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [open])

  return (
    <>
      <div className="fixed bottom-10 left-[4.34444%;] w-11/12">
        <Alert
          {...props}
          open={isOpen}
          onClose={onClose}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          {children}
        </Alert>
      </div>
    </>
  )
}
