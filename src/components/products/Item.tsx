import milk from '../../assets/images/milk.jpeg'
import orange from '../../assets/images/orange-1558624428.jpg'

type ItemProps = {
  i: number
  onClick: (a: string) => void
}
function Item({ i, onClick }: ItemProps) {
  return (
    <div
      onClick={() => onClick('' + i)}
      className="mb-5 p-1 rounded-md cursor-pointer hover:bg-blue-400"
    >
      <div className="flex flex-col items-center">
        <img className="h-10" src={i % 2 === 0 ? milk : orange} />
        <p>{i % 2 === 0 ? 'Milk' : 'Lime'}</p>
      </div>
    </div>
  )
}

export default Item
