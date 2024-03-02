"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../../../components/FormError";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const SignInFormSchema = z.object({
  email: z.string().email({message: 'Invalid e-mail!'}),
  password: z.string().min(1, {message: 'Password is Required!'})
})

type SignInFormData = z.infer<typeof SignInFormSchema>

export function SignInForm() {
  const { register, handleSubmit, setError, setValue, formState: {errors, isSubmitting} } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema)
  })

  const router = useRouter()

  const session = useSession()

  console.log(session.status)

  async function handleSignInFormSubmit(data:SignInFormData) {
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password
    })
    
    window.location.href='/dashboard'
  }
  
  function handleSignInWithGoogle() {
    signIn('google')

    if(session.status === 'authenticated') {
      window.location.href='/dashboard'
    } else {
      router.push('/')
    }

  }

  return (
    <>
      <form className="w-1/3 flex flex-col gap-5" onSubmit={handleSubmit(handleSignInFormSubmit)} >
        <div>
          <label >Email</label>
          <Input type="email" {...register('email')}/>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
        </div>

        <div>
          <label >Password</label>
          <Input type="password" {...register('password')} />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
        </div>

        <Button> Entrar </Button>

      </form>
        
      <Separator className="w-1/3" />

      <Button 
        onClick={handleSignInWithGoogle}  
        className="w-1/3 h-[50px] p-2 border bg-white hover:bg-gray-400" 
      > 
        <Image src='/google.svg' alt="icon-google signIn" width={50} height={50} /> 
      </Button>
    </>
  )
}