import { NumericFormat } from "react-number-format";
import type { InputProps } from "./input";
import { useEffect, useRef } from "react";
import { FieldWrapper } from "../form/field-wrapper";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// const InputNumber = React.forwardRef<HTMLInputElement, InputProps>(
const InputNumber = ({
	className,
	wrapperClassName,
	labelClassName,
	type,
	label,
	error,
	registration,
	placeholder,
	optional,
	min = 1,
	maxLength = 10,
	defaultValue,
	value,
	...props
}: InputProps) => {
	const { t } = useTranslation();
	// Local ref to handle the input focus
	const inputRef = useRef<HTMLInputElement>(null);

	// focus on the input if the error is true
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (error && inputRef?.current) {
			inputRef.current.focus();
		}
	}, [error, inputRef]);

	// if value so registration value will be value
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (value) {
			registration?.onChange?.({
				target: {
					name: registration.name,
					value: value,
				},
			});
		}
	}, [value]);

	return (
		<FieldWrapper
			label={label}
			error={error}
			className={wrapperClassName}
			labelClassName={labelClassName}
			optional={optional}
		>
			<NumericFormat
				name={registration?.name}
				placeholder={placeholder ? t(placeholder) : undefined}
				className={cn(
					"flex h-9 w-full min-h-14 rounded-2xl  focus:shadow-none  bg-neutral-50 px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neatral-500 text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-xs",
					className,
					error
						? "border-error text-error placeholder:text-error focus:border-error"
						: "",
				)}
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				value={registration?.value as any}
				isAllowed={(values) => {
					const { value } = values;
					return value === "" || +value >= +min;
				}}
				onChange={(e) => {
					// const value = Math.max(+min, Number(e.target.value));
					const rawValue = e.target.value;
					registration?.onChange?.({
						target: {
							name: registration.name,
							value: rawValue,
						},
					});
				}}
				readOnly={props.readOnly}
				defaultValue={defaultValue ? +defaultValue : undefined}
				getInputRef={inputRef}
				maxLength={maxLength}
				{...props}
			/>
		</FieldWrapper>
	);
};

InputNumber.displayName = "InputNumber";

export { InputNumber };
