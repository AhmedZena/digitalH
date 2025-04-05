"use client";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import {
	Button,
	type ButtonProps,
	buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

// import { Link } from "../link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		// role="navigation"
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<"a">;

const PaginationLink = ({
	className,
	isActive,
	size = "icon",
	children,
	href,
	...props
}: PaginationLinkProps) => (
	<Link
		href={href as string}
		aria-current={isActive ? "page" : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? "outline" : "ghost",
				size,
			}),
			className,
		)}
		{...props}
	>
		{children}
	</Link>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn("gap-1 pl-2.5", className)}
		{...props}
	>
		<ChevronLeftIcon className="size-4" />
		<span>Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn("gap-1 pr-2.5", className)}
		{...props}
	>
		<span>Next</span>
		<ChevronRightIcon className="size-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<DotsHorizontalIcon className="size-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};

export type TablePaginationProps = {
	totalPages: number;
	currentPage: number;
	pageSize: number;
	setPage: (page: number) => void;
};

export const TablePagination = ({
	pagination,
}: {
	pagination: TablePaginationProps;
}) => {
	return (
		<div className="flex items-center justify-center gap-2 py-4 flex-wrap select-none">
			<Button
				className="  text-white rounded-full p-0 w-10 h-10 me-2"
				size="sm"
				onClick={() => pagination.setPage(pagination.currentPage - 1)}
				disabled={pagination.currentPage <= 1}
			>
				<div className="flex items-center gap-1">
					{/* {i18n.dir() === "ltr" ? <ChevronLeft /> : <ChevronRight />} */}
					<ChevronLeft />
				</div>
			</Button>

			{(() => {
				const totalPages = Math.ceil(
					pagination.totalPages / pagination.pageSize,
				);
				const currentPage = pagination.currentPage;
				const visiblePages: (number | string)[] = [];

				// push it only 1 if not included in the visible pages
				if (!visiblePages.includes(1) && totalPages > 1) {
					visiblePages.push(1);
				}

				// Ellipsis before the current range if needed
				if (currentPage > 3) {
					visiblePages.push("...");
				}

				// Add current range of pages
				const startPage = Math.max(2, currentPage - 1);
				const endPage = Math.min(totalPages - 1, currentPage + 1);
				for (let i = startPage; i <= endPage; i++) {
					visiblePages.push(i);
				}

				// Ellipsis after the current range if needed
				if (currentPage < totalPages - 2) visiblePages.push("...");

				// Always show the last page
				if (currentPage <= totalPages) visiblePages.push(totalPages);

				return visiblePages.map((page, index) => {
					if (page === "...") {
						return (
							<span
								key={crypto.randomUUID()}
								className="px-2 text-neutral-500 select-none"
							>
								...
							</span>
						);
					}

					const isActive = page === currentPage;
					return (
						<Button
							key={crypto.randomUUID()}
							className={`w-10 h-10  shadow-none rounded-full text-base font-bold ${
								isActive
									? "bg-secondary text-white"
									: "bg-white text-black border hover:text-white"
							}`}
							size="sm"
							// onClick={() => pagination.onPageChange(+page)}
							onClick={() => pagination.setPage(+page)}
						>
							{page}
						</Button>
					);
				});
			})()}

			<Button
				className="  text-white  rounded-full p-0 w-10 h-10 ms-2"
				size="sm"
				// onClick={() => pagination?.onPageChange(pagination.currentPage + 1)}
				onClick={() => pagination.setPage(pagination.currentPage + 1)}
				disabled={
					pagination.currentPage >=
					Math.ceil(pagination.totalPages / pagination.pageSize)
				}
			>
				<div className="flex items-center gap-1">
					{/* {i18n.dir() === "ltr" ? <ChevronRight /> : <ChevronLeft />} */}
					<ChevronRight />
				</div>
			</Button>
		</div>
	);
};
