import { Roboto, Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/providers';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-roboto',
});

const montserrat = Montserrat({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-montserrat',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${roboto.variable} ${montserrat.variable}`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
