"use client"

import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"

export default function DashboardPage() {
  const session = useSession()

  console.log(session)
  
  async function handleSignOutClick() {
    await signOut()
  
    window.location.href = '/'
  }
  
  return (
    <main className="container relative h-screen w-screen flex items-center justify-center">
      <div className="absolute top-3 right-3" >
        <Button onClick={handleSignOutClick} >Sair</Button>
      </div>
      <p className="text-xl" >Bem vindo ao início! Você foi autenticado!</p>
    </main>
  )
}