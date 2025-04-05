"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown";
import { Button } from "./button";
import { Settings } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
// import { useLogout, useUser } from "@/lib/auth";
import LanguageSwitcher from "../language-switcher";
import { SidebarTrigger } from "./sidebar";
import { useTranslation } from "react-i18next";
import TextEllipsis from "./TextEllipsis";
import Link from "next/link";
import { auth } from "@/auth";
import type { Session } from "next-auth";
import { SignOutButton } from "../sign-out-button";

const DashboardNavbar = ({ session }: { session: Session }) => {
	// const user = useUser();
	const { t } = useTranslation();

	// const logout = useLogout();
	return (
		<div className="container flex items-center justify-between gap-8 flex-row w-full bg-white nav-header fixed top-0 z-10">
			<SidebarTrigger />
			<div className="flex w-full items-center justify-between gap-3  lg:py-2 md:py-3 py-1">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="flex lg:w-40 w-fit items-center justify-center rounded-none lg:border-s-2 lg:ps-3 gap-0"
						>
							<div className="flex items-center justify-start gap-2">
								<Avatar className="md:size-10 h-8 w-8 rounded-full border border-neutral-300 ">
									<AvatarImage
										// src={`/assets/imgs/profile.png`}
										src={session?.user?.image || "https://i.pravatar.cc/150"}
										alt="alt"
										className="w-full h-full"
									/>
								</Avatar>
								<TextEllipsis
									text={session?.user?.name || "User Name"}
									className="Line_600 !text-dark"
									textColor="#ff6319 "
									maxTextCount={20}
								/>
							</div>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="lg:w-40 w-48 bg-white">
						<DropdownMenuGroup className="p-0">
							<DropdownMenuItem className={cn("block px-4 py-3 text-dark")}>
								<Link href="/dashboard/user-info" className="w-full">
									<div className="flex justify-end gap-3">
										<span>{t("PROFILE")}</span>
										<Settings />
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator className="w-[90%] bg-dark mx-auto " />
							<DropdownMenuItem
								className={cn("block p0 text-dark text-sm hover:!bg-white")}
							>
								<SignOutButton />
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default DashboardNavbar;
