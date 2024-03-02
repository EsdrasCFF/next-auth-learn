import { SignUpForm } from "./components/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="container flex flex-col items-center w-screen h-screen gap-5 mt-20" >
      <h2>Cadastre-se</h2>
      
      <SignUpForm />
    </main>
  )
}