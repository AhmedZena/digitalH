export type TProductEntity = {
	id?: number;
	title: string;
	slug?: string;
	price: number;
	description: string;
	category?: TCategoryEntity;
	images: string[];
};
