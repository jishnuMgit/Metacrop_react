import { Center } from '@/components/ui'
import { Link, useRouteError } from 'react-router-dom'

export type ErrorType = {
  status?: number
  statusText?: string
  data?: string
  message?: string
}

function Error() {
  const err = useRouteError() as ErrorType
  const error = err

  return (
    <Center className="h-screen flex-col">
      <>
        <div className="text-9xl">{error?.status}</div>
        <div>{error.statusText ?? error.message}</div>
        <div>{error.data}</div>
        <Link className="text-blue-500" to={'/'}>
          Back to Home
        </Link>
      </>
    </Center>
  )
}

export default Error
