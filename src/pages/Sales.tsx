import { Cam, ErrorText, Input, ItemContainer, Modal } from '@/components/ui'
import { MicICon, ScanIcon, SearchIcon } from '@/components/icons'
import { Products, CurrentOrder, Invoice } from '@/components'
import { ProductType } from '@/db'
// import { fuzzySearch } from '@/utils/helpers'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { setQrData } from '@/redux/component'
import { useApi } from 'useipa'
import { fuzzySearch } from '@/utils/helpers'

function Sales() {
  const [products, setProducts] = useState<ProductType[]>()
  const productRef = useRef<ProductType[]>()
  // <ProductType[]>(
  //   productList.concat(productList)
  // )
  const [searchInputVal, setSearchInputVal] = useState('')
  const [cam, setCam] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { qrData } = useAppSelector((state) => state.uiState)
  const { data, fetchData, error, clearState } = useApi<{
    data: ProductType[]
  }>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      clearState()
    }
    console.log('change')
    setSearchInputVal(e.target.value)
    if (e.target.value !== '') {
      return setProducts(fuzzySearch(productRef.current!, e.target.value))
    }
    setProducts(productRef.current)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isString = isNaN(Number(searchInputVal))
      console.log(isString)

      fetchData(`/products/?${isString ? 'q' : 'id'}=${searchInputVal}`)
    }
  }
  const handleClose = () => {
    setCam(false)
  }
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
  const handleScanner = () => {
    setCam(true)
    // dispatch(showModal())
  }

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

  useEffect(() => {
    console.log('defwerwerf')

    fetchData('/products')
  }, [])

  return (
    <>
      <div className="flex md:px-6 md:flex-row flex-col">
        <ItemContainer>
          <>
            <div className="flex items-center mb-6 mt-5">
              <div className=" relative w-full ">
                <Input
                  name="search"
                  onChange={handleChange}
                  onKeyUp={handleEnter}
                  className="indent-7 mb-0 w-full h-8 rounded-xl placeholder:text-[#429CF0]"
                  type="text"
                  value={searchInputVal}
                  placeholder="Product Name"
                />
                <SearchIcon />
              </div>
              <div className="flex p-1">
                <ScanIcon onClick={handleScanner} />

                <Modal isOpen={cam} handleClose={handleClose}>
                  <Cam />
                </Modal>

                <MicICon />
              </div>
            </div>
            {error && <ErrorText message={error.message} />}
            <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-3 justify-items-center items-center mx-3 overflow-y-auto max-h-[22.5rem] pe-3 gap-y-2">
              <Products products={products!} />
            </div>
          </>
        </ItemContainer>
        <div className="flex flex-col md:w-1/2 mx-3 items-center ">
          <CurrentOrder />
          <Invoice />
        </div>
      </div>
    </>
  )
}

export default Sales
