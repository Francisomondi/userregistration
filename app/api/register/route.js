import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from 'bcryptjs'

export async function POST(req){
    try {
        const {name, email,password}= await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)

        await connectDB()
        await User.create({name, email, password: hashedPassword})

        return NextResponse.json({messege: 'user Registered'}, {status:201})
    } catch (error) {
        return NextResponse.json({messege: 'An error occured while registering the user'},{status: 500})
    }
}