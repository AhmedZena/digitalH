"use client";
import React, { useState } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/form/label";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { Pen, Plus } from "lucide-react";
import { FormCreator } from "../ui/form/form-creator";
import { useCategories } from "../categories/api/get-categories";
import { useAddProduct } from "./api/add-product";
import { useProductStore } from "@/store/products.store";
import { showToast } from "../ui/toast/toastify";
import { addProductSchema, type SchemaType } from "./schema";
import type { TProductEntity } from "./types";

const AddProduct = ({
	product,
	isEdit = false,
}: { product?: TProductEntity; isEdit?: boolean }) => {
	const { t } = useTranslation();
	const { data, isLoading, refetch } = useCategories();
	const { setPage } = useProductStore();
	const [sheetOpen, setSheetOpen] = useState(false);

	const productFields = [
		{
			name: "title",
			label: "Title",
			placeholder: "Product Title",
			type: "text",
			colSpan: 2,
			defaultValue: product?.title || "",
		},
		{
			name: "description",
			label: "Description",
			placeholder: "Product Description",
			type: "textarea",
			colSpan: 2,
			value: product?.description || "",
		},
		{
			name: "price",
			label: "Price",
			placeholder: "Product Price",
			type: "number",
			colSpan: 2,
			value: String(product?.price) || "",
		},
		{
			name: "categoryId",
			label: "Category",
			placeholder: "Select Category",
			type: "select",
			options: data?.map((cat) => ({
				label: cat.name,
				value: cat.id.toString(),
			})),
			isLoading: isLoading,
			colSpan: 2,
			value: product?.category?.id?.toString() || "",
		},
		{
			name: "image",
			label: "Image URL",
			placeholder: "Product Image URL",
			type: "text",
			colSpan: 2,
			defaultValue: product?.images ? product.images[0] : "",
		},
	];

	const addCarMutation = useAddProduct({
		mutationConfig: {
			onSuccess: () => {
				showToast("success", "Product added successfully");
				setSheetOpen(false);
				setTimeout(() => {
					setPage(1);
					refetch();
				}, 1000);
			},
			// biome-ignore lint/suspicious/noExplicitAny: global error
			onError: (error: any) => {
				showToast("error", error.response.data.message);
				setSheetOpen(false);
			},
		},
	});

	// Submit handler
	const handleSubmit = (values: SchemaType) => {
		const data = {
			title: values.title,
			description: values.description,
			price: Number(values.price),
			categoryId: Number(values.categoryId),
			images: [values.image],
		};

		addCarMutation.mutate({ data });
	};
	return (
		<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger asChild>
				{isEdit ? (
					<Button variant={"ghost"} icon={<Pen />} />
				) : (
					<Button
						className="flex h-auto items-center justify-center gap-2 rounded-full p-4"
						icon={<Plus className="size-5 lg:size-8" />}
					>
						<span className="H8 text-white">Add Product</span>
					</Button>
				)}
			</SheetTrigger>
			<SheetContent className="overflow-y-auto ">
				<SheetHeader>
					<SheetTitle>{isEdit ? "Edit Product" : "Add Product"}</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<FormCreator
					formId="add-product-form"
					fields={productFields}
					onSubmit={handleSubmit}
					schema={addProductSchema}
					isSubmitting={addCarMutation.isPending}
					confirmButtonText={isEdit ? "Update" : "Add Product"}
				/>
			</SheetContent>
		</Sheet>
	);
};

export default AddProduct;
