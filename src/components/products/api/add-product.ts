import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from 'zod';

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { TProductEntity } from "../types";

export const addProduct = ({
	data,
	type,
}: {
	data: TProductEntity;
	type: "add" | "edit";
}): Promise<TProductEntity> => {
	// return api.post("/products", data);
	if (type === "add") {
		return api.post("/products", data);
	}
	return api.put(`/products/${data.id}`, data);
};

type UseAddProductOptions = {
	mutationConfig?: MutationConfig<typeof addProduct>;
	type: "add" | "edit";
};

export const useAddProduct = ({
	mutationConfig,
	type,
}: UseAddProductOptions) => {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};

	return useMutation({
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["addProduct"],
			});
			onSuccess?.(...args);
		},
		...restConfig,
		mutationFn: addProduct,
	});
};
