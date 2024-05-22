import { ProductType } from '@/db'
import Item from './Item'

type ProductsProps = {
  products: ProductType[]
}

function Products({ products }: ProductsProps) {
  return <>{products?.map((val, i) => <Item item={val} key={i} />)}</>
}

export default Products
