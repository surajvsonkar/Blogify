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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function BlogPage() {
	const prisma = new PrismaClient();

	// Get session on server
	const session = await getServerSession(authOptions);
	const userId = Number(session?.user?.id);
	// console.log(userId);

	const truncateWords = (str: string) => {
		const words = str.split(' ');
		if (words.length <= 50) {
			return str;
		}
		return words.slice(0, 30).join(' ') + '...';
	};

	// Fetch blogs server-side
	const blogs = await prisma.blog.findMany({
		where: { authorId: { not: userId }, isPublic: true },
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
					<div className="flex flex-col sm:flex-row mb-8 gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search Blogs...." className="pl-10" />
						</div>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest First</SelectItem>
								<SelectItem value="oldest">Oldest First</SelectItem>
								<SelectItem value="popular">Most Popular</SelectItem>
							</SelectContent>
						</Select>
					</div>
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
