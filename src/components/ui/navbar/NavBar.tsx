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
// import { List } from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { links } from '@/config/constants'
import Logo from '../../../assets/images/connectlylogo.png'

function NavBar() {
  const [show, setShow] = useState(false)
  const [settings, setSettings] = useState(false)
  const [dropdownSales, setDropdownSales] = useState(false)
  const [dropdownManage, setDropdownManage] = useState(false)

  // Sales Dropdown
  const {
    refs: refsSales,
    floatingStyles: floatingStylesSales,
    context: contextSales,
  } = useFloating({
    open: dropdownSales,
    onOpenChange: setDropdownSales,
  })
  const { isMounted: isMountedSales, styles: stylesSales } = useTransitionStyles(contextSales, {
    initial: { opacity: 0, transform: 'scale(0.8)' },
    close: { opacity: 0, transform: 'scale(0.8)' },
  })
  const hoverSales = useHover(contextSales, { handleClose: safePolygon(), delay: 100 })
  const { getReferenceProps: getRefSales, getFloatingProps: getFloatSales } = useInteractions([
    hoverSales,
  ])

  // Manage Dropdown
  const {
    refs: refsManage,
    floatingStyles: floatingStylesManage,
    context: contextManage,
  } = useFloating({
    open: dropdownManage,
    onOpenChange: setDropdownManage,
  })
  const { isMounted: isMountedManage, styles: stylesManage } = useTransitionStyles(contextManage, {
    initial: { opacity: 0, transform: 'scale(0.8)' },
    close: { opacity: 0, transform: 'scale(0.8)' },
  })
  const hoverManage = useHover(contextManage, { handleClose: safePolygon(), delay: 100 })
  const { getReferenceProps: getRefManage, getFloatingProps: getFloatManage } = useInteractions([
    hoverManage,
  ])

  const handleClose = () => setSettings(false)
  const handleClick = () => setSettings(true)

  return (
    <>
      <nav className="bg-white border-gray-200 sticky z-[8] top-0 shadow dark:bg-dark-primary-bg">
        <div className="flex flex-wrap items-center justify-between mx-auto md:p-4 p-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="max-w-28 h-full object-cover" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setShow(!show)}
          >
            <svg
              className="w-5 h-5"
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

          <div className={`${!show && 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <Li link={links.HOME}>Home</Li>

              {/* Manage Dropdown */}
              <Li path="Manage">
                <div className="flex flex-row" ref={refsManage.setReference} {...getRefManage()}>
                  Manage
                  <ChevronDownIcon
                    strokeWidth={4}
                    className={`h-4 w-5 transition-transform ${
                      dropdownManage ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </Li>

              {/* Sales Dropdown */}
              <Li path="sales">
                <div className="flex flex-row" ref={refsSales.setReference} {...getRefSales()}>
                  Sales
                  <ChevronDownIcon
                    strokeWidth={4}
                    className={`h-4 w-5 transition-transform ${
                      dropdownSales ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </Li>

              {/* Settings Icon */}
              <Li className="flex items-center">
                <GearIcon onClick={handleClick} />
              </Li>

              {/* Sales Dropdown Menu */}
{/* Sales Dropdown Menu */}
{isMountedSales && (
  <div
    onClick={() => setDropdownSales(false)}
    ref={refsSales.setFloating}
    {...getFloatSales()}
    style={floatingStylesSales}
  >
    <div
      className="bg-white dark:bg-black dark:border-none border border-solid w-fit min-w-max shadow rounded-md py-2"
      style={{ ...stylesSales }}
    >
      <ul className="w-full text-sm font-medium text-gray-700 dark:text-gray-200">
        <li>
          <Link
            to={links.POS}
            className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-dark-primary-bg whitespace-nowrap"
          >
            POS
          </Link>
        </li>
        <li>
          <Link
            to={links.SALES_LIST}
            className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-dark-primary-bg whitespace-nowrap"
          >
            Sales List
          </Link>
        </li>
        <li>
          <Link
            to={links.SALES_RETURN_LIST}
            className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-dark-primary-bg whitespace-nowrap"
          >
            Sales Return
          </Link>
        </li>
        <li>
          <Link
            to={links.ADD_SALES_RETURN}
            className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-dark-primary-bg whitespace-nowrap"
          >
            Add Sales Return
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}

{/* Manage Dropdown Menu */}
{isMountedManage && (
  <div
    onClick={() => setDropdownManage(false)}
    ref={refsManage.setFloating}
    {...getFloatManage()}
    style={floatingStylesManage}
  >
    <div
      className="bg-white dark:bg-black border border-gray-200 dark:border-none shadow rounded-md py-2 w-fit min-w-max"
      style={{ ...stylesManage }}
    >
      <ul className="text-sm font-medium text-gray-700 dark:text-gray-200">
        <li>
          <Link
            to={links.customers}
            className="block px-4 py-2 w-full whitespace-nowrap rounded hover:bg-gray-100 hover:translate-x-1 hover:text-blue-600 dark:hover:bg-dark-primary-bg transition-all duration-150"
          >
           Customers 
          </Link>
        </li>

          <li>
          <Link
            to={links.attendance}
            className="block px-4 py-2 w-full whitespace-nowrap rounded hover:bg-gray-100 hover:translate-x-1 hover:text-blue-600 dark:hover:bg-dark-primary-bg transition-all duration-150"
          >
            Employees
          </Link>
        </li>
           <li>
          <Link
            to={links.reconciliation}
            className="block px-4 py-2 w-full whitespace-nowrap rounded hover:bg-gray-100 hover:translate-x-1 hover:text-blue-600 dark:hover:bg-dark-primary-bg transition-all duration-150"
          >
            Reconciliation
          </Link>
        </li>

         <li>
          <Link
            to={links.PaymentVoucher}
            className="block px-4 py-2 w-full whitespace-nowrap rounded hover:bg-gray-100 hover:translate-x-1 hover:text-blue-600 dark:hover:bg-dark-primary-bg transition-all duration-150"
          >
                PaymentVoucher    

          </Link>
        </li>


         {/* <li>
          <Link
            to={links.attendance}
            className="block px-4 py-2 w-full whitespace-nowrap rounded hover:bg-gray-100 hover:translate-x-1 hover:text-blue-600 dark:hover:bg-dark-primary-bg transition-all duration-150"
          >
            Attendance
          </Link>
        </li> */}
        {/* Add more manage links here if needed */}
      </ul>
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
