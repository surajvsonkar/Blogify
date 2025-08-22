'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/ui/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authOptions } from '@/lib/auth';
import { FileText, Plus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
	const session = useSession();
	console.log(session);
	const [selectedTab, setSelectedTab] = useState('content');
	return (
		<div className="min-h-screen">
			<Header
				buttonText={session ? 'Write Blog' : 'Signin'}
				route={session ? '/create' : 'login'}
			/>

			<div className="container mx-auto mt8 px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-6 flex justify-between items-center">
						<div>
							<h1 className="text-4xl font-montserrat font-bold">Dashboard</h1>
							<p className="font-montserrat font-semibold mt-2 text-gray-500">
								Manage your blog and track performance
							</p>
						</div>
						<Link
							href={'/create'}
							className="flex justify-center items-center bg-accent-foreground py-2 px-4 text-white rounded-md font-roboto hover:bg-accent hover:text-black border border-black"
						>
							<Plus className="mr-2 w-3 h-3" />
							<span>New Blog</span>
						</Link>
					</div>
					<Tabs
						value={selectedTab}
						className="space-y-6"
						onValueChange={setSelectedTab}
					>
						<TabsList>
							<TabsTrigger value="content">content</TabsTrigger>
							<TabsTrigger value="content2">content2</TabsTrigger>
							<TabsTrigger value="content3">content3</TabsTrigger>
						</TabsList>

						<TabsContent value="content" className="space-y-6">
							<div className="grid grid-cols-4 gap-4">
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className='text-xs font-medium'>Total Posts</CardTitle>
										<FileText className='h-4 w-4 text-muted-foreground' />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">24</div>
										<p className='text-xs text-muted-foreground'>+2 from last month</p>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
