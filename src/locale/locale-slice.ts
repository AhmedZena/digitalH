"use client";
import i18next from "i18next";
import { create } from "zustand";
interface LocaleState {
	currentLang: string;
	countryCode?: string;
	setLang: (lang: string) => void;
	setCountryCode: (code: string) => void;
}
// const currentLang = localStorage.getItem("i18nextLng") || "ar";
const useLocaleStore = create<LocaleState>((set) => ({
	currentLang: i18next.language,
	countryCode: undefined,
	setLang: (lang: string) => {
		i18next.changeLanguage(lang);
		set({ currentLang: lang });
		// localStorage.setItem("i18nextLng", lang || "ar");
		document.querySelector("html")?.setAttribute("lang", lang || "ar");
	},
	setCountryCode: (code: string) => set({ countryCode: code }),
}));

export default useLocaleStore;
