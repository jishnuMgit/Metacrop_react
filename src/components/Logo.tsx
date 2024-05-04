type LogoProps = {
  small?: boolean
}
function Logo({ small }: LogoProps) {
  return (
    <div
      className={`flex flex-col ${small ? 'h-14' : 'h-24'} justify-center items-center p-2`}
    >
      <img className={small ? `h-7` : `h-14`} src="/meta-icon.svg" alt="" />
      <div className="flex flex-col ml-2">
        <h1
          className={`${small ? 'text-lg leading-4' : 'text-4xl'} bg-gradient-to-r from-[#1e375a] to-[#00ABE4] text-transparent bg-clip-text `}
        >
          Metacorp
        </h1>
      </div>
    </div>
  )
}

export default Logo
