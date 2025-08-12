'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { LoaderFour } from './loader';
import { useState } from 'react';

export default function Header() {

	const [openBlogPopup,setOpenBlogPopup] = useState(false)
	const session = useSession();
	console.log(session.data);
	console.log(openBlogPopup)

	return (
		<div className="py-5 px-8">
			<div className="flex justify-between">
				{session.status === 'loading' ? (
					<div className='flex justify-center items-center text-black'><LoaderFour/></div>
				) : (
					<>
						<h1 className="text-2xl font-bold font-montserrat">BLOGIFY</h1>
						{session.status === 'unauthenticated' && (
							<button
								className="bg-black py-2 px-4 cursor-pointer text-white rounded-xl font-roboto"
								onClick={() => {
									redirect('/login');
								}}
							>
								LOGIN
							</button>
						)}
						{session.status === 'authenticated' && (
							<div className="flex justify-center items-center gap-5">
								<button className="py-2 px-4 rounded-xl font-roboto cursor-pointer border-1 border-black" onClick={()=>setOpenBlogPopup(!openBlogPopup)}>
									New Blog
								</button>
								<button className="py-2 px-4 bg-black text-white rounded-xl font-roboto cursor-pointer">
									My Blogs
								</button>
								<h2>Welcome, {session.data.user.name}</h2>
								<button
									className="py-2 px-4 border-textGray border-1 rounded-2xl cursor-pointer"
									onClick={() => {
										signOut();
										redirect('/login');
									}}
								>
									LOGOUT
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
