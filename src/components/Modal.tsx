import Button from './Button'
import Input from './Input'

function Modal() {
  return (
    <div className="flex flex-col   absolute top-[10%] left-1/4 h-[80%] w-1/2 z-10 bg-white rounded-md shadow-2xl border ">
      <div className="flex flex-col items-center mb-4 ">
        <div className="">
          <img
            className="h-36 my-4"
            src="src/assets/images/orange.jpg"
            alt=""
          />
          <p className="text-center font-semibold text-4xl">Orange</p>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="flex mx-3 mb-5 items-center ">
          <div className="">Unit Price :</div>
          <Input className="border-black" type="text" />
        </div>

        <div className="flex mx-3 items-center">
          <div className="">Quantity :</div>
          <Input className="border-black" type="text" />
        </div>
      </div>
      <div className="flex justify-evenly mt-4">
        <Button children={'Close'} />
        <Button children={'Add'} />
      </div>
    </div>
  )
}

export default Modal
