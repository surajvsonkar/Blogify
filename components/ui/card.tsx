import {PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

interface blogProps {
	title?: string,
	description?: string,
	authorId?: number;
}

export default async function Card({title,description,authorId} : blogProps) {

	const prisma = new PrismaClient()
	const name = await prisma.user.findUnique({
		where: {
			id: authorId
		},select:{
			username: true
		}
	})
	return (
		<div className="flex flex-col justify-center w-full border-1 border-black max-w-sm h-full p-4 gap-2 rounded-xl">
			<h2 className="text-center font-montserrat text-2xl font-semibold">
				{title}
			</h2>
			<p className="text-textGray font-roboto">
				{description}
			</p>
			<div className="flex justify-between">
				<button className="bg-black text-white py-2 px-4 rounded-full capitalize">
					read full blog
				</button>
				{name && <span>Author: {name.username}</span>}
				<h2 className="flex items-center justify-center gap-1">
					<span className="text-[16px]">10</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						// fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="size-5"
					>
						<path
                            className="fill-pink-500"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
				</h2>
			</div>
		</div>
	);
}

