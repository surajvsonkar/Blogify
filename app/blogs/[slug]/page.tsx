import { Button } from '@/components/ui/button';
import HandleLike from '@/components/ui/handlelike';
import Header from '@/components/ui/header';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { Calendar, Heart, MoveLeft, User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogProps {
	params: {
		slug: number;
	};
}

export default async function Blog({ params }: BlogProps) {
	const session = await getServerSession(authOptions);
    const userId = Number(session.user.id)
    console.log(userId)
	const prisma = new PrismaClient();

	const { slug } = await params;
    console.log(slug)

	const res = await prisma.blog.findMany({
		where: {
			isPublic: true,
			id: Number(slug),
		},
		select: {
			author: {
				select: {
					username: true,
				},
			},
			title: true,
			description: true,
			createdAt: true,
			likes: true,
		},
	});
	const blog = res[0];

	if (res.length === 0) {
		return notFound();
	}

	return (
		<div className="min-h-screen">
			<Header
				buttonText={session ? 'Write Blog' : 'Signin'}
				route={session ? '/create' : 'login'}
			/>

			<article className="container mx-auto mt-8 px-4 py-8 lg:px-8">
				{/* back navigation */}
				<div className="mb-6">
					<Link href={'/blogs'}>
						<button className="flex justify-center items-center gap-4 hover:bg-accent-foreground hover:text-white py-2 px-4 rounded-md transition-all cursor-pointer">
							<MoveLeft className="w-3 h-3" />
							Back to Blogs
						</button>
					</Link>
				</div>

				{/* Article Header */}
				<header className="max-w-4xl mx-auto mb-8">
					<div className="mb-4">
						<h1 className="text-4xl leading-tight font-bold">{blog.title}</h1>
					</div>
					<div className="flex gap-4 mb-4">
						<div className="flex gap-2 items-center">
							<User className="w-4 h-4" />
							<p>{blog.author.username}</p>
						</div>
						<div className="flex gap-2 items-center">
							<Calendar className="w-4 h-4" />
							<p>{blog.createdAt.toLocaleDateString()}</p>
						</div>
					</div>
					<div className="flex gap-4 mb-4">
                        <HandleLike userId={userId} blogId={Number(slug)}/>
                    </div>

                    <div className='max-w-3xl mx-auto'>
                        <div className='whitespace-pre-wrap leading-relaxed'>{blog.description}</div>

                    </div>
				</header>
			</article>
		</div>
	);
}
