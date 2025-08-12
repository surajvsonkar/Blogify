import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	const prisma = new PrismaClient();
	const { id } = params;

    if(!id) {
        return NextResponse.json({
            msg: "id is required"
        },{
            status: 404
        })
    }

	try {
		await prisma.blog.delete({
			where: {
				id: Number(id)
			},
		});

		return NextResponse.json(
			{
				msg: 'Blog is deleted',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				msg: 'Something went wrong! blog cannot be deleted!',
			},
			{ status: 500 }
		);
	}
}
