import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){''
    const prisma = new PrismaClient()
    const body = await req.json()
    const {title,description,authorId} = body
    try {
        const blog = await prisma.blog.create({
            data :{
                title,
                description,
                authorId
            }
        })

        return NextResponse.json({
            blog,      
        },{status: 200},
    )
    } catch (error) {
        console.log(error)
    }
}