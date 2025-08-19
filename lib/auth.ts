import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
import type { SessionStrategy } from "next-auth";


export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'email and password',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					placeholder: 'enter your email',
				},
				password: {
					label: 'password',
					type: 'password',
					placeholder: 'enter your password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const { email, password } = credentials;
				const user = await prisma.user.findUnique({
					where: { email },
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await bcrypt.compare(password, user.password);

				if (isPasswordValid) {
					return {
						id: user.id.toString(),
						email: user.email,
						name: user.username, // Map to NextAuth's expected field
					};
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt' as SessionStrategy,
	},
	callbacks: {
		async jwt({ token, user }: { token: any; user?: any }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: {session: any, token: any}) {
			if (token) {
				if (session.user) {
					session.user.id =
						typeof token.id === 'string' ? token.id : token.id?.toString();
				}
			}
			return session;
		},
	},
};
