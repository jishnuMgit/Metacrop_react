import clsx from 'clsx'
import { MetaIcon } from '../icons'

type LogoProps = {
  small?: boolean
  textColor?: string
  noIcon?: boolean
  iconColor?: React.CSSProperties['color']
}

function Logo({ small, textColor, iconColor, noIcon }: LogoProps) {
  return (
    <div className={`flex flex-col ${small ? 'h-14' : 'h-24'} justify-center items-center p-2`}>
      {/* <img className={small ? `h-7` : `h-14`} src="/meta-icon.svg" alt="" />
       */}
      {!noIcon && (
        <MetaIcon
          width={small ? '35px' : '200px'}
          height={small ? '35px' : '200px'}
          fill={iconColor}
        />
      )}

      <div className="flex flex-col ml-2">
        <h1
          style={{ color: textColor }}
          className={clsx(
            `${small ? 'text-lg leading-4' : 'text-4xl font-bold'} text-transparent bg-clip-text`,
            ` ${!textColor ? 'bg-gradient-to-r from-[#1e375a] to-[#00ABE4]  ' : textColor} `
          )}
        >
          Metacorp
        </h1>
      </div>
    </div>
  )
}

export default Logo
