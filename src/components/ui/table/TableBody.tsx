import Spinner from '../Spinner'

function TableBody({
  children,
  fetching,
}: {
  children: React.ReactNode
  fetching?: boolean
}) {
  return (
    <tbody>
      {fetching ? (
        <tr>
          <td>
            <Spinner className="w-svw" />
          </td>
        </tr>
      ) : (
        <>{children}</>
      )}
    </tbody>
  )
}

export default TableBody
