export function FormError(message: {errorMessage: string}) {

  return (
    <p className="text-[10px] text-red-500 mt-1" >{message.errorMessage}</p>
  )
}