"use client";
import TextEllipsis from "@/components/ui/TextEllipsis";
import { Button } from "@/components/ui/button/button";
import { DataTable } from "@/components/ui/table/data-table";
import { useDebounceValue } from "usehooks-ts";

import {
	ArrowDown,
	ArrowUp,
	ChartColumnIncreasing,
	Download,
	Expand,
	EyeIcon,
	NutIcon,
	Plus,
	RefreshCw,
	TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useProducts } from "@/components/products/api/get-products";
import { ProductsFiltersSchema, useProductStore } from "@/store/products.store";
import { Spinner } from "@/components/ui/spinner";
import { exportToExcel } from "@/lib/export-excel";
import { useDisclosure } from "@/hooks/use-disclosure";
import { ConfirmModal } from "@/components/ui/modal/confirm-modal";
import AddProduct from "@/components/products/add-product";
import type { confirmModalProps } from "@/types/confirm-modal-types";
import Zoom from "react-medium-image-zoom";
import { useDeleteProduct } from "@/components/products/api/delete-product";
import { showToast } from "@/components/ui/toast/toastify";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/components/categories/api/get-categories";
import Filter from "@/components/ui/filter";

const Products = () => {
	const { t } = useTranslation();
	const [searchByTitle, setSearchByTitle] = useState<string>("");
	const [debouncedValue] = useDebounceValue(searchByTitle, 500);
	const { data, isLoading, isFetching, refetch } = useProducts({
		searchedTitle: debouncedValue,
	});
	const { close, open, isOpen } = useDisclosure();
	const { data: categories, isLoading: catLoading } = useCategories();

	const {
		page,
		setPage,
		pageSize,
		totalPages,
		setFilters,
		resetFilters,
		filters,
	} = useProductStore();
	console.log("filters", filters);
	// Single confirm modal state
	const [modalConfig, setModalConfig] = useState<
		(confirmModalProps & { productId?: number }) | null
	>(null);

	const handleModalOpen = (
		config: confirmModalProps & { productId?: number },
	) => {
		setModalConfig(config);
		open();
	};

	const tableData = data;

	console.log("tableData", tableData);

	const deleteMutation = useDeleteProduct({
		productId: modalConfig?.productId,
		queryConfig: {
			enabled: false,
		},
	});

	return (
		<div className="m-auto flex w-[95vw] flex-col gap-5 md:w-full">
			<h2 className="lg:text-5xl ">{t("Products")}</h2>
			<div className="mx-auto mt-6 flex w-11/12 flex-col rounded-xl border-2 px-2 pt-6 md:w-full">
				<div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 px-4 md:items-center md:justify-between md:gap-0">
					<h2 className="H7 w-fit text-dark">{t("Products")}</h2>

					<Input
						onChange={(e) => {
							setSearchByTitle(e.target.value);
							setPage(1);
						}}
						value={searchByTitle}
						placeholder={t("Search by title")}
						className="w-full"
					/>

					<div className="flex w-fit justify-between gap-4 md:h-14 md:justify-end">
						<div className="flex h-auto w-full flex-wrap gap-4">
							<Button
								className=" flex h-auto items-center justify-center rounded-xl bg-[#FBFBFB] text-dark shadow-md hover:text-white md:p-5 "
								icon={<RefreshCw className="size-4 md:size-5" />}
								onClick={() => refetch()}
								isLoading={isFetching && !isLoading}
							/>

							<AddProduct refetch={refetch} />
							{/* <div> */}
							<Button
								className="flex h-auto items-center justify-center gap-2 rounded-full p-4"
								icon={<Download className="size-4 md:size-5" />}
								onClick={() => {
									if (tableData) {
										exportToExcel(
											tableData.map((item) => ({
												TITLE: item.title,
												DESCRIPTION: item.description,
											})),
											["TITLE", "DESCRIPTION"],
											[t("TITLE"), t("DESCRIPTION")],
											"Products.xlsx",
										);
									}
								}}
							>
								<span className="H7">{t("EXPORT")}</span>
							</Button>
							{/* </div> */}
						</div>
					</div>
				</div>

				<div className="px-4">
					<Filter
						filters={
							[
								{
									label: t("Price"),
									inputName: "price",
									placeholder: t("Price"),
									type: "number",
								},
								{
									label: t("Category"),
									inputName: "categoryId",
									placeholder: t("Select Category"),
									type: "select",
									isLoading: catLoading,
									options: categories?.map((cat) => ({
										label: cat.name,
										value: cat.id.toString(),
									})),
								},
							] as Array<{
								label: string;
								inputName: string;
								placeholder: string;
								type: string;
								isLoading?: boolean;
								options?: Array<{ label: string; value: string }>;
							}>
						}
						setFilters={setFilters}
						resetFilters={resetFilters}
						schema={ProductsFiltersSchema}
						key="products-filters"
						setPage={setPage}
						// type="sidebar"
					/>
					<DataTable
						columns={[
							{
								accessorKey: "id",
								header: t("Id"),
								cell: ({ row }) => {
									const value = row?.original?.id;
									return <TextEllipsis text={value?.toString()} />;
								},
							},
							// img
							{
								accessorKey: "images",
								header: "Image",
								cell: ({ row }) => {
									const value = row?.original?.images[0];
									return (
										// used img because of the next/image have problem with domains
										<Zoom>
											<img
												src={value}
												alt="Product"
												className="w-20 h-20 rounded-md object-cover"
												loading="lazy"
											/>
										</Zoom>
									);
								},
							},

							{
								accessorKey: "title",
								header: ({ column }) => (
									<Button
										variant="ghost"
										className="w-fit cursor-pointer select-none bg-transparent text-black hover:bg-transparent  "
										onClick={() =>
											column.toggleSorting(column.getIsSorted() === "asc")
										}
										icon={
											column.getIsSorted() === "asc" ? (
												<ArrowUp />
											) : (
												<ArrowDown />
											)
										}
									>
										{t("Title")}
									</Button>
								),
								cell: ({ row }) => {
									const value = row?.original?.title;
									return (
										<TextEllipsis text={value?.toString()} maxTextCount={30} />
									);
								},
							},
							{
								accessorKey: "description",
								header: "Description",
								cell: ({ row }) => {
									const value = row?.original?.description;
									return (
										<TextEllipsis
											text={value?.toString()}
											maxTextCount={50}
											className="w-96"
										/>
									);
								},
							},

							// price
							{
								accessorKey: "price",
								header: ({ column }) => (
									<Button
										variant="ghost"
										className="w-fit cursor-pointer select-none bg-transparent text-black hover:bg-transparent  "
										onClick={() =>
											column.toggleSorting(column.getIsSorted() === "asc")
										}
										icon={
											column.getIsSorted() === "asc" ? (
												<ArrowUp />
											) : (
												<ArrowDown />
											)
										}
									>
										{t("Price")}
									</Button>
								),

								cell: ({ row }) => {
									const value = row?.original?.price;
									return (
										<TextEllipsis text={value?.toString()} maxTextCount={30} />
									);
								},
							},

							// category
							{
								accessorKey: "category",
								header: "Category",
								cell: ({ row }) => {
									const value = row?.original?.category;
									return (
										<TextEllipsis
											text={value?.name?.toString()}
											maxTextCount={50}
											className="w-96"
										/>
									);
								},
							},
							{
								accessorKey: "details",
								header: () => (
									<span className="text-center flex items-center w-full justify-center">
										{t("Actions")}
									</span>
								),
								cell: ({ row }) => {
									return (
										<div className="flex items-center justify-center gap-3">
											<Button
												// href={`/dashboard/product/${row.original.id}`}
												className=" bg-transparent text-black hover:bg-transparent flex h-6 w-6 items-center justify-center rounded-[4px] "
												onClick={(e) => {
													e.preventDefault();
													handleModalOpen({
														title: "PRODUCT_DETAILS",
														productId: row.original.id,
														showFooter: false,
														cancelButtonText: "Close",
														descriptionComponent: (
															<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
																{/* صورة المنتج */}
																<div className="w-full flex justify-center">
																	<Zoom>
																		<img
																			src={row.original.images?.[0]}
																			alt={row.original.title}
																			className="w-full max-w-sm rounded-lg object-cover shadow-md"
																		/>
																	</Zoom>
																</div>

																{/* التفاصيل */}
																<div className="flex flex-col gap-4 text-sm text-gray-700">
																	<h3 className="text-xl font-semibold text-primary">
																		{row.original.title}
																	</h3>

																	<div>
																		<p className="font-medium text-gray-500">
																			{t("DESCRIPTION")}
																		</p>
																		<p className="text-gray-800">
																			{row.original.description}
																		</p>
																	</div>

																	<div>
																		<p className="font-medium text-gray-500">
																			{t("PRICE")}
																		</p>
																		<p className="text-gray-800">
																			${row.original.price}
																		</p>
																	</div>

																	<div>
																		<p className="font-medium text-gray-500">
																			{t("CATEGORY")}
																		</p>
																		<p className="text-gray-800">
																			{row.original.category?.name}
																		</p>
																	</div>
																</div>
															</div>
														),
													});
												}}
											>
												<EyeIcon />
											</Button>

											{/* edit is same as the add */}
											<AddProduct
												product={row.original}
												isEdit={true}
												refetch={refetch}
											/>

											<Button
												className="bg-transparent text-red-200 hover:bg-transparent hover:text-red-500"
												icon={<TrashIcon className="text-red-200" />}
												onClick={() =>
													handleModalOpen({
														title: "Are You Sure to Delete This Product?",
														productId: row.original.id,
														description: `product ${row.original.title} will be deleted`,
														confirmButtonAction: async () => {
															try {
																await deleteMutation.refetch();
																refetch();
																close();
																showToast(
																	"success",
																	"Product deleted successfully",
																);
															} catch (err) {
																console.error("Delete failed", err);
																showToast("error", "Product delete failed");
															}
														},
													})
												}
											/>
										</div>
									);
								},
							},
						]}
						data={tableData}
						pagination={{
							currentPage: page,
							pageSize,
							totalPages,
							setPage,
						}}
						isLoading={isLoading}
					/>
				</div>
			</div>
			{modalConfig && (
				<ConfirmModal
					isOpen={isOpen}
					open={open}
					close={close}
					cancelButtonText="Cancel"
					{...modalConfig}
					confirmButtonBgColor="red"
					confirmButtonTextColor="white"
					confirmButtonText="Delete"
					titleColor="red"
					isLoading={deleteMutation.isLoading}
				/>
			)}
		</div>
	);
};

export default Products;
