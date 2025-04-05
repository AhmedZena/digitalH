"use client";
import i18next from "i18next";
import { create } from "zustand";

interface LocaleState {
	direction: string;
	currentTheme: string;
	savedTheme?: string;
	dark: boolean;
	setDirection: (lang: string) => void;
	setTheme: (theme: string) => void;
	setDark: (isDark: boolean) => void;
}

const useDirectionStore = create<LocaleState>((set) => {
	const savedTheme = JSON.parse(localStorage.getItem("currentTheme") || "{}");

	return {
		direction: i18next.dir(),
		dark: savedTheme?.dark ?? false,
		currentTheme: savedTheme?.theme ?? "default",
		setDirection: (dir: string) => set({ direction: dir }),
		setDark: (isDark: boolean) => {
			localStorage.setItem(
				"currentTheme",
				JSON.stringify({
					...savedTheme,
					dark: isDark,
					theme: savedTheme?.theme ?? "",
				}),
			);
			set({ dark: isDark });
		},
		setTheme: (theme: string) => {
			localStorage.setItem(
				"currentTheme",
				JSON.stringify({
					...savedTheme,
					theme,
					dark: savedTheme?.dark ?? false,
				}),
			);
			set({ currentTheme: theme });
		},
	};
});

export default useDirectionStore;
