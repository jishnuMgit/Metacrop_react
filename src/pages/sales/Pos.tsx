import { useEffect, useMemo, useState } from 'react'
import { Button, ErrorText, Modal, Success } from '@/components/ui'
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
  const [user, setUser] = useState(null);
  const [NoSaleNum,seNosaleNumber]=useState(false)
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedOption, setSelectedOption] = useState("cash");

  const totalAmount = useMemo(
    () => orders.reduce((prev, val) => prev + val.qty * val.Price + val.qty  *  val.TaxPer, 0),
    [orders]
  )

const { data:StoreData,  } = useFetch<any>(`${Env.VITE_BASE_URL}/home/store`);
console.log(StoreData);

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
  setUserOption(createOptions(StoreData.AllUser, 'PKUserID', 'Name'));
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

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'black',
      color: 'white',
      borderColor: '#4B5563', // gray-600
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'white',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'black',
      color: 'white',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#374151' : 'black', // dark hover
      color: 'white',
    }),
    input: (base: any) => ({
      ...base,
      color: 'white',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#9CA3AF', // gray-400
    }),
  }

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
          <div className="flex flex-wrap w-full justify-start gap-10 ">
           

            <input
              type="date"
               value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-black border border-gray-700  hover:border-white   w-[180px] px-4 text-white [&::-webkit-calendar-picker-indicator]:invert"
            />

            <Select
              options={UserOption}
              onChange={setUser}
              placeholder="Customer"
              value={user}

              styles={customStyles}
              className="bg-black text-white w-[390px]"
            />

            

            <Select
              options={StoreOptions}
              onChange={handleStoreChange}
              placeholder="Store"
              value={selectedStore}
              
              styles={customStyles}
              className="bg-black text-white w-[180px]"
            />
       
<div className='flex justify-center items-center border border-gray-800 px-5  cursor-pointer shadow-white hover:shadow-sm'>

                          <h4 className="flex justify-center items-center text-xl ">Bill Number : {StoreData?.Seriesnum?.Number}</h4>

</div>

 
 

<input 
  type="text"
  placeholder="  Remarks"
  value={remark}
  onChange={(e) => setRemarks(e.target.value)}
  className="py-2 bg-black rounded-md text-white border border-white"
/>
       {!StoreData?.Seriesnum.Number &&NoSaleNum && <p className='text-md text-red-500'>Unable to process sale. System Waiting for a valid bill number</p>}

          </div>

<div className='lg:flex lg:flex-row justify-between md:flex-col'>
<div className='flex items-center gap-8 mt-5 text-2xl justify-end'>
   {/* <Button onClick={() => setSort({ option: '?sort=none' })} className="md:w-32 rounded-sm">
              All
            </Button>
            {/* <Button onClick={() => setSort({ option: '?sort=date' })} className="md:w-32 rounded-sm">
              Recent
            </Button> 
            <Button onClick={() => setSort({ option: 'most-saled' })} className="md:w-32  rounded-sm">
              Most
            </Button> */}
</div>
          <div className="flex items-center gap-6 mt-5  justify-end">
  <label className="whitespace-nowrap">Payment</label>

  <label className="flex items-center gap-1 cursor-pointer select-none">
    <input
      type="radio"
      name="payment_method"
      value="cash"
      defaultChecked
      onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full"
    />
    Cash
  </label>

  <label className="flex items-center gap-1 cursor-pointer select-none">
    <input
      type="radio"
      name="payment_method"
      value="bank"
      onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 rounded-full"
    />
    Bank
  </label>

  <label className="flex items-center gap-1 cursor-pointer select-none">
    <input
      type="radio"
      name="payment_method"
      value="credit"
      onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
      className="w-4 h-4 text-purple-600  bg-gray-100 border-gray-300 focus:ring-purple-500 rounded-full"
    />
    Credit
  </label>
</div>

        
</div>

        </PosBaseMemo>

        <div className="flex flex-col mt-3 lg:mt-0 lg:w-[500px] lg:ms-4 items-center ">
          <CurrentOrder />
          <Invoice
          
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
