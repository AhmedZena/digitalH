import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { TProductEntity } from "../types";
import { useProductStore } from "@/store/products.store";

export const getProducts = (): Promise<TProductEntity[]> => {
	const { page, pageSize, filters } = useProductStore.getState();
	return api.get("/products", {
		params: {
			// currentPage: page,
			// perPage: pageSize,
			// ...filters,
			// ?offset=0&limit=10
			offset: (page - 1) * pageSize,
			limit: pageSize,
		},
	});
};

export const getProductsQueryOptions = () => {
	return queryOptions({
		queryKey: ["productGrid", useProductStore.getState()],
		queryFn: getProducts,
	});
};

type UseProductsOptions = {
	queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig }: UseProductsOptions = {}) => {
	return useQuery({
		...getProductsQueryOptions(),
		...queryConfig,
	});
};
