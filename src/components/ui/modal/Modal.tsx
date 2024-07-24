import { Close } from '@/components/icons'
import { Center } from '@/components/ui'

type ModalProps = {
  children: React.JSX.Element
  center?: boolean
  isOpen: boolean
  handleClose: () => void
}

function Modal({ children, center = false, isOpen, handleClose }: ModalProps) {
  if (!isOpen) {
    return null
  }
  return (
    <>
      {isOpen && (
        <div className="modal-overlay z-50 backdrop-blur-sm">
          <div className="flex flex-col  top-[20%] md:top-[10%] md:left-1/4 h-[50%] md:h-[80%] w-full md:w-1/2 z-[1001] bg-white dark:bg-dark-primary-bg rounded-md shadow-2xl border dark:border-none ">
            {center ? (
              <Center className="h-full ">
                <>{children}</>
              </Center>
            ) : (
              <>{children}</>
            )}
          </div>
          <Close onclick={handleClose} />
        </div>
      )}
    </>
  )
}

export default Modal
