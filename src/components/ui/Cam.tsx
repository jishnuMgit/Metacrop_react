import { useEffect } from 'react'
import { Modal } from '@/components/ui'
import { QrPlugin } from '@/components'
import { QrcodeSuccessCallback } from 'html5-qrcode'
import { useAppDispatch } from '@/config/hooks'
import { hideModal, setQrData } from '@/redux/component'

function Cam() {
  const dispatch = useAppDispatch()
  const successCallback: QrcodeSuccessCallback = (
    decodedText,
    decodedResult
  ) => {
    dispatch(setQrData(decodedText))
    dispatch(hideModal())
    console.log(decodedResult)
  }
  useEffect(() => {
    console.log('cam activated')
    return () => {
      console.log('cam deleeted')
    }
  }, [])

  return (
    <>
      <Modal>
        <>
          <QrPlugin fps={60} qrbox={250} onSuccess={successCallback} />
        </>
      </Modal>
    </>
  )
}

export default Cam
