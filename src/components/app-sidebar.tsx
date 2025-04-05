"use client";
import type * as React from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';

import { NavMain } from "@/components/nav-main";
// import { TeamSwitcher } from '@/components/team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BookDashed, User, Users } from "lucide-react";
// import { Button } from './ui/button';
// import { LayoutDashboardIcon } from "lucide-react";

export type SideNavigationItem = {
	name?: string;
	to: string;
	icon?: React.ElementType;
	haveId?: boolean;
	items?: {
		title: string;
		to: string;
	}[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state, toggleSidebar, isMobile } = useSidebar();

	return (
		<Sidebar collapsible="icon" {...props} className="w-72">
			<SidebarHeader>
				<div>
					<Link
						key="home"
						href="/dashboard/home"
						onClick={() => isMobile && toggleSidebar()}
						className={cn(
							"text-lg font-semibold text-dark hover:text-dark lg:py-6 lg:px-3",
						)}
					>
						{/* digitalH */}
						{state === "collapsed" ? (
							<span className="hidden lg:inline-flex">DH</span>
						) : (
							<span className="hidden lg:inline-flex">DigitalH</span>
						)}
					</Link>
				</div>
			</SidebarHeader>
			<SidebarContent
				className={cn(
					state === "collapsed" && "px-0 mx-0",
					state === "expanded" && "px-2",
				)}
			>
				<NavMain
					data={[
						{
							name: "home",
							to: "/dashboard/home",
							icon: BookDashed,
						},
						{ name: "products", to: "/dashboard/products", icon: Users },
					]}
				/>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
