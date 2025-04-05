import { cn } from "@/lib/utils";
import useLocaleStore from "@/locale/locale-slice";
import useDirectionStore from "@/locale/theme-slice";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown";

const refactorLang = (lang: string) => {
	switch (lang) {
		case "en":
			return "English";
		case "ar":
			return "اللغة العربية";
		default:
			return "English";
	}
};
const LanguageSwitcher = () => {
	const { setLang, currentLang } = useLocaleStore();
	const { setDirection } = useDirectionStore();
	const onDirSelect = (val: string) => {
		setDirection(val === "ar" ? "rtl" : "ltr");
	};
	const languageList = [
		{ label: "English", value: "en", flag: "us" },
		{ label: "اللغة العربية", value: "ar", flag: "ar" },
	];
	const onLanguageSelect = (lang: string) => {
		onDirSelect(lang);
		setLang(lang);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="w-fit overflow-hidden rounded-xl font-light text-dark hover:bg-white hover:text-dark lg:px-3 lg:py-6"
					dir="ltr"
				>
					<span className="flex h-full items-center justify-center gap-2 rounded-full">
						<span className="hidden lg:inline-flex">
							<ChevronDown />
						</span>
						<span className="hidden lg:flex">{refactorLang(currentLang)}</span>
						<Globe strokeWidth={1.5} className="h-6 w-6 md:size-9 lg:size-6" />
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				{languageList?.map((lang) => (
					<div key={lang.value}>
						<DropdownMenuItem
							key={lang.value}
							onClick={() => {
								onLanguageSelect(lang.value);
							}}
							className={cn(
								"block px-4 py-2 text-center font-semibold text-dark text-sm",
							)}
						>
							{lang.label}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSwitcher;
