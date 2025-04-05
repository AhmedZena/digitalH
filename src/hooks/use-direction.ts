"use client";
import useDirectionStore from "@/locale/theme-slice";
import { useEffect } from "react";

function useDirection(): [string, (dir: string) => void] {
	const { direction, setDirection } = useDirectionStore();

	const updateDirection = (dir: string) => {
		const newDirection = dir === "ltr" ? "rtl" : "ltr";
		setDirection(newDirection);
	};
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		const root = window.document.documentElement;
		root.setAttribute("dir", direction);
	}, [direction]);

	return [direction, updateDirection];
}

export default useDirection;
