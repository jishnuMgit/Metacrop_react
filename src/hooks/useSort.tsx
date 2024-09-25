import { SortOrder, SortTypes } from '@/utils/types'
import { useState } from 'react'

export const useSort = () => {
  const [sort, setSort] = useState<SortOrder>('desc')
  const [sortType, setSortType] = useState<SortTypes>('date')

  return { sort, setSort, sortType, setSortType }
}

export const usePagination = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<number>(10)

  return { page, limit, setPage, setLimit }
}
