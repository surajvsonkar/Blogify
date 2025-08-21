import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar, Heart, Search, User } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SearchSort from '@/components/ui/searchsort';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface BlogPageProps {
	searchParams?: { sort?: string, search?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const prisma = new PrismaClient();
	const session = await getServerSession(authOptions);
	const userId = Number(session?.user?.id);
	const searchPara = await searchParams
	const search = searchPara?.search?.trim()
	// console.log(userId);


	const sort = searchPara?.sort || 'popular';
	let orderByClause;
	if (sort === 'newest') {
		orderByClause = { createdAt: 'desc' };
	} else if (sort === 'oldest') {
		orderByClause = { createdAt: 'asc' };
	} else if (sort === 'popular') {
		orderByClause = {
			likes: {
				_count: 'desc',
			},
		};
	} else {
		orderByClause = { createdAt: 'desc' };
	}
	const truncateWords = (str: string) => {
		const words = str.split(' ');
		if (words.length <= 50) {
			return str;
		}
		return words.slice(0, 30).join(' ') + '...';
	};

	// Fetch blogs server-side
	const blogs = await prisma.blog.findMany({
		where: {
			authorId: { not: userId },
			isPublic: true,
			...(search && {
				OR: [
					{ title: { contains: search, mode: 'insensitive' } },
					{ description: { contains: search, mode: 'insensitive' } },
					{ author: { username: { contains: search, mode: 'insensitive' } } },
				],
			}),
		},
		select: {
			author: {
				select: {
					username: true,
				},
			},
			likes: true,
			title: true,
			description: true,
			id: true,
			createdAt: true,
		},
		orderBy: orderByClause,
	});
	// console.log(blogs);

	return (
		<div className="min-h-screen">
			<Header
				buttonText={session ? 'Write Blog' : 'Signin'}
				route={session ? '/create' : '/login'}
			/>
			<div className="container mx-auto mt-8 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-montserrat font-bold">All Blogs</h1>
						<p className="font-montserrat font-semibold mt-2 text-gray-500">
							Discover stories, insights, and ideas from our community
						</p>
					</div>
					<SearchSort />
					<div className="flex flex-col gap-4">
						{blogs.map((blog) => (
							<Card
								key={blog.id}
								className="hover:shadow-lg transition-shadow group"
							>
								<CardHeader>
									<CardTitle>{blog.title}</CardTitle>
									<CardDescription>
										{truncateWords(blog.description)}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex justify-end gap-4 items-center">
										<div className="flex items-center gap-1 tesm">
											<Heart className="w-3 h-3" />
											<span>{blog.likes.length}</span>
										</div>
										<div className="flex items-center gap-1 tesm">
											<User className="w-3 h-3" />
											<span>{blog.author.username}</span>
										</div>
										<div className="flex items-center gap-1 tesm">
											<Calendar className="w-3 h-3" />
											<span>
												{String(blog.createdAt.toISOString().split('T')[0])}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
