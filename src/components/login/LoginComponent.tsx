import React from "react";
import { SignInButton } from "../sign-in-button";

const LoginComponent = () => {
	return (
		<div className="flex flex-col items-center justify-center lg:h-screen lg:flex-row">
			<div className="flex h-[50vh] md:h-full w-full flex-col items-center justify-center gap-5 bg-neutral-50 px-6 lg:w-[592px]">
				<picture>
					<img
						src="/imgs/login.png"
						alt="login"
						className="w-72 object-cover lg:h-full lg:w-full"
					/>
				</picture>
			</div>
			<div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-neutral-50 px-6 lg:w-[592px]">
				<p> You Are Not Signed In</p> <SignInButton />
			</div>
		</div>
	);
};

export default LoginComponent;
