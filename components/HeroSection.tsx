import { useState } from "react";
import Card from "./ui/Card";
import { PrismaClient } from "@prisma/client";


export default async function HeroSection() {
    const prisma = new PrismaClient()
    const blogs = await prisma.blog.findMany()
    console.log(blogs)

	return <div className="p-4 grid grid-cols-3 gap-5">
        {blogs.length === 0 && (
            <div>there are no blogs..</div>
        )}
        {blogs.map((card)=> {
            return (
                <Card title={card.title} description={card.description} authorId={card.authorId} key={card.id}/>
            )
        })}
    </div>;
}
