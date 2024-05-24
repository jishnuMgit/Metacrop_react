import { createQrConfig } from '@/config'
import { QrPluginProps } from '@/utils/types'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect } from 'react'

const qrId = 'qr-reader'

function QrPlugin(props: QrPluginProps) {
  useEffect(() => {
    const config = createQrConfig(props)
    const scanner = new Html5QrcodeScanner(qrId, config, false)
    scanner.render(props.onSuccess, props.onFailure)
    return () => {
      console.log('qr dele')
      scanner.clear().catch((err) => console.log(err))
    }
  }, [])

  return <div className=" w-full h-full" id={qrId} />
}

export default QrPlugin
