import { QrPluginProps } from '@/utils/types'

export const createQrConfig = (props: QrPluginProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onSuccess, onFailure, verbose, ...rest } = props
  if (!onSuccess) {
    throw 'Qrcode success callback is required'
  }
  return { ...rest }
}
