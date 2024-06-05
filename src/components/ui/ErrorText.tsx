function ErrorText({ message }: { message: string }) {
  return (
    <div>
      <p className="text-red-400">{message}</p>
    </div>
  )
}

export default ErrorText
