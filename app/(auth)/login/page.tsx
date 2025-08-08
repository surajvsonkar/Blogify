"use client"
import { LoaderFive } from "@/components/ui/loader";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

export default function Login() {

	const [error,setError] = useState('')
	const [loading,setLoading] = useState(false)

	const emailRef = useRef(null)
	const passwordRef = useRef(null)

	const login = async()=> {
		
	}

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
								onClick={() => redirect('/register')}
							>
								CREATE AN ACCOUNT
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
