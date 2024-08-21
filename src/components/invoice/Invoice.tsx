import InvoiceLi from './InvoiceLi'
import { ItemContainer, Center, Button } from '../ui'
import { useState } from 'react'

type InvoiceProps = {
  btnProps: {
    btnname: string
    handleClick: () => void
    disabled?: boolean
  }
  totalAmount: number
  fetching: boolean
}

function Invoice({ btnProps, totalAmount, fetching }: InvoiceProps) {
  const [discount, setDiscount] = useState<number | string>()
  const tax = 0
  const taxAmount = (tax / 100) * totalAmount
  const grandTotal = totalAmount + taxAmount - Number(discount ?? 0)

  return (
    <>
      <ItemContainer className="w-full">
        <div className="flex flex-col w-full">
          <InvoiceLi start="Bill Number" end="123ABC" />
          <InvoiceLi start="SubTotal" end={`$ ` + totalAmount.toFixed(2)} />
          <InvoiceLi start={`Tax (${tax + '%'}) `} end={taxAmount.toFixed(2)} />
          <InvoiceLi
            start="Discount"
            end={
              <>
                <input
                  placeholder="0"
                  type="number"
                  className="bg-transparent text-right min-w-14 max-w-36 dark:focus:bg-black dark:!outline-none"
                  value={discount}
                  onBlur={() => {
                    setDiscount(Number(discount).toFixed(2))
                  }}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </>
            }
          />
          <InvoiceLi start="Total:" end={`$ ` + grandTotal.toFixed(2)} bold />
        </div>
      </ItemContainer>
      <Center className="mt-4">
        <Button
          onClick={btnProps.handleClick}
          disabled={btnProps.disabled}
          className="disabled:!cursor-not-allowed disabled:pointer-events-auto"
          loading={fetching}
        >
          {btnProps.btnname}
        </Button>
      </Center>
    </>
  )
}

export default Invoice
