import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { db } from "./prisma"
import { Adapter } from "next-auth/adapters"
import { compare } from "bcrypt"

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {  
        
        if(!credentials?.email || !credentials.password) {
          return null
        }

        // check if user Exists
        const userExists = await db.user.findUnique({
          where: {email: credentials.email}
        })

        if(!userExists) {
          return null
        }
        
        //check if password matched
        const passwordMatch = await compare(credentials.password, userExists.password!)

        if(!passwordMatch) {
          return null
        }

        return {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email
        }
      }
    }),
    
  ],
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        return {
          ...token,
          id: user.id
        }
      }


      return token
    },
    async session({session, token, user}) {
      
      session.user = {...session.user, id: token.id} as {id: string; email: string; name: string; image: string}
      
      return session;
    }
  }
}

