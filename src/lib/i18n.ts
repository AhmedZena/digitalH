"use client";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: "/lang/{{lng}}.json",
		},
		preload: ["en", "ar"],
		fallbackLng: "en",
		// lng: localStorage.getItem("i18nextLng") || "ar", // Initial language based on saved language
		lng: "en",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		supportedLngs: ["en", "ar"],
		react: {
			useSuspense: false,
		},
		// detection: {
		// 	order: ["localStorage", "navigator"],
		// 	caches: ["localStorage"], // Caches the chosen language to localStorage
		// },
	});

export const dateLocales = {
	en: () => import("dayjs/locale/en"),
	ar: () => import("dayjs/locale/ar"),
};

export default i18n;
