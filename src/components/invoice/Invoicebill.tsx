import  { forwardRef, Ref } from 'react';

interface InvoiceBillProps {
  data: any;
}

const Invoicebill = forwardRef<HTMLDivElement, InvoiceBillProps>(({ data }, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      style={{
        padding: 16,
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: 'Courier New, monospace',
        fontSize: 12,
        border: '1px solid #ddd',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <img
          src="/items/85583-cooking-royalty-free-chef-cook-logo-hand-painted.png"
          alt="Logo"
          width={50}
          style={{ marginBottom: 4 }}
        />
        <h2 style={{ margin: 0 }}>KOT</h2>
        <p style={{ fontSize: 11 }}>Receipt / Tax Invoice</p>
      </div>

      <hr />

      {/* Order Info */}
      <div style={{ marginBottom: 8, lineHeight: 1.5 }}>
        <p><strong>Order ID:</strong> #{data?.id}</p>
        <p><strong>Date:</strong> {new Date(data?.createdAt || new Date()).toLocaleString()}</p>
        <p><strong>Table No:</strong> {data?.tableId}</p>
        <p><strong>Cashier:</strong> Albin</p>
      </div>

      <hr />

      {/* Table Header */}
      <div style={{ display: 'flex', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: 4 }}>
        <div style={{ flex: 2 }}>Item</div>
        <div style={{ flex: 1, textAlign: 'center' }}>Qty</div>
        <div style={{ flex: 1, textAlign: 'right' }}>Price</div>
      </div>

      {/* Items */}
      {data?.orderItems?.map((item: any, index: number) => (
        <div
          key={index}
          style={{ display: 'flex', marginTop: 4 }}
        >
          <div style={{ flex: 2 }}>{item?.item?.name}</div>
          <div style={{ flex: 1, textAlign: 'center' }}>{item?.quantity}</div>
          <div style={{ flex: 1, textAlign: 'right' }}>₹{item?.price.toFixed(2)}</div>
        </div>
      ))}

      <hr />

      {/* Total */}
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          fontSize: 13,
          marginTop: 8,
        }}
      >
        <div style={{ flex: 2 }}>Total</div>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, textAlign: 'right' }}>₹{data?.totalAmount.toFixed(2)}</div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11 }}>
        <p>Thank you for dining with us!</p>
        <p>www.KOT.com</p>
      </div>
    </div>
  );
});

export default Invoicebill;
