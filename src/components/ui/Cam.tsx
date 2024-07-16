import { useEffect } from 'react'
import { QrPlugin } from '@/components'
import { QrcodeSuccessCallback } from 'html5-qrcode'
import { useAppDispatch } from '@/config/hooks'
import { hideModal, setQrData } from '@/redux/component'

function Cam({ handleClose }: { handleClose: () => void }) {
  const dispatch = useAppDispatch()
  const successCallback: QrcodeSuccessCallback = (
    decodedText,
    decodedResult
  ) => {
    dispatch(setQrData(decodedText))
    dispatch(hideModal())
    handleClose()
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
      <QrPlugin fps={60} qrbox={250} onSuccess={successCallback} />
    </>
  )
}

export default Cam
