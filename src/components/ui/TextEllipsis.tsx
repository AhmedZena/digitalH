import useLocaleStore from "@/locale/locale-slice";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "@/lib/utils";

type TextEllipsisProps = {
	text?: string;
	maxTextCount?: number;
	tooltip?: boolean;
	textColor?: string;
	className?: string;
};

const TextEllipsis = (props: TextEllipsisProps) => {
	const {
		text = "",
		maxTextCount = 20,
		tooltip = true,
		textColor = "#000000",
		className,
	} = props;
	const { currentLang } = useLocaleStore();

	const isEnglish = (text: string): boolean => {
		return /^[A-Za-z0-9\s.,!?()'-]*$/.test(text);
	};

	const handleDirection = (text: string) => {
		const shouldPrefixWithEllipsis =
			(currentLang === "en" && !isEnglish(text)) ||
			(currentLang === "ar" && isEnglish(text));

		const textToReturn = `${text.substring(0, maxTextCount)}...`;

		return shouldPrefixWithEllipsis
			? `...${textToReturn.slice(0, maxTextCount)}`
			: textToReturn;
	};

	return (
		<>
			{tooltip && text?.length > maxTextCount ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<span style={{ color: textColor }}>
							{/* {isEnglish(text)
                ? "..." + text.substring(0, maxTextCount)
                : text.substring(0, maxTextCount) + "..."} */}
							{/* {text.substring(0, maxTextCount) + "..."} */}
							{handleDirection(text)}
						</span>
					</TooltipTrigger>
					<TooltipContent
						className={cn(className, "text-dark")}
						style={{ color: textColor }}
					>
						{text}
					</TooltipContent>
				</Tooltip>
			) : text?.length > maxTextCount ? (
				`${text.substring(0, maxTextCount)}...`
			) : (
				<span className={className}>{text}</span>
			)}
		</>
	);
};
export default TextEllipsis;
