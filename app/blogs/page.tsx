'use client';
import Header from '@/components/ui/header';
import { useSession } from 'next-auth/react';

export default function BlogPage() {
	const session = useSession();

	return (
		session.status !== 'loading' && (
			<div className="min-h-screen">
				<Header
					buttonText={
						session.status === 'authenticated' ? `Write Blog` : `Signin`
					}
					route={session.status === 'authenticated' ? '/create' : '/login'}
				/>
			</div>
		)
	);
}
