import Input from '../components/Input'
import ItemContainer from '../components/ItemContainer'
import Logo from '../components/Logo'
import IconMic from '../components/icons/MicICon'
import IconScan from '../components/icons/ScanIcon'
import IconSearch from '../components/icons/SearchIcon'
import CurrentOrder from '../components/products/CurrentOrder'
import Invoice from '../components/products/Invoice'
import Products from '../components/products/Products'
import { products } from '../db'

function Home() {
  const productsDoubled = products.concat(products)
  return (
    <>
      <div>
        <Logo small />
        <div className="flex px-6">
          <ItemContainer>
            <>
              <div className="flex items-center mb-6 sticky z-50 top-0">
                <div className=" relative w-full">
                  <Input
                    className="indent-7 mb-0 w-full bg-inherit h-14 border border-black placeholder:text-black"
                    type="text"
                    placeholder="QR/ Bar Code/ Pid /Product Name"
                  />
                  <IconSearch />
                </div>
                <div className="flex p-1">
                  <IconScan />
                  <IconMic />
                </div>
              </div>
              <div className="grid grid-flow-row grid-cols-5 justify-items-center items-center mx-3">
                <Products products={productsDoubled} />
              </div>
            </>
          </ItemContainer>
          <CurrentOrder />
        </div>
        <Invoice />
      </div>
    </>
  )
}

export default Home
