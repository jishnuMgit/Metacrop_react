import { useEffect, useMemo, useState } from 'react'
import {  ErrorText, Modal, Success } from '@/components/ui'//Button,
import { CurrentOrder, Invoice } from '@/components'
import { PosBaseMemo } from '@/components/products'
import { ApiItem, SortOption } from '@/utils/types'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import { BillGenerate } from '@/schema'
import { addToOrders, clearOrder } from '@/redux/order'
import { createInvoiceList, createInvoiceValues } from '@/utils/helpers'
import { SALE_INVOICE_NAMES } from '@/config/constants'
import { useAddSale } from '@/hooks/useSale'
import { AnimatedAlert } from '@/components/ui/Alert'
import Select, { SingleValue } from 'react-select'
import { setStore } from '@/redux/component'
import Env from '@/config/env'
import useFetch from '@/hooks/useFetch'
type CustomerOption = {
  value: string
  label: string
}


// const customerOptions: CustomerOption[] = [
//   { value: 'john_doe', label: 'John Doe' },
//   { value: 'jane_smith', label: 'Jane Smith' },
//   { value: 'robert_brown', label: 'Robert Brown' },
// ]

// const storeOptions: CustomerOption[] = [
//    { value: "", label: 'ALL' },
//   { value: '1', label: 'store 1' },
//   { value: '2', label: 'store 2' },
//   { value: '3', label: 'store 3' },
// ]
interface currentStoretype {
  value: string | number;
  label: string;
}

function Pos() {
    const today = new Date().toISOString().split('T')[0] 

  const [sort, setSort] = useState<SortOption>({ option: '?sort=none' })
  const orders = useAppSelector((state) => state.order.orders)
  const discount = useAppSelector((state) => state.order.discount)
  const store = useAppSelector((state) => state.uiState.store)
  const [remark, setRemarks] = useState<string >("")
  const [selectedStore, setSelectedStore] = useState<CustomerOption | null>()
  const [StoreOptions,setStoreOptions]=useState()
  const [UserOption,setUserOption]=useState()
  // const [stores, setStores] = useState(null);
const [user, setUser] = useState<CustomerOption | null>(null);
  const [NoSaleNum,seNosaleNumber]=useState(false)
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedOption, setSelectedOption] = useState("cash");

  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.Price + ( ((val.TaxPer/100)*val.Price)*val.qty   ), 0),
    [orders]
  )

const { data:StoreData,  } = useFetch<any>(`${Env.VITE_BASE_URL}/home/store`);
console.log(StoreData,setSort);

const createOptions = (data: any[], valueKey: string |number, labelKey: string): currentStoretype[] => {
  const allOption: currentStoretype = { value: "", label: "Select Store" };
  const options = data.map(item => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
  return [allOption, ...options];
};

console.log("orders",orders);


useEffect(()=>{
setTimeout(()=>{
  seNosaleNumber(true)
},5000)
},[])

useEffect(() => {

  
  if (StoreData?.Data) {
    //@ts-ignore
    setStoreOptions(createOptions(StoreData.Data, 'PKStoreID', 'StoreName'));
  }
  if (StoreData?.AllUser) {
    // @ts-ignore
  setUserOption(createOptions(StoreData.AllUser, 'PKCustomerID', 'Name'));
}

  console.log("StoreOptions",StoreOptions);
  
  console.log("UserOption",UserOption);
  
}, [StoreData]);



  const [isOpen, setIsOpen] = useState(false)
  const { handleMutate, success, fetching, data, clearState, error } = useAddSale()
  const dispatch = useAppDispatch()

  const handleSubmit = async (): Promise<void> => {
    
    if(!selectedOption){
      return alert("select the method")

    }
    const items = await BillGenerate.validate(orders, { stripUnknown: true })
    // alert(user?.value)
    // @ts-ignore
    handleMutate({ items, totalAmount, discount, user: user?.value || '', selectedOption, selectedStore:selectedStore?.value||'' , selectedDate,remark })

if(success){
  alert("ok")
    window.location.reload()
}
  }

  const handleSubmitWrapper = () => {
    handleSubmit().catch(() =>
      new Response('Validation Error', {
        status: 400,
        statusText: 'Validation Error',
      })
    )
  }

  const itemClickHandler = (item: ApiItem) => {
    console.log(' selected item: ', item)
    dispatch(addToOrders(item))
  }

  // const handleCustomerChange = (selected: SingleValue<CustomerOption>) => {
  //   setSelectedCustomer(selected)
  // }

  const handleStoreChange = (selected: SingleValue<CustomerOption>) => {
    dispatch(setStore(selected))
    setSelectedStore(selected)
    // alert()
  }

  const handleClose = () => {
    setIsOpen(false)
    clearState()
    dispatch(clearOrder())
  }

  const handleCash = (method: string) => {
    setSelectedOption(method)
    console.log('Payment method:', method)
  }

  useEffect(() => {
    if (success) {
      setIsOpen(true)
    }
  }, [success])

 const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: isDarkMode ? '6B7280' : '#6B7280', // Tailwind gray-500 = #6B7280
    color: 'white',
    borderColor: '#4B5563', // gray-600
  }),
  singleValue: (base: any) => ({
    ...base,
    color: 'white',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: isDarkMode ? 'black' : '#6B7280',
    color: 'white',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? (isDarkMode ? '#374151' : '#9CA3AF') // Dark: gray-700, Light: gray-400
      : isDarkMode
      ? 'black'
      : '#6B7280',
    color: 'white',
  }),
  input: (base: any) => ({
    ...base,
    color: 'white',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: 'white', // gray-400
  }),
};


  return (
    <>
      <Modal handleClose={handleClose} center isOpen={isOpen}>
        <>
          {data?.data && (
            <Success data={createInvoiceList(SALE_INVOICE_NAMES, createInvoiceValues(data.data))} />
          )}
        </>
      </Modal>
      <div className="flex md:p-5 lg:flex-row flex-col transition-all">
        {/* @ts-ignore */}
        <PosBaseMemo itemClickHandler={itemClickHandler} sort={sort}  >
  <div className="w-full p-6 rounded-2xl  shadow-lg border border-gray-700">
  {/* Filters Row */}
  <h1 className=' mb-5 text-2xl font-bold '>Add Sales</h1>
  <div className="flex flex-wrap w-full justify-start gap-6 items-center">
    
    {/* Date */}
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="dark:bg-neutral-900 bg-gray-800 border border-gray-600 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-[200px] px-4 py-2 rounded-lg text-white placeholder-gray-300 outline-none transition duration-200 [&::-webkit-calendar-picker-indicator]:invert"
    />

    {/* Customer */}
    <Select
      options={UserOption}
      onChange={setUser}
      placeholder="Select Customer"
      value={user}
      styles={customStyles}
      className="dark:bg-neutral-900 bg-gray-800 text-white w-[350px] rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition duration-200"
    />

    {/* Store */}
    <Select
      options={StoreOptions}
      onChange={handleStoreChange}
      placeholder="Select Store"
      value={selectedStore}
      styles={customStyles}
      className="dark:bg-neutral-900 bg-gray-800 text-white w-[200px] rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition duration-200"
    />

    {/* Bill Number */}
    <div className="flex justify-center items-center border border-gray-700 bg-gray-800 rounded-lg px-6 py-2 cursor-pointer shadow-sm hover:shadow-blue-500/20 transition duration-300">
      <h4 className="flex items-center text-lg font-medium text-white">
        Bill No:{" "}
        <span className="ml-2 text-blue-400 font-semibold">
          {StoreData?.Seriesnum?.Number ?? "—"}
        </span>
      </h4>
    </div>

    {/* Remarks */}
    <input
      type="text"
      placeholder="Remarks"
      value={remark}
      onChange={(e) => setRemarks(e.target.value)}
      className="py-2 px-4 dark:bg-neutral-900 bg-gray-800 rounded-lg text-white border border-gray-600 placeholder-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition duration-200 w-[250px]"
    />
  </div>

  {/* Warning message */}
  {!StoreData?.Seriesnum?.Number && NoSaleNum && (
    <span className="text-sm text-red-400 mt-2 ml-1">
      ⚠️ Unable to process sale. Waiting for a valid bill number.
    </span>
  )}

  {/* Divider */}
  <div className="border-t border-gray-700 mt-6 mb-4"></div>

  {/* Payment Section */}
  <div className="flex flex-wrap justify-between items-center gap-6">
    <div></div> {/* Placeholder for future buttons if needed */}

    <div className="lg:flex md:flex-col  items-center gap-6">
      <label className="font-medium mb-3 text-gray-900 dark:text-white whitespace-nowrap">
        Payment Mode:
      </label>

     <div className='flex gap-2'>
       {[
        { label: "Cash", value: "cash", color: "blue" },
        { label: "Card", value: "bank", color: "green" },
        { label: "Credit", value: "credit", color: "purple" },
      ].map((mode) => (
        <label
          key={mode.value}
          className="flex  items-center gap-2 cursor-pointer select-none text-gray-700 dark:text-white hover:text-white transition"
        >
          <input
            type="radio"
            name="payment_method"
            value={mode.value}
            defaultChecked={mode.value === "cash"}
            onClick={(e) => handleCash(e.currentTarget.value)}
            className={`w-5 h-5 text-${mode.color}-500 border-gray-500 focus:ring-${mode.color}-500 rounded-full`}
          />
          {mode.label}
        </label>
      ))}
     </div>
    </div>
  </div>
</div>


        </PosBaseMemo>

        <div className="flex flex-col mt-3 lg:mt-0 lg:w-[500px] lg:ms-4 items-center ">
          <CurrentOrder />
          <Invoice
          type={'sale'}
          
            btnProps={{
              btnname: 'Generate Bill',
              handleClick: handleSubmitWrapper,
              disabled: orders.length === 0,
            }}
            store={store}
            user={user}
            selectedDate={selectedDate}
            selectedOption={selectedOption}
            fetching={fetching}
            totalAmount={totalAmount}
          />
          {error && (
            <AnimatedAlert open={!!error} onClose={clearState}>
              <ErrorText message="Validation Error" />
            </AnimatedAlert>
          )}
        </div>
      </div>
    </>
  )
}

export default Pos
