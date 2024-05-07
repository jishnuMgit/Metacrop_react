import Input from '../components/Input'
import ItemContainer from '../components/ItemContainer'
import Logo from '../components/Logo'
import IconMic from '../components/icons/MicICon'
import IconScan from '../components/icons/ScanIcon'
import IconSearch from '../components/icons/SearchIcon'
import CurrentOrder from '../components/products/CurrentOrder'
import Products from '../components/products/Products'
import { products } from '../db'

function Home() {
  return (
    <>
      <Logo small />
      <div className="flex p-3">
        <ItemContainer>
          <>
            <div className="flex items-center mb-3">
              <div className="relative w-full">
                <Input
                  className="indent-5 mb-0"
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
            <div className="grid grid-flow-row grid-cols-5 gap-3  justify-items-center items-center">
              <Products products={products} />
            </div>
          </>
        </ItemContainer>
        <CurrentOrder />
      </div>
    </>
  )
}

export default Home
