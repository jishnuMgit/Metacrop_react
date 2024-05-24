import { useEffect } from 'react'
import { Modal } from '@/components/ui'
import { QrPlugin } from '@/components'
import { QrcodeSuccessCallback } from 'html5-qrcode'

function Cam() {
  const successCallback: QrcodeSuccessCallback = (
    decodedText,
    decodedResult
  ) => {
    alert(decodedText)
    alert(decodedResult)
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
