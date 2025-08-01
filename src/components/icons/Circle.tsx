import { IconProps } from '@/utils/types'

function IconCircle({ onclick, ...props }: IconProps) {
  return (
    <div onClick={onclick} className="active:bg-white rounded-full">
      <svg fill="currentColor" viewBox="0 0 16 16" height="3em" width="3em" {...props}>
        <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
      </svg>
    </div>
  )
}

export default IconCircle
