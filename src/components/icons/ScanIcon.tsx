import { IconProps } from '@/utils/types'

function IconScan({ onclick, ...props }: IconProps) {
  return (
    <div className="cursor-pointer" onClick={onclick}>
      <svg viewBox="0 0 24 24" fill="currentColor" height="1.8em" width="1.8em" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M15 3h6v5h-2V5h-4V3zM9 3v2H5v3H3V3h6zm6 18v-2h4v-3h2v5h-6zm-6 0H3v-5h2v3h4v2zM3 11h18v2H3v-2z" />
      </svg>
    </div>
  )
}

export default IconScan
