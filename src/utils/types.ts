import { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode'
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner'

export type InputTypes = 'text' | 'number' | 'password' | 'email'
export type ButtonTypes = 'button' | 'submit'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  onclick?: () => void
}
export type HandleQty = {
  decrement: (id: number) => void
  increment: (id: number) => void
}

// QrcodePlugin props types
export type QrPluginProps = {
  onSuccess: QrcodeSuccessCallback
  onFailure?: QrcodeErrorCallback
  verbose?: boolean
} & Html5QrcodeScannerConfig
