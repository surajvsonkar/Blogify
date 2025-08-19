'use client';
import { LoaderFive } from '@/components/ui/loader';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Login() {
	const router = useRouter()
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const login = async () => {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (!email || !password) {
			setError('all fields are required');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address');
			return;
		}

		setLoading(true);
		setError('');
		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});
			setLoading(false);
			if (result?.error) {
				setError('Invalid email or password');
			} else if (result?.ok) {
				alert('user is logged in successfully');
				redirect('/');
			}
		} catch (error) {
			setLoading(false);
			setError('an unexpected error happened! try again.');
			console.log(error);
		}
	};

	const particlesInit = async (main: any) => {
		await loadFull(main);
	};

	return (
		<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={{
					background: { color: '#000' },
					particles: {
						number: { value: 450, density: { enable: true, area: 800 } },
						color: { value: '#ffffff' },
						shape: { type: 'circle' },
						opacity: { value: 0.3 },
						size: { value: 3 },
						move: { enable: true, speed: 2 },
					},
				}}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 0,
				}}
			/>
			<div style={{ position: 'relative', zIndex: 1 }}>
				<div className="flex justify-center items-center h-screen font-roboto">
					<div className="border-1 border-black w-100 h-fit flex flex-col justify-center p-12 bg-white">
						{loading ? (
							<div className="flex items-center justify-center">
								<LoaderFive text="Logging the User" />
							</div>
						) : (
							<>
								<h2 className="text-2xl text-black text-center font-semibold font-montserrat">
									Login to Blogify
								</h2>
								<div className="flex flex-col py-2 px-4 border-1 border-black mt-6">
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
								<div className="flex flex-col gap-2">
									<button
										onClick={login}
										className="cursor-pointer w-full bg-black text-white py-2 px-4 mt-5"
									>
										LOGIN
									</button>
									<button
										className="cursor-pointer w-full border-1 border-black text-black py-2 px-4"
										onClick={() => router.push('/register')}
									>
										CREATE AN ACCOUNT
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
