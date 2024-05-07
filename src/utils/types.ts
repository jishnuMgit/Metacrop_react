export type InputTypes = 'text' | 'number' | 'password' | 'email'
export type ButtonTypes = 'button' | 'submit'

export type PwdIconProps = React.SVGProps<SVGSVGElement> & {
  onclick?: () => void
}
export type HandleQty = {
  decrement: (id: number) => void
  increment: (id: number) => void
}
