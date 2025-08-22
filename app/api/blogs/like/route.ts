import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	const body = await req.json();
	const blogId = Number(body.blogId);
	const userId = Number(body.userId);

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
				userId: userId,
				blogId: blogId,
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
				userId: userId,
				blogId: blogId,
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

export async function GET(req: NextRequest) {
	const {searchParams} = new URL(req.url)
	const blogId = Number(searchParams.get("blogId"))
	const userId = Number(searchParams.get("userId"))

	if(!blogId || !userId){
		return NextResponse.json({
			msg: "id is required"
		},{
			status: 404
		})
	}

	try {
		const alreadyLiked = await prisma.likedBlogs.findFirst({
			where: {
				userId,blogId
			}
		})
		if(alreadyLiked){
			return NextResponse.json({
				data: true
			})
		} else{
			return NextResponse.json({
				data: false
			})
		}
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			msg: "an Error occurred! TRY AGAIN."
		}, {
			status: 500
		})
	}
}
