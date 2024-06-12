import {
  Cam,
  ErrorText,
  Input,
  ItemContainer,
  Modal,
  Spinner,
} from '@/components/ui'
import { MicICon, ScanIcon, SearchIcon } from '@/components/icons'
import { Products, CurrentOrder, Invoice } from '@/components'
import { ProductType } from '@/db'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { setQrData } from '@/redux/component'
import { useApi } from 'useipa'
import { fuzzySearch } from '@/utils/helpers'
import { Button } from '@material-tailwind/react'

function Sales() {
  const [products, setProducts] = useState<ProductType[]>()
  const productRef = useRef<ProductType[]>()
  const [searchInputVal, setSearchInputVal] = useState('')
  const [cam, setCam] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { qrData } = useAppSelector((state) => state.uiState)
  const { data, error, fetching, clearState, fetchData } = useApi<{
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
  // when Enter key press in search input.
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInputVal !== '') {
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
    fetchData('/products')
  }, [])

  return (
    <>
      <div className="flex md:px-1 md:flex-row flex-col transition-all">
        <ItemContainer>
          <>
            <div className="flex w-full justify-between ">
              <Button className="w-32  rounded-sm">Category</Button>
              <Button className="w-32  rounded-sm">Recent</Button>
              <Button className="w-32  rounded-sm">Most</Button>
            </div>
            <div className="flex items-center mb-6 mt-5">
              <div className=" relative w-full ">
                <Input
                  name="search"
                  onChange={handleChange}
                  onKeyUp={handleEnter}
                  className="indent-7 mb-0 w-full h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0]"
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
            {fetching && <Spinner />}
            {error && <ErrorText message={error.message} />}
            <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-3 justify-items-center items-center overflow-y-auto max-h-[22.5rem] pe-3 ">
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
