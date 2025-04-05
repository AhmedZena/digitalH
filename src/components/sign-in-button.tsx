"use client";
import { login } from "@/lib/actions/auth";
import { Button } from "./ui/button";

export const SignInButton = () => {
	return (
		<Button
			onClick={() => login()}
			className=" cursor-pointer w-1/2 rounded-lg bg-black hover:bg-black/80 text-white font-bold py-2 px-4 "
		>
			Sign In With Github
		</Button>
	);
};
