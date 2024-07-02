import { baseImgUrl } from '@/config/constants'
import { useAppDispatch } from '@/config/hooks'
import { addToOrders } from '@/redux/order'
import { ApiItem } from '@/utils/types'

type ItemProps = {
  item: ApiItem
}

function Item({ item }: ItemProps) {
  const dispatch = useAppDispatch()
  return (
    <div
      onClick={() => dispatch(addToOrders(item))}
      className=" p-1 cursor-pointer hover:bg-blue-400 w-full h-full border border-sm py-3"
    >
      <div className="flex flex-col items-center">
        <img
          className="h-10 mb-3"
          src={`${baseImgUrl}${item.PKItemID % 5 == 0 ? 'milk.png' : 'groceries.png'}`}
        />
        <p className="text-[#28251f] text-sm">{item.ItemName}</p>
        <span className="font-semibold">{item.HSNCode}</span>
      </div>
    </div>
  )
}

export default Item
