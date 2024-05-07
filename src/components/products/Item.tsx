import { baseImgUrl } from '../../config/constants'
import { useAppDispatch } from '../../config/hooks'
import { ProductType } from '../../db'
import { addToOrders } from '../../redux/order'

type ItemProps = {
  item: ProductType
}

function Item({ item }: ItemProps) {
  const dispatch = useAppDispatch()
  return (
    <div
      onClick={() => dispatch(addToOrders(item))}
      className="mb-5 p-1 rounded-md cursor-pointer hover:bg-blue-400"
    >
      <div className="flex flex-col items-center">
        <img className="h-10" src={`${baseImgUrl}${item.imageSrc}`} />
        <p>{item.name}</p>
      </div>
    </div>
  )
}

export default Item
