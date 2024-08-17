import { COOKIE_TTL } from '@/config/constants'
import Fuse, { IFuseOptions } from 'fuse.js'
import Cookies from 'js-cookie'
import { ApiSalesData, ApiSalesReturn } from './types'

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

export const createInvoiceValues = (data: ApiSalesData) => {
  return [
    new Date(data?.CreatedOn).toLocaleDateString(),
    new Date(data.ModifiedOn).toLocaleDateString(),
    data.PKSaleID,
    data.SoldItems.length,
    `$` + data.TotalAmount,
  ]
}

export const createReturnInvoice = (data: ApiSalesReturn) => {
  return [
    dateParser(data.CreatedOn),
    data.PKReturnID,
    data.SalesReturnItems?.length,
    data.TotalReturnAmount,
  ]
}

export const createInvoiceList = (nameArr: string[], valArr: (string | number)[]) => {
  if (nameArr && valArr) {
    return nameArr
      .map((name, index) => ({ name, value: valArr[index] }))
      .filter((val) => !!val.value)
  }
  return []
}
