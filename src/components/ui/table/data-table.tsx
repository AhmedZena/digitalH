"use client";
import {
	type ColumnDef,
	flexRender,
	type SortingState,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TablePagination, type TablePaginationProps } from "./pagination";
import { useState } from "react";
import { Skeleton } from "../skeleton";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | undefined;
	pagination: TablePaginationProps;
	isLoading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const { t } = useTranslation();
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			pagination: {
				pageIndex: pagination?.currentPage - 1,
				pageSize: pagination?.pageSize,
			},
		},
		manualPagination: true,
	});

	return (
		<div className="w-full">
			<div className="rounded-2xl">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({ length: 5 }).map(() => (
								<TableRow key={crypto.randomUUID()}>
									{columns.map((_, colIndex) => (
										<TableCell key={columns[colIndex]?.id || colIndex}>
											<Skeleton className="h-6 w-full" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows?.length ? (
							// Render actual rows if not loading
							table
								.getRowModel()
								.rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										className="gap-4"
									>
										{row.getVisibleCells().map((cell, index) => (
											<TableCell
												key={cell.id}
												isFirst={index === 0}
												isLast={index === row.getVisibleCells().length - 1}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{t("NO_RESULTS")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<TablePagination pagination={pagination} />
		</div>
	);
}
