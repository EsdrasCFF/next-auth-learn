import { SignInForm } from "./components/SignInForm";

export default function SignIpPage() {
  return (
    <main className="container flex flex-col items-center w-screen h-screen gap-5 mt-20" >
      <h2>\Faça Login</h2>
      
      <SignInForm />
    </main>
  )
}