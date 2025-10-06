import React, {
  ChangeEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react'
import { ErrorText, Input, ItemContainer, Spinner } from '../ui'
import { SearchIcon } from '../icons'
import ProductContainer from './ProductContainer'
import { ApiItem, SortOption } from '@/utils/types'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { useApi } from 'useipa'
import { fuzzySearch } from '@/utils/helpers'
import { setQrData } from '@/redux/component'
import clsx from 'clsx'
import Item from './Item'

interface Items {
  PKItemID: number
  FKCmpID: number
  FKGroupID: number
  FKStoreID: number
  FKUnitID: number
  FKManufactureID: number
  ItemCode: string
  HSNCode: string
  ItemName: string
  Class: string
  Qty: number
  Price: string
  Lcost: number
  ReOrderLevel: number
  MaxLevel: number
  TaxPer: number
  DelFlag: number
  RepFlag: number
  CreatedBy: number
  CreatedOn: string
  ModifiedBy: number
  ModifiedOn: string
}

type PosBaseProps = {
  children?: ReactNode
  sort?: SortOption
  className?: string
  ProductData: Items[]
  itemClickHandler: (item: ApiItem) => void
}

function PosBase({
  children,
  sort,
  className,
  itemClickHandler,
  ProductData,
}: PosBaseProps) {
  const currentStore = useAppSelector((state) => state.uiState.store)
  const [products, setProducts] = useState<ApiItem[]>()
  const productRef = useRef<ApiItem[]>()
  const [searchInputVal, setSearchInputVal] = useState('')
  const [controller, setController] = useState<AbortController | null>(null)

  const dispatch = useAppDispatch()
  const { qrData } = useAppSelector((state) => state.uiState)
  const { data, error, fetching, clearState, fetchData } = useApi<{
    data: ApiItem[]
  }>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) clearState()
    setSearchInputVal(e.target.value)
    if (e.target.value !== '') {
      return setProducts(fuzzySearch(productRef.current!, e.target.value))
    }
    setProducts(productRef.current)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (controller) controller.abort()
    const newController = new AbortController()
    setController(newController)
    if (e.key === 'Enter' && searchInputVal !== '') {
      const isString = isNaN(Number(searchInputVal))
      fetchData(`/products/?${isString ? 'q' : 'id'}=${searchInputVal}`, {
        signal: newController.signal,
      })
    }
  }

  useEffect(() => {
    if (data) {
      const items = Array.isArray(data.data) ? data.data : [data.data]
      if (!productRef.current) productRef.current = items
      setProducts(items)
    }
  }, [data])

  useEffect(() => {
    if (qrData !== '') {
      setSearchInputVal(qrData)
      setProducts(fuzzySearch(products!, qrData))
    }
    return () => {
      dispatch(setQrData(''))
    }
  }, [qrData])

  useEffect(() => {
    const storeCode = currentStore[0] ?? ''
    const path =
      sort?.option === 'most-saled'
        ? `/products/${sort?.option ?? '?sort=none'}/${storeCode}`
        : `/products/${storeCode}`
    fetchData(clsx(path))
  }, [sort?.option, currentStore])

  useEffect(() => {
    return () => {
      if (controller) controller.abort()
    }
  }, [controller])

  const formattedProductData: ApiItem[] = useMemo(() => {
    return ProductData?.map((val) => ({
      ...val,
      id: val.PKItemID,
      taxAmt: 0,
      qty: val.Qty || 1,
      Price: Number(val.Price),
      ModifiedOn: new Date(val.ModifiedOn).getTime(),
    }))
  }, [ProductData])

  return (
    <ItemContainer className={clsx(className, ' min-h-screen')}>
{children as React.ReactElement}

      <div className="flex items-center mb-6 mt-5">
        {!ProductData && (
          <div className="relative w-full">
            <Input
              name="search"
              onChange={handleChange}
              onKeyUp={handleEnter}
              className="indent-7 mb-0 w-full h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0] dark:placeholder:text-dark-text-color dark:bg-black dark:border-none dark:focus-visible:outline-none"
              type="text"
              value={searchInputVal}
              placeholder="Product Name / Barcode"
            />
            <SearchIcon />
          </div>
        )}
        {ProductData && <hr className="my-4 w-full border-gray-300" />}
      </div>

      <>
        {fetching && <Spinner />}
        {error && (
          <ErrorText
            message={error.message.substring(0, 60).concat(' ...', `'`)}
          />
        )}
      </>

      <ProductContainer>
        <>
          {ProductData?.length === 0 && products && (
            <p>Select the Bill Number First</p>
          )}
          {ProductData
            ? formattedProductData.map((item, i) => (
                <Item
                  onClick={() => itemClickHandler(item)}
                  item={item}
                  key={i}
                />
              ))
            : products?.map((val, i) => (
                <Item
                  onClick={() => itemClickHandler(val)}
                  item={val}
                  key={i}
                />
              ))}
        </>
      </ProductContainer>
    </ItemContainer>
  )
}

export const PosBaseMemo = memo(PosBase)
