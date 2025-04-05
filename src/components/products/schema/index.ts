import { z } from "zod";

export const addProductSchema = z.object({
	title: z.string().min(4, "Title must be at least 4 characters long"),
	price: z.string().min(3, "Price must be at least 100"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters long"),
	categoryId: z.string().min(1, "REQUIRED"),
	image: z.string().url("Image must be a valid URL"),
});

export type SchemaType = z.infer<typeof addProductSchema>;
