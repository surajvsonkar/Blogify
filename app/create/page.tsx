'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CreateBlog() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [status, setStatus] = useState('Draft');
	const session = useSession();
    console.log(status)
	return (
		<div className="min-h-screen">
			<Header
				buttonText={
					session.status === 'authenticated' ? `Write Blog` : `Signin`
				}
				route={session.status === 'authenticated' ? '/create' : '/login'}
			/>
			<div className="container mx-auto mt-8 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-montserrat font-bold">
							Create New Blog
						</h1>
						<p className="font-montserrat font-semibold mt-2 text-gray-500">
							Share your thoughts and stories with the world
						</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Blog Title</CardTitle>
									<CardDescription>
										Give your blog a compelling title
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Input
										placeholder="Enter your blog title..."
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="text-lg"
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Content</CardTitle>
									<CardDescription>
										Write your blog content using Markdown
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Textarea
										placeholder="Start writing your blog..."
										value={content}
										onChange={(e) => setContent(e.target.value)}
										className="min-h-[400px] resize-none"
									/>
								</CardContent>
							</Card>
						</div>
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Publish</CardTitle>
									<CardDescription>
										Manage your blog publication
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='space-y-2'>
										<Label htmlFor="status">Status</Label>
										<Select value={status} onValueChange={setStatus}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="draft">Draft</SelectItem>
												<SelectItem value="published">Published</SelectItem>
												<SelectItem value="scheduled">Scheduled</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
