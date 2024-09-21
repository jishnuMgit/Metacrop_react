import { useEffect, useState } from 'react'
import { useApi } from 'useipa'

export function useSearch<T>(query: string, endpoint: string) {
  const { fetchData, data: response } = useApi<{ data: T }>()
  const [searchQuery, setSearchQuery] = useState(query)
  const [enter, setEnter] = useState(false)
  const [searchData1, setSearchData] = useState<T>()

  useEffect(() => {
    if (enter) {
      handleApiCall()
      setEnter(false)
    }
    if (response?.data) {
      setSearchData(response?.data)
    }
  }, [enter, response])

  const handleApiCall = () => {
    fetchData(endpoint.concat(searchQuery))
  }
  const handleQuery = (value: string) => {
    setSearchQuery(value)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery !== '') {
      setEnter(true)
    }
  }
  const resetState = () => {
    setSearchData(undefined)
    setEnter(false)
    setSearchQuery('')
  }

  return {
    // wrap data with [] for array
    searchData: searchData1 && [searchData1],
    handleQuery,
    handleEnter,
    resetState,
  }
}
