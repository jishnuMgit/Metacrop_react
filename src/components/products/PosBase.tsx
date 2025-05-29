import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
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
  PKItemID: number;
  FKCmpID: number;
  FKGroupID: number;
  FKStoreID: number;
  FKUnitID: number;
  FKManufactureID: number;
  ItemCode: string;
  HSNCode: string;
  ItemName: string;
  Class: string;
  Qty: number;
  Price: string;        // price as string based on your data
  Lcost: number;
  ReOrderLevel: number;
  MaxLevel: number;
  TaxPer: number;
  DelFlag: number;
  RepFlag: number;
  CreatedBy: number;
  CreatedOn: string;    // ISO date string
  ModifiedBy: number;
  ModifiedOn: string;   // ISO date string
}

type PosBaseProps = {
  children?: React.JSX.Element | React.JSX.Element[]
  sort?: SortOption
  className?: string
  ProductData:Items[]
  itemClickHandler: (item: ApiItem) => void
}

function PosBase({ children, sort, className, itemClickHandler,ProductData }: PosBaseProps) {

  // 👇 Accessing the store value from Redux
  const currentStore = useAppSelector((state) => state.uiState.store)
  const [products, setProducts] = useState<ApiItem[]>()
  const productRef = useRef<ApiItem[]>()
  const [searchInputVal, setSearchInputVal] = useState('')
  // const [cam, setCam] = useState<boolean>(false)
  const [controller, setController] = useState<AbortController | null>(null)

  const dispatch = useAppDispatch()
  const { qrData } = useAppSelector((state) => state.uiState)
  const { data, error, fetching, clearState, fetchData } = useApi<{
    data: ApiItem[]
  }>()



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      clearState()
    }
    setSearchInputVal(e.target.value)
    if (e.target.value !== '') {
      return setProducts(fuzzySearch(productRef.current!, e.target.value))
    }
    setProducts(productRef.current)
  }

  // when Enter key press in search input.
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (controller) {
      controller.abort()
    }
    const newController = new AbortController()
    setController(newController)
    if (e.key === 'Enter' && searchInputVal !== '') {
      const isString = isNaN(Number(searchInputVal))
      console.log(isString)

      fetchData(`/products/?${isString ? 'q' : 'id'}=${searchInputVal}`, {
        signal: newController.signal,
      })
    }
  }
  // const handleClose = () => {
  //   setCam(false)
  // }

  useEffect(() => {
    if (data) {
      if (!Array.isArray(data.data)) {
        data.data = [data.data]
      }
      console.log(data.data)
      if (!productRef.current) {
        productRef.current = data.data
      }
      setProducts(data.data)
    }
  }, [data])

  //when scanner icon click
  // const handleScanner = () => {
  //   setCam(true)
  //   // dispatch(showModal())
  // }

  useEffect(() => {
    if (qrData !== '') {
      setSearchInputVal(qrData)
      setProducts(fuzzySearch(products!, qrData))
    }
    return () => {
      //unmount home clear qrdata.
      dispatch(setQrData(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData])
// alert()
  useEffect(() => {

    sort?.option==="most-saled"?fetchData(clsx(`/products/${sort?.option ?? '?sort=none'}/${currentStore.value}`)):
fetchData(clsx(`/products/${ currentStore?.value}`))
  }, [sort?.option,currentStore])

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort()
      }
    }
  }, [controller])

  return (
    <ItemContainer className={className + 'lg:w-1/3 min-h-screen'}>
      <> {children}</>
      <div className="flex items-center mb-6 mt-5">
        { !ProductData &&<div className=" relative w-full ">
         <Input
            name="search"
            onChange={handleChange}
            onKeyUp={handleEnter}
            className=" indent-7 mb-0 w-full h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0] dark:placeholder:text-dark-text-color dark:bg-black dark:border-none dark:focus-visible:outline-none"
            type="text"
            value={searchInputVal}
            placeholder="Product Name"
          />
          <SearchIcon />
        </div>
}
{ProductData && <hr className="my-4 w-full border-gray-300" />}

        {/* <div className="flex p-1">
          <ScanIcon onClick={handleScanner} />
          <Modal isOpen={cam} handleClose={handleClose}>
            <Cam handleClose={handleClose} />
          </Modal>
          <MicIcon />
        </div> */}
      </div>
      <>
        {fetching && <Spinner />}
        {error && <ErrorText message={error.message.substring(0, 60).concat(' ...', `'`)} />}
      </>
      <ProductContainer>
        <>{
(ProductData?.length===0 && products) && <p>Select the Bill Number First</p>
          
        }
          {ProductData?ProductData.map((val, i) => (
            <Item onClick={() => itemClickHandler(val)} item={val} key={i} />
          )):         products?.map((val, i) => (
            <Item onClick={() => itemClickHandler(val)} item={val} key={i} />
          ))}
        </>
      </ProductContainer>
    </ItemContainer>
  )
}

export const PosBaseMemo = memo(PosBase)





