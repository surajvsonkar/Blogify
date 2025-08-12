import axios from 'axios';
import { useSession } from 'next-auth/react';

import { useRef, useState } from 'react';

interface PopupcardProps {
	onClose: () => void;
}

const popupcard = ({ onClose }: PopupcardProps) => {
    const [loading,setLoading] = useState(false)
	const [error, setError] = useState('');
	const session = useSession();
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const createTodo = async () => {
		const title = titleRef.current?.value;
		const description = descriptionRef.current?.value;

		if (!title || !description) {
			return setError('*all fields are required');
		}

		try {
            setLoading(true)
			const blog = await axios.post('/api/blogs/create', {
				title,
				description,
				authorId: Number(session.data?.user.id),
			});

			console.log(blog);
		} catch (error) {
			console.log(error);
		}
		onClose();
		console.log(title, description);
	};
	return (
		<div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">

			<div className="flex flex-col items-center justify-center w-[18%] gap-2 bg-white rounded-xl mt-[10%] h-[30%]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="size-6 relative left-[43%] top-[-5%] cursor-pointer"
                onClick={onClose}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
				<input
					className="py-2 px-4 border border-black placeholder:text-xl placeholder:capitalize"
					ref={titleRef}
					required
					type="text"
					placeholder="enter the title"
				/>
				<input
					className="py-2 px-4 border border-black placeholder:text-xl placeholder:capitalize"
					ref={descriptionRef}
					required
					type="text"
					placeholder="enter the description"
				/>
				{error && <p className="text-red-500 text-xs text-left">{error}</p>}
				<button
                disabled={loading}
					onClick={createTodo}
					className={`${loading ? "bg-gray-100 text-black" : "bg-black cursor-pointer"} py-2 px-4 text-white rounded-xl font-montserrat text-xl font-semibold`}
				>
					{loading ? "Creating" : "Create"}
				</button>
			</div>
		</div>
	);
};

export default popupcard;
