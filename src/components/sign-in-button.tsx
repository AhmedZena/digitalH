"use client";
import { login } from "@/lib/actions/auth";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SignInButtonProps {
	provider: "github" | "google";
	label?: string;
	btnClassName?: string;
}

export const SignInButton = ({
	provider,
	label,
	btnClassName,
}: SignInButtonProps) => {
	return (
		<Button
			onClick={() => login(provider)}
			className={cn(
				"cursor-pointer w-1/2 rounded-lg bg-black hover:bg-black/80 text-white font-bold py-2 px-4",
				btnClassName,
			)}
		>
			{label ||
				`Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
		</Button>
	);
};
