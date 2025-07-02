import { AddSaleItems, ApiSalesData } from '@/utils/types'
import { useEffect } from 'react'
import { useApi } from 'useipa'
import { usePagination, useSort } from './useSort'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { fetchSale } from '@/redux/sale'

export const useGetSales = (filterData?: any) => {
  const { setSort, setSortType, sort, sortType } = useSort()
  const { limit, page, setLimit, setPage } = usePagination()
  const { fetchData, ...rest } = useApi<{ data?: ApiSalesData[] }>()

  useEffect(() => {
    console.log('filterData',filterData);
    
    fetchData(`/sales?sort=${sort}&sortOption=${sortType}&page=${page}&limit=${limit}&Sdate=${filterData?.startDate}&Edate=${filterData?.endDate}&Product=${filterData?.range?.value}&customer=${filterData?.customer?.value}`)
    console.log(`/sales?sort=${sort}&sortOption=${sortType}&page=${page}&limit=${limit}&Sdate=${filterData?.startDate}&Edate=${filterData?.endDate}&Product=${filterData?.range?.value}&customer=${filterData?.customer?.value}`);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortType, sort,filterData])

  return { ...rest, setLimit, setPage, setSort, setSortType, sortType, page, limit, sort }
}

export const useGetSaleById = (id?: string) => {
  const { error, fetching, saleData: data } = useAppSelector((state) => state.sale)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(fetchSale(id!))
  }, [dispatch, id])

  if (error) {
    throw new Response('NO sale found', {
      status: 404,
      statusText: 'No sales found given id',
    })
  }

  return { fetching, data }
}

type AddSalePayload = {
  items: AddSaleItems
  discount?: number | string
  totalAmount: number
  user:any
  selectedOption:string
selectedStore:any
  selectedDate:string
  remark:string
}
export const useAddSale = () => {
  const { mutate, success, error, fetching, data, clearState } = useApi<{ data?: ApiSalesData }>()
  const handleMutate = (payload: AddSalePayload) => {
    mutate('/sales', payload)
  }

  return { handleMutate, success, fetching, data, clearState, error }
}
