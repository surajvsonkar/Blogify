import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { RegsitrationSchema } from "@/lib/validations/auth";

export async function POST(req:NextRequest){
    const prisma = new PrismaClient()
    const body = await req.json()
    const {username,email,password} = RegsitrationSchema.parse(body)

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) return NextResponse.json({
            msg: "User with this email already exists"
        },{status: 409})

        const hashedPassword = await bcrypt.hash(password,10)

        await prisma.user.create({
            data: {
                username,email,password:hashedPassword
            }
        })

        return NextResponse.json({
            msg: "user created successfully"
        }, {status: 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: "Internal Server Error",
            err: error
        }, {status: 500})
    }
}