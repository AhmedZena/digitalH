import { auth } from "@/auth";
import LoginComponent from "@/components/login/LoginComponent";
import { SignInButton } from "@/components/sign-in-button";

import { redirect } from "next/navigation";

export default async function MyApp() {
	const session = await auth();

	if (session?.user) {
		redirect("/dashboard/home");
	}

	return <LoginComponent />;
}
