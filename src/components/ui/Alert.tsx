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
    const timer = setTimeout(() => onClose(), timeout ?? 10000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Alert
        open={open}
        onClose={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {children}
      </Alert>
    </>
  )
}
