"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../../../components/FormError";
import { useRouter } from "next/navigation";

const SignUpFormSchema = z.object({
  name: z.string().min(3, {message: 'Name must have more than 8 characters!'}),
  email: z.string().email({message: 'Invalid e-mail!'}),
  password: z.string().min(1, {message: 'Password is Required!'}).min(8, {message: 'Password must have more than 8 characteres '}),
  confirmPassword: z.string().min(1, {message: 'Password confirmation is required'}),
}).refine((data) => data.confirmPassword === data.password, {
  path: ['confirmPassword'],
  message: 'Password does not match!'
})

type SignUpFormData = z.infer<typeof SignUpFormSchema>

export function SignUpForm() {
  const { register, handleSubmit, setError, setValue, formState: {errors, isSubmitting} } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema)
  })

  const router = useRouter()

  async function handleSignUpFormSubmit(data:SignUpFormData) {
    
    const response = await fetch(`/api/user`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })

    if(response.ok) {
      router.push('/signin')
    } else {
      console.error('Registration failed!')
    }
  }
  return (
    <form className="w-1/3 flex flex-col gap-5" onSubmit={handleSubmit(handleSignUpFormSubmit)} >
      <div>
        <label >Name</label>
        <Input {...register('name')} />
        {errors.name?.message && (
          <FormError  errorMessage={errors.name.message} />
        )}
      </div>

      <div>
        <label >Email</label>
        <Input {...register('email')}/>
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

      <div>
        <label >Confirm Password</label>
        <Input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword?.message && (
          <FormError errorMessage={errors.confirmPassword?.message} />
        )}
      </div>

      <Button> Cadastrar </Button>
    </form>
  )
}