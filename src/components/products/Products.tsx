type ProductsProps = {
  products: string[]
}
function Products({ products }: ProductsProps) {
  return (
    <>
      {products.map((val, i) => (
        <div className="mb-5 m-1 " key={i}>
          <div className="flex flex-col items-center">
            <p className="text-3xl mb-1">{val}</p>
            Fruits
          </div>
        </div>
      ))}
    </>
  )
}

export default Products
