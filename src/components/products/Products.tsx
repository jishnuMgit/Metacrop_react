import Item from './Item'
import { ApiItem } from '@/utils/types'

type ProductsProps = {
  products: ApiItem[]
}

function Products({ products }: ProductsProps) {
  return <>{products?.map((val, i) => <Item item={val} key={i} />)}</>
}

export default Products
