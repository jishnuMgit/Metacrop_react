type InvoiceLiProps = {
  start: string
  end: string | number | React.JSX.Element
  bold?: boolean
}

function InvoiceLi({ start, end, bold }: InvoiceLiProps) {
  return (
    <div className={`flex mb-2  justify-between mx-16 ${bold ? 'font-bold' : 'font-[500]'}`}>
      <p>{start}</p>
      <p>{end}</p>
    </div>
  )
}

export default InvoiceLi
