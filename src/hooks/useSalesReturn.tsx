import { ApiSalesReturn } from '@/utils/types'
import { useEffect } from 'react'
import { useApi } from 'useipa'
import { usePagination, useSort } from './useSort'
import { InferType } from 'yup'
import { SalesReturnSchema } from '@/schema'

export const useGetSalesReturnById = (id?: string) => {
  const { fetchData, data: response, ...rest } = useApi<{ data?: ApiSalesReturn }>()

  useEffect(() => {
    fetchData(`/sales/returns/${id}`)
  }, [id])

  if (rest.error) {
    throw new Response('NO sale found', {
      status: 404,
      statusText: 'No sales return found given id',
    })
  }

  return { response, ...rest }
}

export const useGetSalesReturnList = () => {
  const { sort, sortType, setSortType } = useSort()
  const { page, limit, setPage } = usePagination()
  const { fetchData, data, fetching } = useApi<{ data?: ApiSalesReturn[] }>()

  useEffect(() => {
    fetchData(`/sales/returns/?sort=${sort}&sortOption=${sortType}&page=${page}&limit=${limit}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortType, page, limit])

  return { data, fetching, sort, sortType, page, limit, setSortType, setPage }
}

export const useAddSalesReturn = () => {
  const { mutate, fetching, success, error, clearState, data } = useApi<{ data: ApiSalesReturn }>()

  const handleMutate = (payload: InferType<typeof SalesReturnSchema>) => {
    mutate('/sales/return-items', payload)
  }

  return { handleMutate, fetching, response: data, success, clearState, error }
}
