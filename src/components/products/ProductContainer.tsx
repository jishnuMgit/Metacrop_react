import { ApiItem } from '@/utils/types'
import Item from './Item'

function ProductContainer({ products }: { products: ApiItem[] }) {
  return (
    <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-3 justify-items-center items-center overflow-y-auto max-h-[22.5rem] pe-3 ">
      <>{products?.map((val, i) => <Item item={val} key={i} />)}</>
    </div>
  )
}

export default ProductContainer
