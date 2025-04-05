import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { TProductEntity } from "../types";
import { useProductStore } from "@/store/products.store";

// Fetch a single product by ID
export const getProductById = (id: string): Promise<TProductEntity> => {
	return api.get(`/products/${id}`);
};

export const getProductByIdQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: ["product", id],
		queryFn: () => getProductById(id),
	});
};

type UseProductByIdOptions = {
	id: string;
	queryConfig?: QueryConfig<typeof getProductByIdQueryOptions>;
};

export const useProductById = ({ id, queryConfig }: UseProductByIdOptions) => {
	return useQuery({
		...getProductByIdQueryOptions(id),
		...queryConfig,
	});
};
