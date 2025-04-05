"use client";

import { queryConfig } from "@/lib/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

// img zoom
import "react-medium-image-zoom/dist/styles.css";

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() => new QueryClient({ defaultOptions: queryConfig }),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			{children}
		</QueryClientProvider>
	);
}
