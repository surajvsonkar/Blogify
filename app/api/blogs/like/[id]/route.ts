import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const prisma = new PrismaClient();
	const body = await req.json();
	const {id} = await params;
    const blogId = Number(id)
	const userId = Number(body.userId);
	const session = await getServerSession();
	// const userId = Number(session?.user.id)

	if (!blogId || !userId) {
		return NextResponse.json(
			{
				msg: 'Id is required',
			},
			{
				status: 404,
			}
		);
	}

	try {
		const alreadyLiked = await prisma.likedBlogs.findFirst({
			where: {
				userId: Number(userId),
				blogId: Number(blogId),
			},
			select: {
				id: true,
			},
		});

		if (alreadyLiked) {
			await prisma.likedBlogs.delete({
				where: {
					id: Number(alreadyLiked.id),
				},
			});
			return NextResponse.json(
				{
					msg: 'like removed successfully',
				},
				{
					status: 200,
				}
			);
		}
		await prisma.likedBlogs.create({
			data: {
				userId: Number(userId),
				blogId: Number(blogId),
			},
		});
		return NextResponse.json(
			{
				msg: 'blog liked successfully',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				msg: 'something went wrong! try again',
			},
			{ status: 500 }
		);
	}
}
