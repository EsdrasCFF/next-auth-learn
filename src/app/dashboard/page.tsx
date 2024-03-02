"use client"

import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { User, UserCircle } from "lucide-react"
import { getServerSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image'

export default function DashboardPage() {
  const session = useSession()
  
  console.log('session', session)

  async function handleSignOutClick() {
    await signOut()
  
    window.location.href = '/'
  }
  
  return (
    <main className="container relative h-screen w-screen flex items-center justify-center">
      <div className="absolute top-3 right-3" >
        <Button onClick={handleSignOutClick} >Sair</Button>
      </div>
      
      <div className="flex flex-col gap-5" >
        <p className="text-xl" >Bem vindo ao início! Você foi autenticado!</p>

        <div className="flex flex-col" >
          <p>Nome: {session.data?.user.name}</p>
          <p>E=mail: {session.data?.user.email}</p>
          <p>ID: {session.data?.user.id}</p>
          
          {session.data?.user.image ? (
            <Image src={session.data.user.image} alt="foto do perfil"  width={100} height={100} />
          ):(
            <UserCircle  width={100} height={100} />
          )}
        </div>
      </div>

    </main>
  )
}