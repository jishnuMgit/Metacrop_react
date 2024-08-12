import { Alert } from '@material-tailwind/react'
import { useEffect } from 'react'

export function AnimatedAlert({
  open,
  onClose,
  children,
  timeout,
}: {
  open: boolean
  onClose: () => void
  children: string
  timeout?: number
}) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), timeout ?? 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [open])

  return (
    <>
      <div className="fixed bottom-10 left-[4.34444%;] w-11/12">
        <Alert
          className="dark:bg-dark-btn-color"
          open={open}
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
