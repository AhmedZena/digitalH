"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
// import useLocaleStore from '@/locale/locale-slice';
import { cn } from "@/lib/utils";
// import { NavLink, useLocation } from 'react-router-dom';
import type { SideNavigationItem } from "./app-sidebar";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ComponentProps = {
	data: SideNavigationItem[];
};

export function NavMain({ data }: ComponentProps) {
	// const { currentLang } = useLocaleStore();
	const { i18n } = useTranslation();
	const currentLang = i18n.language;
	const { state, isMobile, toggleSidebar } = useSidebar();

	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarMenu
				className={cn(
					state === "collapsed" && !isMobile && "mt-7 items-center",
				)}
			>
				{data.map((item) => (
					<Collapsible
						key={item.name}
						asChild
						defaultOpen={item?.items?.some(
							(subItem) =>
								pathname === subItem.to || pathname.startsWith(subItem.to),
						)}
						className={cn(
							"mx-auto flex w-60 items-center justify-center text-center",
							state === "collapsed" && "w-auto",
						)}
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								{item?.items ? (
									<SidebarMenuButton variant="outline" tooltip={item.name}>
										{item.icon && (
											<item.icon
												color="#0F598A"
												className="!w-[20px] !h-[20px]"
											/>
										)}
										<div className="flex w-full justify-between">
											{item?.items ? (
												<>
													<span>{item.name}</span>
													{currentLang === "ar" ? (
														<ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-[-90deg]" />
													) : (
														<ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
													)}
												</>
											) : (
												<Link
													key={item.name}
													href={item.to}
													// end={item.name !== 'Discussions'}
												>
													{item.name}
												</Link>
											)}
										</div>
									</SidebarMenuButton>
								) : (
									<Link
										key={item.name}
										href={item.to}
										// end={item.name !== 'Discussions'}
										className="h-[56px] w-[243px] select-none"
									>
										<SidebarMenuButton
											variant="outline"
											tooltip={item.name}
											className={cn(
												"H8 grid h-full grid-cols-[auto_1fr] items-center",
												state === "collapsed" ? "items-start gap-0" : "gap-4",
												pathname.startsWith(item.to)
													? "bg-secondary text-white"
													: "bg-transparent",

												"hover:bg-secondary/70 hover:text-white focus:bg-secondary ",
											)}
											onClick={() => isMobile && toggleSidebar()}
										>
											{item.icon && (
												<item.icon
													// color={
													// 	currentPath.startsWith(item.to) ? "#fff" : "#000C24"
													// }
													className={cn("!w-[18px]", "hover:fill-white")}
												/>
											)}

											<div>
												{item?.items ? (
													<>
														{/* Render the name and conditional arrow based on language */}
														<span>{item.name}</span>

														{currentLang === "ar" ? (
															<ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-[-90deg]" />
														) : (
															<ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
														)}
													</>
												) : (
													<span
														className={cn(
															state === "collapsed" && "hidden",
															"flex items-center justify-start ps-4",
														)}
													>
														{item.name}
													</span>
												)}
											</div>
										</SidebarMenuButton>
									</Link>
								)}
							</CollapsibleTrigger>
							{item.items && item.items.length > 0 && (
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton className="Over" asChild>
													<Link
														key={subItem.title}
														href={subItem.to}
														// end={subItem.title !== 'Discussions'}
														className={cn(
															"text-dark",
															// currentPath.endsWith(subItem.to)
															// 	? "bg-dark text-dark"
															// 	: "",
														)}
													>
														{subItem.title}
													</Link>
													{/* <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a> */}
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
