import { Logo } from '@/components/ui'
import Li from './Li'
import { GearIcon } from '@/components/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings } from '@/pages'
import {
  useFloating,
  useHover,
  useInteractions,
  safePolygon,
  useTransitionStyles,
} from '@floating-ui/react'
import { List } from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { links } from '@/config/constants'

function NavBar() {
  const [show, setShow] = useState(false)
  const [settings, setSettings] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: dropdown,
    onOpenChange: setDropdown,
  })
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    close: { opacity: 0, transform: 'scale(0.8)' },
  })
  const hover = useHover(context, { handleClose: safePolygon(), delay: 100 })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const handleClose = () => {
    setSettings(false)
  }
  const handleClick = () => {
    setSettings(true)
  }

  return (
    <>
      <nav className="bg-white border-gray-200 sticky z-[8] top-0 shadow dark:bg-dark-primary-bg">
        <div className=" flex flex-wrap items-center justify-between mx-auto md:p-4 p-4">
          <Link to={'/'}>
            <Logo small />
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setShow(!show)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${!show && 'hidden '} transition-colors w-full md:block md:w-auto `}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <Li link={links.HOME}>Home</Li>
              <Li path="sales">
                <>
                  <div
                    className="flex flex-row"
                    ref={refs.setReference}
                    {...getReferenceProps()}
                  >
                    Sales
                    <span className="flex items-center">
                      <ChevronDownIcon
                        strokeWidth={4}
                        className={`h-4 w-5 transition-transform ${
                          dropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </div>
                </>
              </Li>
              <Li>Procuremnt</Li>
              <Li>Finance</Li>
              <Li>Inventory</Li>
              <Li>Analytics</Li>
              <Li className="flex items-center">
                <GearIcon onClick={handleClick} />
              </Li>

              {/* drop down for sales */}
              {isMounted && (
                <div
                  onClick={() => setDropdown(false)}
                  ref={refs.setFloating}
                  {...getFloatingProps()}
                  style={floatingStyles}
                  className=""
                >
                  <div
                    className="bg-white dark:bg-black dark:border-none border border-solid min-w-32 shadow"
                    style={{ ...styles }}
                  >
                    <List>
                      <Li
                        dropdown
                        path="pos"
                        className="hover:bg-gray-100 dark:hover:bg-dark-primary-bg px-4 py-2 w-full flex"
                        link={links.POS}
                      >
                        Pos
                      </Li>
                      <Li
                        dropdown
                        path="list"
                        className="hover:bg-gray-100 dark:hover:bg-dark-primary-bg px-4 py-2 w-full flex "
                        link={links.SALES_LIST}
                      >
                        Sales List
                      </Li>
                      <Li
                        dropdown
                        path="return"
                        link={links.SALES_RETURN_LIST}
                        className="hover:bg-gray-100 dark:hover:bg-dark-primary-bg px-4 py-2 w-full flex"
                      >
                        Sales Return
                      </Li>
                      <Li
                        dropdown
                        path="add-return"
                        link={links.ADD_SALES_RETURN}
                        className="hover:bg-gray-100 dark:hover:bg-dark-primary-bg px-4 py-2 w-full flex"
                      >
                        Add Sales Return
                      </Li>
                    </List>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {<Settings isOpen={settings} handleClose={handleClose} />}
    </>
  )
}

export default NavBar
