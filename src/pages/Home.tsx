import Input from '@/components/Input'
import ItemContainer from '@/components/ItemContainer'
import IconMic from '@/components/icons/MicICon'
import IconScan from '@/components/icons/ScanIcon'
import IconSearch from '@/components/icons/SearchIcon'
import CurrentOrder from '@/components/products/CurrentOrder'
import Invoice from '@/components/invoice/Invoice'
import Products from '@/components/products/Products'
import { products } from '@/db'

function Home() {
  const productsDoubled = products.concat(products)
  return (
    <>
      <div className="flex md:px-6 md:flex-row flex-col">
        <ItemContainer>
          <>
            <div className="flex items-center mb-6 sticky z-10 top-0 mt-5">
              <div className=" relative w-full ">
                <Input
                  className="indent-7 mb-0 w-full h-8 rounded-xl placeholder:text-[#429CF0]"
                  type="text"
                  placeholder="Product Name"
                />
                <IconSearch />
              </div>
              <div className="flex p-1">
                <IconScan />
                <IconMic />
              </div>
            </div>
            <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-3 justify-items-center items-center mx-3 overflow-y-auto max-h-[22.5rem] pe-3 gap-y-2">
              <Products products={productsDoubled} />
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
