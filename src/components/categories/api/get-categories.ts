import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";

export const getCategories = (): Promise<TCategoryEntity[]> => {
	return api.get("/categories");
};

export const getCategoriesQueryOptions = () => {
	return queryOptions({
		queryKey: ["categoryGrid"],
		queryFn: getCategories,
	});
};

type UseCategoriesOptions = {
	queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
	return useQuery({
		...getCategoriesQueryOptions(),
		...queryConfig,
	});
};
