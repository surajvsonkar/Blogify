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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authOptions } from '@/lib/auth';
import { FileText, Plus, Search } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
	const session = useSession();
	console.log(session);
	const [selectedTab, setSelectedTab] = useState('overview');
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
						className="space-y-6 mb-6"
						onValueChange={setSelectedTab}
					>
						<TabsList className="grid w-full grid-cols-3 lg:w-96 font-montserrat font-bold">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="blog">Blogs</TabsTrigger>
							<TabsTrigger value="analytics">Analytics</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-6">
							<div className="grid grid-cols-4 gap-4">
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-xs font-medium">
											Total Posts
										</CardTitle>
										<FileText className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">24</div>
										<p className="text-xs text-muted-foreground">
											+2 from last month
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-xs font-medium">
											Total Posts
										</CardTitle>
										<FileText className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">24</div>
										<p className="text-xs text-muted-foreground">
											+2 from last month
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-xs font-medium">
											Total Posts
										</CardTitle>
										<FileText className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">24</div>
										<p className="text-xs text-muted-foreground">
											+2 from last month
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-xs font-medium">
											Total Posts
										</CardTitle>
										<FileText className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">24</div>
										<p className="text-xs text-muted-foreground">
											+2 from last month
										</p>
									</CardContent>
								</Card>
							</div>
							<Card className="bg-accent">
								<CardHeader>
									<CardTitle>Recent Activity</CardTitle>
									<CardDescription>Latest updates on your blog</CardDescription>
								</CardHeader>
								<CardContent>
									<Link
										href={''}
										className="flex justify-between mb-4 hover:bg-white p-2"
									>
										<p>New comment onGetting Started with Next.js</p>
										<span>2 days ago</span>
									</Link>
									<Link href={''} className="flex justify-between mb-4">
										<p>New comment onGetting Started with Next.js</p>
										<span>2 days ago</span>
									</Link>
									<Link href={''} className="flex justify-between mb-4">
										<p>New comment onGetting Started with Next.js</p>
										<span>2 days ago</span>
									</Link>
									<Link href={''} className="flex justify-between mb-4">
										<p>New comment onGetting Started with Next.js</p>
										<span>2 days ago</span>
									</Link>
									<Link href={''} className="flex justify-between mb-4">
										<p>New comment onGetting Started with Next.js</p>
										<span>2 days ago</span>
									</Link>
								</CardContent>
							</Card>
						</TabsContent>

                        <TabsContent value='blog' className='space-y-6'>
                            <div className='flex'>
                                <div className='relative flex-1'>
                                    <Search className='w-4 h-4 transform -translate-y-1/2 absolute left-3 top-1/2'/>
                                    <Input placeholder='Search Blogs....' className='pl-10'/>
                                </div>
                            </div>
                        </TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
Card;
