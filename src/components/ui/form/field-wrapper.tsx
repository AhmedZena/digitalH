import type { FieldError } from "react-hook-form";

import { FieldErrorWrapper } from "./error";
import { Label } from "./label";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type ExtendedFieldError = FieldError & {
	length?: string;
	type?: string;
};

type FieldWrapperProps = {
	label?: string;
	className?: string;
	labelClassName?: string;
	wrapperClassName?: string;
	children: React.ReactNode;
	error?: ExtendedFieldError | FieldError | undefined;
	optional?: boolean;
	note?: string;
};

export type FieldWrapperPassThroughProps = Omit<
	FieldWrapperProps,
	"className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
	const { t } = useTranslation();
	const { label, labelClassName, error, className, children, note, optional } =
		props;
	return (
		<div className={className}>
			<Label
				className={cn(
					error ? "text-error" : "text-dark",

					labelClassName,
				)}
				data-test-id="Label-k8je2"
			>
				{label && (
					<span>
						{t(label)}
						{optional && <span className="  mx-2 ">({t("OPTIONAL")})</span>}
					</span>
				)}
				<div className={`${label ? "mt-3" : ""}`}>{children}</div>
			</Label>
			{note && <p className="text-neutral-400 text-xs mt-1">{t(note)}</p>}
			<FieldErrorWrapper
				errorMessage={
					error?.message === "Required"
						? t("REQUIRED")
						: error?.message
							? t(error.message)
							: ""
				}
			/>
		</div>
	);
};
