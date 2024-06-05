import { Center } from '@/components/ui'
import { useRouteError } from 'react-router-dom'

type ErrorType = {
  status?: number
  statusText?: string
  data?: string
  message?: string
}
function Error() {
  const err = useRouteError()
  const error = err as ErrorType
  console.log(error)

  return (
    <Center className="h-screen flex-col">
      <>
        <div className="text-9xl">{error?.status}</div>
        <div>{error.statusText ?? error.message}</div>
        <div>{error.data}</div>
      </>
    </Center>
  )
}

export default Error
