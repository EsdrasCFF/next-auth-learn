import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, {message: 'Name must have more than 8 characters!'}),
  email: z.string().email({message: 'Invalid e-mail!'}),
  password: z.string().min(1, {message: 'Password is Required!'}).min(8, {message: 'Password must have more than 8 characteres '})
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {name, email, password} = userSchema.parse(body);

    //check if email already exists
    const userExistsByEmail = await db.user.findUnique({
      where: {email}
    })

    if(userExistsByEmail) {
      return NextResponse.json({user: null, error: {message: 'THIS_EMAIL_ALREADY_REGISTERED'}}, {status: 401 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const {password: newUserPassword, ...otherProps} = newUser

    return NextResponse.json({user: otherProps, success: {message: 'USER CREATED SUCCESSFULLY'}},{status: 201} )

  }catch (e) {
    console.error(e)
    return NextResponse.json({error: {message: 'SOMETHING WENT WRONG!'}})
  }

}