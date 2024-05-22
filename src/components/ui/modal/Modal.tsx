function Modal({ children }: { children: React.JSX.Element }) {
  return (
    <div className="modal-overlay">
      <div className="flex flex-col absolute top-[10%] left-1/4 h-[80%] w-1/2 z-[1001] bg-white rounded-md shadow-2xl border ">
        {children}
      </div>
    </div>
  )
}

export default Modal
