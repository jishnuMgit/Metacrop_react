import { qs } from '@/utils/helpers'
import { ApiItem, QueryParamOpts } from '@/utils/types'
import { useEffect } from 'react'
import { useApi } from 'useipa'

export const useItemList = (opts: QueryParamOpts) => {
  const { fetchData, ...rest } = useApi<{ data: ApiItem[] }>()

  useEffect(() => {
    fetchData('/products/' + qs(opts))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...rest }
}
