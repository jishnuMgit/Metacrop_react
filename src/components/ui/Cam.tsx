import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Center, Modal } from '@/components/ui'
import { CircleIcon } from '../icons'

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
          <Webcam
            audio={false}
            ref={webCamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: { exact: 'environment' } }}
          />
          <Center>
            <CircleIcon onclick={capture} />
          </Center>
          {imgSrc && <img className="absolute" src={imgSrc} alt="" />}
        </>
      </Modal>
    </>
  )
}

export default Cam
