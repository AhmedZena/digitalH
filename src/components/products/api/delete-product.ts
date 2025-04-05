import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";

export const deleteProduct = (productId?: number): Promise<void> => {
	return api.delete(`/products/${productId}`);
};

export const deleteProductQueryOptions = (productId?: number) => {
	return queryOptions({
		queryKey: ["deleteProduct", productId],
		queryFn: () => deleteProduct(productId),
	});
};

type UseDeleteProductOptions = {
	productId?: number;
	queryConfig?: QueryConfig<typeof deleteProductQueryOptions>;
};

export const useDeleteProduct = ({
	productId,
	queryConfig,
}: UseDeleteProductOptions) => {
	return useQuery({
		...deleteProductQueryOptions(productId),
		...queryConfig,
	});
};
