"use client";
import useLocaleStore from "@/locale/locale-slice";
import { dateLocales } from "@/lib/i18n";
import dayjs from "dayjs";
import i18n from "i18next";
import { useEffect } from "react";

function useLocale(): string {
	const { currentLang } = useLocaleStore();
	// const { i18n } = useTranslation();

	useEffect(() => {
		const formattedLang = i18n?.language?.replace(/-([a-z])/g, (g) =>
			g[1].toUpperCase(),
		);

		if (currentLang !== i18n.language) {
			i18n.changeLanguage(formattedLang);
		}

		dateLocales[formattedLang as keyof typeof dateLocales]().then(() => {
			dayjs.locale(formattedLang);
		});
	}, [currentLang]);

	return currentLang;
}

export default useLocale;
