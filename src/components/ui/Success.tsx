import Center from './Center'
import tickIcon from '@/assets/images/icon-tick.png'

function Success() {
  return (
    <Center className="flex-col h-full">
      <>
        <img className="h-32 w-32" src={tickIcon} />
        <div className=" text-3xl font-semibold">Success</div>
      </>
    </Center>
  )
}

export default Success
