import { Close } from '@/components/icons'
import { Center } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { hideModal, showModal } from '@/redux/component'
import { useEffect } from 'react'

type ModalProps = {
  children: React.JSX.Element
  center?: boolean
}

function Modal({ children, center = false }: ModalProps) {
  const dispatch = useAppDispatch()
  const modalState = useAppSelector((state) => state.uiState.modalState)
  const handleClick = () => {
    dispatch(hideModal())
  }
  useEffect(() => {
    dispatch(showModal())
  }, [])

  return (
    <>
      {modalState && (
        <div className="modal-overlay z-50">
          <div className="flex flex-col  top-[20%] md:top-[10%] md:left-1/4 h-[50%] md:h-[80%] w-full md:w-1/2 z-[1001] bg-white rounded-md shadow-2xl border ">
            {center ? (
              <Center>
                <>{children}</>
              </Center>
            ) : (
              <>{children}</>
            )}
          </div>
          <Close onclick={handleClick} />
        </div>
      )}
    </>
  )
}

export default Modal
