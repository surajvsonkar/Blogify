import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function BlogPage() {
	const prisma = new PrismaClient();

	// Get session on server
	const session = await getServerSession(authOptions);
	const userId = Number(session?.user?.id);
	console.log(userId);

	// Fetch posts server-side
	const posts = await prisma.blog.findMany({
		where: { authorId: { not: userId }, isPublic: true },
	});
	// console.log(posts)

	return (
		<div className="min-h-screen">
			<Header
				buttonText={session ? 'Write Blog' : 'Signin'}
				route={session ? '/create' : '/login'}
			/>
			<div className="container mx-auto mt-8 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-montserrat font-bold">All Posts</h1>
						<p className="font-montserrat font-semibold mt-2 text-gray-500">
							Discover stories, insights, and ideas from our community
						</p>
					</div>
					<div className="flex flex-col sm:flex-row mb-8 gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search Posts...." className="pl-10" />
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
					{posts.map((post) => (
						<div key={post.id} className="mb-4 border p-4 rounded">
							<h2 className="text-xl font-semibold">{post.title}</h2>
							<p>{post.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
