'use client';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { startTransition, useEffect, useOptimistic, useState } from 'react';

interface likeProps {
	userId: number;
	blogId: number;
    initialLiked: boolean;
}

export default function HandleLike({ userId, blogId,initialLiked }: likeProps) {
	const [liked, setLiked] = useState(initialLiked);

	const handleLike = async () => {
		setLiked((prevLiked) => !prevLiked);
		try {
			const res = await axios.post('/api/blogs/like', {
				blogId,
				userId,
			});
			alert(res.data.msg);
			console.log(res.data.msg);
		} catch (error) {
			console.log(error);
			setLiked((prevLiked) => !prevLiked);
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
