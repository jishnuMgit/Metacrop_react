export type InputTypes = 'text' | 'number' | 'password' | 'email'
export type ButtonTypes = 'button' | 'submit'

export type PwdIconProps = React.SVGProps<SVGSVGElement> & {
  onclick?: () => void
}
