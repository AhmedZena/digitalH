import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from 'zod';

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { TProductEntity } from "../types";

export const addProduct = ({
	data,
}: {
	data: TProductEntity;
}): Promise<TProductEntity> => {
	return api.post("/products", data);
};

type UseAddProductOptions = {
	mutationConfig?: MutationConfig<typeof addProduct>;
};

export const useAddProduct = ({
	mutationConfig,
}: UseAddProductOptions = {}) => {
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
