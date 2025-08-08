'use client';
import { useRef, useState } from 'react';
import axios from 'axios';
import { LoaderFive, LoaderOne } from '@/components/ui/loader';
import { redirect } from 'next/navigation';

export default function Register() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const register = async () => {
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;
		const email = emailRef.current?.value;

		if (!username || !email || !password) {
			setError('all fileds are required');
			return;
		}

		if (username.length < 6) {
			setError('username atleast have 6 characters');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address');
			return;
		}

		if (password.length < 8) {
			setError('password atleast have 8 characters');
			return;
		}

		setLoading(true);

		try {
			const res = await axios.post('/api/register', {
				username,
				password,
				email,
			});
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setError(error.response.data.msg);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen font-roboto">
			<div className="border-1 border-black w-100 h-fit flex flex-col justify-center p-12">
				{loading ? (
					<LoaderFive text="Registering the user" />
				) : (
					<>
						<h2 className="text-2xl text-black text-center font-semibold font-montserrat">
							Sign up to Blogify
						</h2>
						<div className="flex flex-col py-2 px-4 border-1 border-black mt-6">
							<label htmlFor="username" className="text-sm">
								USERNAME
							</label>
							<input
								required
								ref={usernameRef}
								id="username"
								type="text"
								placeholder="surajvsonkar"
								className="border-none outline-0 text-textGray"
							/>
						</div>
						<div className="flex flex-col py-2 px-4 border-1 border-black">
							<label htmlFor="email">Email</label>
							<input
								required
								ref={emailRef}
								id="email"
								type="email"
								placeholder="surajvsonkar"
								className="border-none outline-0 text-textGray"
							/>
						</div>
						<div className="flex flex-col py-2 px-4 border-1 border-black">
							<label htmlFor="password">Password</label>
							<input
								required
								ref={passwordRef}
								type="password"
								placeholder="surajvsonkar"
								className="border-none outline-0 placeholder:text-textGray"
							/>
						</div>
						{error && (
							<div className="text-xs text-red-500 font-montserrat">
								{error}
							</div>
						)}
						<div className='flex flex-col gap-2'>
							<button
								onClick={register}
								className="cursor-pointer w-full bg-black text-white py-2 px-4 mt-5"
							>
								CREATE AN ACCOUNT
							</button>
							<button
								className="cursor-pointer w-full border-1 border-black text-black py-2 px-4"
								onClick={() => redirect('/login')}
							>
								LOGIN
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
