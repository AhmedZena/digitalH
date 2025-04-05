"use client";
import { login, logout } from "@/lib/actions/auth";
import { Button } from "./ui/button";

export const SignOutButton = () => {
	return (
		<Button
			onClick={() => logout()}
			className=" cursor-pointer w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
		>
			{" "}
			Sign Out
		</Button>
	);
};
