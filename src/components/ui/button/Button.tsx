import { Button as MatetialButton, ButtonProps } from '@material-tailwind/react'
import clsx from 'clsx'

function Button({
  ref,
  children,
  className,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <MatetialButton
      className={clsx(
        'dark:bg-dark-btn-color dark:hover:bg-dark-btn-hover',
        props.variant === 'outlined',
        'dark:text-white',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </MatetialButton>
  )
}

export default Button
