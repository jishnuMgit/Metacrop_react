import { Cam, Input, ItemContainer } from '@/components/ui'
import { MicICon, ScanIcon, SearchIcon } from '@/components/icons'
import { Products, CurrentOrder, Invoice } from '@/components'
import { ProductType, products as productList } from '@/db'
import { fuzzySearch } from '@/utils/helpers'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { setQrData, showModal } from '@/redux/component'

function Home() {
  const [products, setProducts] = useState<ProductType[]>(
    productList.concat(productList)
  )
  const [searchInputVal, setSearchInputVal] = useState('')
  const dispatch = useAppDispatch()
  const { modalState, qrData } = useAppSelector((state) => state.uiState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('change')
    setSearchInputVal(e.target.value)
    if (e.target.value !== '') {
      return setProducts(fuzzySearch(productList, e.target.value))
    }
    setProducts(productList.concat(productList))
  }

  //when scanner icon click
  const handleScanner = () => {
    dispatch(showModal())
  }

  useEffect(() => {
    if (qrData !== '') {
      setSearchInputVal(qrData)
      setProducts(fuzzySearch(productList, qrData))
    }

    return () => {
      //unmount home clear qrdata.
      dispatch(setQrData(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData])

  return (
    <>
      <div className="flex md:px-6 md:flex-row flex-col">
        <ItemContainer>
          <>
            <div className="flex items-center mb-6 mt-5">
              <div className=" relative w-full ">
                <Input
                  onChange={handleChange}
                  className="indent-7 mb-0 w-full h-8 rounded-xl placeholder:text-[#429CF0]"
                  type="text"
                  value={searchInputVal}
                  placeholder="Product Name"
                />
                <SearchIcon />
              </div>
              <div className="flex p-1">
                <ScanIcon onClick={handleScanner} />
                {modalState && <Cam />}
                <MicICon />
              </div>
            </div>
            <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-3 justify-items-center items-center mx-3 overflow-y-auto max-h-[22.5rem] pe-3 gap-y-2">
              <Products products={products} />
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

export default Home
