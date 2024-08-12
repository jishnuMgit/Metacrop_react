import { Button } from '@material-tailwind/react'
import React from 'react'

type SmallBtnProps = {
  children: React.JSX.Element | string
  onClick: () => void
  className?: string
}

function SmallBtn({ children, className, onClick }: SmallBtnProps) {
  return (
    <Button variant="gradient" className={className} type="button" onClick={() => onClick()}>
      {children}
    </Button>
  )
}

export default SmallBtn
