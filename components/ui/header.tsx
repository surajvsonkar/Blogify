import { BookOpen, House, Pen, Settings } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
	buttonText: string;
	route: string;
}

export default function Header({buttonText,route}: HeaderProps) {
	return (
		<div className="p-4 border-b-black border sticky top-0 z-50 bg-white">
			<div className="flex justify-between">
				<Link href={'/'} className="flex gap-2 justify-center items-center">
					<Pen />
					<h1 className="uppercase font-montserrat font-semibold">blogify</h1>
				</Link>

				<div className="flex justify-between items-center gap-5">
					<Link className='flex gap-2 justify-center items-center' href={'/'}>
						<House />
						<span>Home</span>
					</Link>
					<Link className='flex gap-2 justify-center items-center' href={'/blogs'}>
						<BookOpen />
						<span>Blogs</span>
					</Link>
					<Link className='flex gap-2 justify-center items-center' href={'/dashboard'}>
						<Settings />
						<span>Dashboard</span>
					</Link>
					<Link href={route} className='py-2 px-4 bg-foreground font-roboto text-white rounded-md hover:bg-foreground/90'>{buttonText}</Link>
				</div>
			</div>
		</div>
	);
}
