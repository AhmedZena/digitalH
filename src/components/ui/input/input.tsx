import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
	FieldWrapper,
	type FieldWrapperPassThroughProps,
} from "@/components/ui/form/field-wrapper";
import { useTranslation } from "react-i18next";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	FieldWrapperPassThroughProps & {
		className?: string;
		wrapperClassName?: string;
		labelClassName?: string;
		registration?: Partial<UseFormRegisterReturn> & { value?: string | number };
	};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			wrapperClassName,
			labelClassName,
			type,
			label,
			error,
			registration,
			placeholder,
			optional,
			note,
			...props
		},
		forwardedRef, // ← the parent ref
	) => {
		const { t } = useTranslation<"translation", undefined>();

		// if value so registersion it
		React.useEffect(() => {
			if (props.value) {
				registration?.onChange?.({
					target: {
						name: registration.name,
						value: `${props.value}`,
					},
				});
			}
		}, [props.value, registration]);

		return (
			<FieldWrapper
				label={label}
				error={error}
				className={wrapperClassName}
				labelClassName={labelClassName}
				optional={optional}
				note={note}
			>
				<input
					type={type}
					className={cn(
						" leading-9 placeholder:leading-9 flex w-full min-h-14 rounded-xl bg-transparent px-3 py-2 shadow-sm transition-colors  placeholder:text-neutral-500 focus:border-secondary text-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary  disabled:opacity-90 placeholder:text-xs",
						error
							? "border-error text-error placeholder:text-error focus:border-error"
							: "",
						className,
					)}
					placeholder={placeholder ? t(placeholder) : undefined}
					{...registration}
					{...props}
					ref={forwardedRef}
					data-test-id="input-j6myu"
				/>
			</FieldWrapper>
		);
	},
);

Input.displayName = "Input";
