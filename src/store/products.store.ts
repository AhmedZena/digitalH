import { create } from "zustand";
import { z } from "zod";

export type ProductFilters = {
	price?: string;
	categoryId?: string;
};

interface CarStore {
	filters: ProductFilters;
	page: number;
	pageSize: number;
	totalPages: number;
	setFilters: (filters: ProductFilters) => void;
	resetFilters: () => void;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	setTotalPages: (totalPages: number) => void;
	reset: () => void;
}

export const useProductStore = create<CarStore>((set) => ({
	filters: {},
	page: 1,
	pageSize: 10,
	totalPages: 80,
	setFilters: (newFilters) =>
		set((state) => ({ filters: { ...state.filters, ...newFilters } })),
	resetFilters: () => set({ filters: {} }),
	setPage: (page) => set({ page }),
	setPageSize: (pageSize) => set({ pageSize }),
	setTotalPages: (totalPages) => set({ totalPages }),
	reset: () =>
		set({
			filters: {},
			page: 1,
			pageSize: 10,
			totalPages: 10,
		}),
}));

// filteration schema
export const ProductsFiltersSchema = z.object({
	price: z.string().optional(),
	categoryId: z.string().optional(),
});
