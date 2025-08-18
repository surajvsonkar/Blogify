import { BookOpen, House, Pen, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
	return (
		<div className="p-4 border-b-black border sticky top-0 z-50 bg-white">
			<div className="flex justify-between">
				<Link href={'/'} className="flex gap-2">
					<Pen />
					<h1 className="uppercase font-montserrat font-semibold">blogify</h1>
				</Link>

				<div className="flex justify-between items-center gap-5">
					<Link className='flex gap-2 justify-center items-center' href={''}>
						<House />
						<span>Home</span>
					</Link>
					<Link className='flex gap-2 justify-center items-center' href={''}>
						<BookOpen />
						<span>Blogs</span>
					</Link>
					<Link className='flex gap-2 justify-center items-center' href={''}>
						<Settings />
						<span>Dashboard</span>
					</Link>
					<Link href={'/login'} className='py-2 px-4 bg-foreground font-roboto text-white rounded-md hover:bg-foreground/90'>Signin</Link>
				</div>
			</div>
		</div>
	);
}
