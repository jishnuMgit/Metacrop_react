import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button, Modal } from '@/components/ui'

function Cam() {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const webCamRef = useRef<Webcam>(null)
  const capture = useCallback(() => {
    const imgsrc = webCamRef.current?.getScreenshot()
    console.log(imgsrc)
    if (imgsrc) {
      setImgSrc(imgsrc)
    }
  }, [webCamRef])

  return (
    <>
      <Modal>
        <>
          <Webcam audio={false} ref={webCamRef} screenshotFormat="image/jpeg" />
          <Button onClick={capture}>{'Capture'}</Button>
          {imgSrc && <img className="absolute" src={imgSrc} alt="" />}
        </>
      </Modal>
    </>
  )
}

export default Cam
