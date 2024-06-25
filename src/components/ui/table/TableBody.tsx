import Spinner from '../Spinner'

function TableBody({
  children,
  fetching,
}: {
  children: React.ReactNode
  fetching?: boolean
}) {
  return (
    <tbody>{fetching ? <Spinner className="w-full" /> : <>{children}</>}</tbody>
  )
}

export default TableBody
