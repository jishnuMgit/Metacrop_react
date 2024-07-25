import { COOKIE_TTL } from '@/config/constants'
import Fuse, { IFuseOptions } from 'fuse.js'
import Cookies from 'js-cookie'
import { ApiSalesData } from './types'

export const fuzzySearch = <T>(list: T[], query: string): T[] => {
  const fuseOptions: IFuseOptions<T> = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    includeScore: true,
    keys: ['ItemName'],
  }
  const searchResult = new Fuse(list, fuseOptions)
  return searchResult.search(query).map((val) => val.item)
}

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, { expires: COOKIE_TTL })
}

export const getCookie = (key: string) => {
  const cookie = Cookies.get(key)
  if (cookie) {
    return cookie
  }
  return false
}
export const removeCookie = (key: string) => {
  Cookies.remove(key)
}

export const dateParser = (dateString: string): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return date.toString()
  }
  return date.toLocaleDateString()
}

export const isDarkMode = () => {
  return !!localStorage.getItem('darkMode')
}

export const setDarkMode = (dark: boolean) => {
  localStorage.setItem('darkMode', dark + '')
}

export const createInvoiceList = (data?: ApiSalesData) => {
  if (data) {
    return [
      {
        name: 'Sale Date',
        value: new Date(data?.CreatedOn).toLocaleDateString(),
      },
      {
        name: 'Modified Date',
        value: new Date(data.ModifiedOn).toLocaleDateString(),
      },
      {
        name: 'Sale Id',
        value: data.PKSaleID,
      },
      {
        name: 'Total Items',
        value: data.SoldItems.length,
      },
      {
        name: 'Total Amount',
        value: `$` + data.TotalAmount,
      },
    ]
  }
  return []
}
