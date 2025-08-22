'use client';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useOptimistic, useState } from 'react';

interface likeProps {
	userId: number;
	blogId: number;
}

export default function HandleLike({ userId, blogId }: likeProps) {
	const [liked, setLiked] = useState(false);
	const [optimisticLike, addOptimisticLike] = useOptimistic(liked,(liked,newLike)=> [...liked,newLike])
	console.log(userId, blogId);
	useEffect(() => {
		alreadyLiked();
	}, [blogId, userId]);
	const alreadyLiked = async () => {
		try {
			const res = await axios.get(
				`/api/blogs/like?userId=${userId}&blogId=${blogId}`,
				{
					data: {
						userId,
						blogId,
					},
				}
			);
			setLiked(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async () => {
		try {
			const res = await axios.post('/api/blogs/like', {
				blogId,
				userId,
			});
			alert(res.data.msg);
			console.log(res.data.msg);
		} catch (error) {
			console.log(error);
			alert('an Error occurred! Try Again');
		}
	};
	return (
		<button
			className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all cursor-pointer border border-black ${
				liked
					? 'bg-accent-foreground text-white hover:bg-transparent hover:text-black'
					: 'hover:bg-accent-foreground hover:text-white'
			}`}
			onClick={handleLike}
		>
			<Heart className="mr-2 w-4 h-4" />
			<p className="font-montserrat">Like</p>
		</button>
	);
}
