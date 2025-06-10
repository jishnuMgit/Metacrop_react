import { useEffect, useMemo, useState } from 'react'
import { Invoice, ProductContainer } from '@/components'
import { Item, OrderItem } from '@/components/products'
import { PosBaseMemo } from '@/components/products/PosBase'
import { Button, ErrorText, Input, ItemContainer, Modal, Success } from '@/components/ui'
import { AnimatedAlert } from '@/components/ui/Alert'
import { useAppDispatch, useAppSelector } from '@/config/hooks'
import {
  addToReturn,
  clearReturn,
  decrementReturn,
  incrementReturn,
  removeFromReturns,
} from '@/redux/returnItem'
import type { PayloadIDs, ReturnItemType } from '@/redux/returnItem'
import { clearSaleState, fetchSale } from '@/redux/sale'
import { SalesReturnSchema } from '@/schema'
import { ApiItem } from '@/utils/types'
import {  Typography } from '@material-tailwind/react'
import { createInvoiceList, createReturnInvoice } from '@/utils/helpers'
import { SALES_RETURN_INVOICE } from '@/config/constants'
import { useAddSalesReturn } from '@/hooks/useSalesReturn'
import Select,  { SingleValue } from 'react-select';
import useFetch from '@/hooks/useFetch'
import Env from '@/config/env'

// type Invoiceoption={
// billNo:number|null
// }
// interface BillData {
//   billNo: number | null;
// }
interface CustomerOption {
  value: string;
  label: string;
}
interface Items {
  PKItemID: number;
  FKCmpID: number;
  FKGroupID: number;
  FKStoreID: number;
  FKUnitID: number;
  FKManufactureID: number;
  ItemCode: string;
  HSNCode: string;
  ItemName: string;
  Class: string;
  Qty: number;
  Price: string;        // price as string based on your data
  Lcost: number;
  ReOrderLevel: number;
  MaxLevel: number;
  TaxPer: number;
  DelFlag: number;
  RepFlag: number;
  CreatedBy: number;
  CreatedOn: string;    // ISO date string
  ModifiedBy: number;
  ModifiedOn: string;   // ISO date string
}

interface ApiResponse {
  message: string;
  data: Items[];
}

function SalesReturn() {
  // const [inputVal, setInputVal] = useState('')
  const [modal, setModal] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const { handleMutate, fetching, success, error, clearState, response } = useAddSalesReturn()
  const dispatch = useAppDispatch()
const [selectedCustomer, setSelectedCustomer] = useState<CustomerOption | null>(null); // Single selected
const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]); // All options
const [ProductData,setProductData]=useState<Items[]>([])
  const returnItems = useAppSelector((state) => state.returnItem.sales)
  const customReturnItems = useAppSelector((state) => state.returnItem.customReturn)
  const soldItems = useAppSelector((state) => state.sale.saleData?.SoldItems)
  const saleError = useAppSelector((state) => state.sale.error)

  const totalAmount = useMemo(
    () =>
      returnItems.reduce(
        (acc, sale) => acc + sale.items.reduce((a, i) => a + i.returnQty! * i.Price, 0),
        0
      ) + customReturnItems.reduce((acc, val) => acc + val.item!.Price * val.returnQty, 0),
    [returnItems, customReturnItems]
  )
const { data } = useFetch<{ message: string; data: { billNo: number | null }[] }>(
  `${Env.VITE_BASE_URL}/home/getInvoice`
);
useEffect(() => {
  if (data && Array.isArray(data.data)) {
    const customerOptions: CustomerOption[] = [];

    data.data.forEach((item) => {
      if (item.billNo !== null) {
        customerOptions.push({
          value: item.billNo.toString(),
          label: `Bill No: ${item.billNo}`,
        });
      }
    });

const optionDefalt: CustomerOption = {
  value: "",
  label: "Select Bill"
};


    setCustomerOptions([optionDefalt,...customerOptions]);
  }
}, [data]);


  const handleSubmit = () => {
    ;(async () => {
      // alert(selectedCustomer?.value)
      const returnData = await SalesReturnSchema.validate(
        { sales: returnItems, nonSales: customReturnItems,billNo:selectedCustomer?.value },
        {
          stripUnknown: true,
        }
      )
      handleMutate(returnData)
    })().catch((err) => console.log(err))
  }

  const itemClickHandler = (item: ApiItem) => {
    handleAddToReturn({ item: item })
  }

  // const handleSearch = () => {
  //   alert(inputVal)
  //   if (inputVal !== '') {
  //     void dispatch(fetchSale(inputVal))
  //   }
  //   return
  // }

  const handleAddToReturn = (payload: Partial<ReturnItemType> & { item?: ApiItem }) => {
    dispatch(addToReturn(payload))
  }

  const handleDelItem = (id: unknown) => {
    dispatch(removeFromReturns(id as PayloadIDs))
  }

  const handleClear = () => {
    dispatch(clearReturn())
  }

  const minusBtnHandler = (ids: unknown) => {
    dispatch(decrementReturn(ids as PayloadIDs))
  }

  const plusBtnHander = (ids: unknown) => {
    dispatch(incrementReturn(ids as PayloadIDs))
  }

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputVal(e.target.value)
  // }

  useEffect(() => {
    if (success) {
      dispatch(clearReturn())
      dispatch(clearSaleState())
      setModal(true)
      
      clearState()
    }
    if (error) {
      setErrorAlert(true)
    }
  }, [success, error])

const handleCustomerChange = (selected: SingleValue<CustomerOption>) => {
  if(selected?.value==="") setProductData([])
  setSelectedCustomer(selected); // correct now
};
    const handleCash = (method: string) => {
    console.log('Payment method:', method)
  }
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

// Fetch is triggered based on selectedCustomer.value
const { data: Product } = useFetch<ApiResponse>(
  selectedCustomer && selectedCustomer.value !== ""
    ? `${Env.VITE_BASE_URL}/home/getReturnProduct/${selectedCustomer.value}`
    : "" // null to prevent fetch when value is empty
);

// When Product changes, update local state
useEffect(() => {
  if (Product?.data) {
    setProductData(Product.data);
    console.log("Fetched product data:", Product.data);
  }
}, [Product]);





  return (
    <div className="flex md:p-5 lg:flex-row flex-col transition-all">
      {response?.data && (
        <Modal isOpen={modal} handleClose={() => setModal(false)}>
          <Success
            data={createInvoiceList(SALES_RETURN_INVOICE, createReturnInvoice(response?.data))}
          ></Success>
        </Modal>
      )}

      <PosBaseMemo itemClickHandler={itemClickHandler} className="max-h-none" ProductData={ProductData} >
        <div className="flex flex-col w-full mb-5">
          <Typography variant="h3" className="mb-3">
            Add Sales Return
          </Typography>
          <div className="flex">
            {/* <Input
              value={inputVal}
              placeholder="Search Invoice"
              type="text"
              className=" indent-7 mb-0 w-8/12 h-8 border border-sm rounded-sm p-5 placeholder:text-[#429CF0] dark:placeholder:text-dark-text-color dark:bg-black dark:border-none dark:focus-visible:outline-none"
              onChange={handleChange}
            /> */}
            
            {/* <Button className="w-3/12 ms-auto" onClick={handleSearch}>
              Search
            </Button> */}
          </div>
            
          <div className='flex gap-4 mt-5'>
            <input
              type="date"
              className="bg-black border border-gray-700  hover:border-white   w-[180px] px-4 text-white [&::-webkit-calendar-picker-indicator]:invert"
            />
        <Select
  options={customerOptions}
  value={selectedCustomer}
  onChange={handleCustomerChange}
  placeholder="Bill Number"
  styles={customStyles}
  className="bg-black text-white w-[390px]"
/>
          </div>
           <div className="flex items-center gap-8 mt-5  justify-end">
            
            <label className="font-semibold whitespace-nowrap">Payment mode</label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="payment_method"
                value="cash"
                onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full"
              />
              Cash
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="payment_method"
                value="bank"
                onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 rounded-full"
              />
              Bank
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="payment_method"
                value="credit"
                onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCash(e.currentTarget.value)}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 rounded-full"
              />
              credits 
            </label>

            <div>
                  
            </div>
        
          
          </div>
        </div>
        <> {saleError && <ErrorText message={saleError.message} />}</>
        <>
          {/* {soldItems && (
            <ProductContainer>
              <>
                {soldItems?.map((val, i) => (
                  <Item
                    onClick={() =>
                      handleAddToReturn({
                        ...val,
                        Price: val.SoldPrice,
                        saleId: val.FKSaleID,
                        PKSoldItemID: val.PKSoldItemID,
                        ItemName: val.Item.ItemName,
                      })
                    }
                    qtyElement={<span>Total Qty: {val.Qty}</span>}
                    item={val.Item}
                    key={i}
                  />
                ))}
              </>
            </ProductContainer>
          )} */}
        </>
      </PosBaseMemo>
      <div className="flex flex-col mt-3 lg:mt-0 lg:w-1/2 lg:ms-4 items-center ">
        <ItemContainer className="w-full mb-4">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Return Items</h1>
              <Button
                disabled={!(returnItems.length || customReturnItems.length)}
                className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
                onClick={handleClear}
              >
                Clear All
              </Button>
            </div>
            <hr className="h-[2px] my-3 bg-[#cec6b4] border-0 " />
            <div className="overflow-y-auto max-h-96 pe-3">
              {returnItems.map((val) =>
                val.items.map((v) => (
                  <OrderItem
                  button="Return Items"
                    delBtnHandler={handleDelItem}
                    minusBtn={minusBtnHandler}
                    plusBtn={plusBtnHander}
                    item={{
                      Price: v.Price,
                      ItemName: v.ItemName,
                      qty: v.returnQty,
                      id: {
                        soldItemId: v.PKSoldItemID,
                        saleId: v.FKSaleID,
                      },
                    }}
                    key={v.PKSoldItemID}
                  />
                ))
              )}
              {customReturnItems.map((val) => (
                <OrderItem
                button=''
                  delBtnHandler={handleDelItem}
                  minusBtn={minusBtnHandler}
                  plusBtn={plusBtnHander}
                  className=""
                  key={val.item?.PKItemID ||''}
                  item={{
                    ...val.item,
                    qty: val.returnQty,
                    id: { soldItemId: val.item?.PKItemID||"" },
                  }}
                />
              ))}
            </div>
          </div>
        </ItemContainer>
        <Invoice
          btnProps={{
            btnname: 'Return Sales',
            handleClick: handleSubmit,
            disabled: !(returnItems.length || customReturnItems.length),
          }}
          fetching={fetching}
          totalAmount={totalAmount} user={undefined} selectedDate={''} selectedOption={''} store={undefined}        />
      </div>
      {error && (
        <AnimatedAlert
          className="bg-dark-btn-color"
          onClose={() => setErrorAlert(false)}
          open={errorAlert}
        >
          <div>{error.message} </div>
        </AnimatedAlert>
      )}
    </div>
  )
}

export default SalesReturn
