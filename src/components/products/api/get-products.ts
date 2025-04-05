import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { TProductEntity } from "../types";
import { useProductStore } from "@/store/products.store";

export const getProducts = ({
	searchedTitle,
}: { searchedTitle?: string }): Promise<TProductEntity[]> => {
	const { page, pageSize, filters } = useProductStore.getState();
	console.log(searchedTitle);
	return api.get("/products", {
		params: {
			// currentPage: page,
			// perPage: pageSize,
			// ...filters,
			// ?offset=0&limit=10
			offset: (page - 1) * pageSize,
			limit: pageSize,
			title: searchedTitle,
		},
	});
};

export const getProductsQueryOptions = (searchedTitle?: string) => {
	const { page, pageSize, filters } = useProductStore.getState();

	return queryOptions({
		queryKey: ["productGrid", page, pageSize, filters, searchedTitle],
		queryFn: () => getProducts({ searchedTitle }),
	});
};

type UseProductsOptions = {
	queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
	searchedTitle?: string;
};

export const useProducts = ({
	queryConfig,
	searchedTitle,
}: UseProductsOptions = {}) => {
	return useQuery({
		...getProductsQueryOptions(searchedTitle),
		...queryConfig,
	});
};
