import Button from '../Button'
import ItemContainer from '../ItemContainer'
import milk from '../../assets/images/milk.jpeg'
import SmallBtn from '../SmallBtn'

type currentOrderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderList: any[]
}

function CurrentOrder({ orderList }: currentOrderProps) {
  return (
    <>
      {orderList.length !== 0 && (
        <ItemContainer>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Current Order</h1>
              <Button type="button">Clear All</Button>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {orderList.map((val, index) => (
              <div className="flex mb-7" key={index}>
                <div className="flex  w-1/2">
                  <div className="flex w-1/2">
                    <img className="h-10" src={milk} alt="" />
                  </div>

                  {val.name}
                </div>
                <div className="flex items-center justify-center w-1/2">
                  <div className="flex items-center justify-items-center">
                    <SmallBtn children={'-'} />
                    <p className="mx-4"> {val.count}</p>
                    <SmallBtn children={'+'} />
                  </div>
                  <div className="flex justify-end w-full">
                    <p>₹30</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ItemContainer>
      )}
    </>
  )
}

export default CurrentOrder
