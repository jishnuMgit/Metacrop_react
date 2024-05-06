import Item from './Item'

type ProductsProps = {
  products: string[]
  setCurrent: (items: any[]) => void
}

function Products({ products, setCurrent }: ProductsProps) {
  const handleCurrent = (a: string) => {
    console.log(a)
    setCurrent((prev: any[]) => {
      if (prev.find((val) => val.id == a)) {
        return prev
      }
      console.log(prev.find((val) => val.id != a))
      return [
        ...prev,
        { id: a, count: 1, name: parseInt(a) % 2 === 0 ? 'Milk' : 'Lime' },
      ]
    })
  }
  return (
    <>
      {products.map((_val, i) => (
        <Item i={i} key={i} onClick={handleCurrent} />
      ))}
    </>
  )
}

export default Products
