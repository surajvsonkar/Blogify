'use client';
import { Button } from '@/components/ui/button';
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
import axios from 'axios';
import { Save, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CreateBlog() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [status, setStatus] = useState('draft');
	const [error, setError] = useState('');
	const [pending, setPending] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const session = useSession();

	// console.log(status);

	const handleCreate = async () => {
		if (title.length == 0 || content.length == 0) {
			return setError('Title and content is required!');
		}

		const description = content;
		const authorId = Number(session.data?.user.id);
		let isPublic:boolean;
		let msg;
		if(status === 'draft') {
			isPublic = false
			msg = 'Blog is Saved Successfully'
		} else {
			isPublic = true
			msg = 'Blog is Published Successfully'
		}
		console.log(isPublic)
		setPending(true);
		try {
			const blog = await axios.post('/api/blogs/create', {
				title,
				description,
				authorId,
				isPublic
			});
			console.log(blog);
			setPending(false);
			return setSuccessMsg(msg);
		} catch (error) {
			console.log(error);
			setError('something went wrong, try again!');
			setPending(false);
		}
	};
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
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="status">Status</Label>
										<Select value={status} onValueChange={setStatus}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="draft">Draft</SelectItem>
												<SelectItem value="publish">Publish</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="flex flex-col gap-2">
										<Button
											onClick={handleCreate}
											className="w-full font-montserrat font-bold"
										>
											{status === 'publish' ? <Send className="mr-2 h-4 w-4" /> : <Save className='mr-2 h-4 w-4'/>}
											
											{status === 'publish' ? `${pending ? 'Publishing' : 'Publish Post'}` : `${pending ? 'Saving' : 'Save Draft'}`}
											
										</Button>
										<p
											className="text-green-400 font-montserrat font-bold mt-2 text-sm
										"
										>
											{successMsg}
										</p>
									</div>
								</CardContent>
							</Card>
							{error && (
								<p className="font-roboto font-semibold text-red-400">
									{error}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
