'use client';
import Header from '@/components/ui/header';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Home() {
	const session = useSession();
	const particlesInit = async (main: any) => {
		await loadFull(main);
	};

	return (
		session.status !== 'loading' && (
			<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
				<Particles
					id="tsparticles"
					init={particlesInit}
					options={{
						background: { color: '#fff' },
						particles: {
							number: { value: 200, density: { enable: true, area: 800 } },
							color: { value: '#000' },
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
					<div className="min-h-screen">
						<Header
							buttonText={
								session.status === 'authenticated' ? `Write Post` : `Signin`
							}
							route={session.status === 'authenticated' ? '/create' : '/login'}
						/>

						<section className="py-20">
							<div className="container mx-auto max-w-4xl text-center">
								<h1 className="text-6xl font-bold font-montserrat mb-6 leading-tight">
									Share Your Stories with the{' '}
									<span className="text-green-400">World</span>
								</h1>
								<p className="text-xl font-roboto mb-6">
									A modern blogging platform designed for writers, thinkers, and
									storytellers. Create, publish, and manage your content with
									ease.
								</p>
								<div className="flex justify-center items-center gap-5 mt-6">
									<Link
										href={''}
										className="flex py-2 px-4 justify-center items-center gap-2 bg-foreground text-white rounded-md hover:bg-foreground/90"
									>
										<h1 className="text-xl font-montserrat">Start Writing</h1>
										<ArrowRight />
									</Link>

									<Link
										href={''}
										className="flex py-2 px-4 justify-center items-center gap-2 hover:bg-foreground hover:text-white border border-black rounded-md"
									>
										<h1 className="text-xl font-montserrat">Explore Posts</h1>{' '}
										<BookOpen />
									</Link>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		)
	);
}
