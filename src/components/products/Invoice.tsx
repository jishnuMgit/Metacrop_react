import ItemContainer from '../ItemContainer'

function Invoice() {
  return (
    <ItemContainer className="w-11/12  items-center mx-auto">
      <div className="flex justify-evenly w-full">
        <div>Current Order</div>
        <div>ABCD1234</div>
      </div>
    </ItemContainer>
  )
}

export default Invoice
