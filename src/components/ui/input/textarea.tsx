import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
	FieldWrapper,
	type FieldWrapperPassThroughProps,
} from "../form/field-wrapper";
import { useTranslation } from "react-i18next";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
	FieldWrapperPassThroughProps & {
		className?: string;
		registration: Partial<UseFormRegisterReturn>;
	};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, label, error, registration, placeholder, ...props }, ref) => {
		const { t } = useTranslation();
		return (
			<FieldWrapper label={label} error={error}>
				<textarea
					className={cn(
						"flex min-h-[60px] w-full rounded-xl border border-primary-600 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					ref={ref}
					placeholder={placeholder ? t(placeholder) : undefined}
					maxLength={500}
					{...registration}
					{...props}
					data-test-id="textarea-5ks6x"
				/>
			</FieldWrapper>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };
