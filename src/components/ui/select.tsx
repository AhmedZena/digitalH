"use client";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
	FieldWrapper,
	type FieldWrapperPassThroughProps,
} from "./form/field-wrapper";
import Select, { components } from "react-select";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import type { Option } from "@/types/misc";
import TextEllipsis from "./TextEllipsis";
import Creatable from "react-select/creatable";

export type SelectFieldProps = FieldWrapperPassThroughProps & {
	options?: Option[];
	className?: string;
	defaultValue?: Option;
	registration?: Partial<UseFormRegisterReturn>;
	placeholder?: string;
	prefixIcon?: React.ElementType;
	disabled?: boolean;
	value?: string | number;
	name?: string;
	colSpan?: number;
	size?: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onChange?: (value: any) => void;
	isClearable?: boolean;
	placeholderSize?: string;
	placeholderWeight?: string;
	borderRadius?: string;
	border?: string;
	bgColor?: string;
	isLoading?: boolean;
	canAddNew?: boolean;
};

export const SelectField = (props: SelectFieldProps) => {
	const {
		label,
		options,
		error,
		className,
		defaultValue,
		registration,
		wrapperClassName,
		labelClassName,
		placeholder,
		prefixIcon: PrefixIcon,
		size = 24,
		disabled,
		optional,
		value,
		isClearable = false,
		onChange,
		placeholderSize = "12px",
		placeholderWeight = "300",
		borderRadius = "16px",
		bgColor = "#F9F9F9",
		border = "none",
		isLoading = false,
		canAddNew = false,
	} = props;
	const { t, i18n } = useTranslation();
	const [translatedOptions, setTranslatedOptions] = useState<Option[]>([]);
	const [selectedOption, setSelectedOption] = useState<
		Option | undefined | null
	>(defaultValue);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Translate the labels of the options whenever the language or options change
		const updatedOptions = options?.map((option) => ({
			...option,
			label: t(option.label),
		}));

		setTranslatedOptions(updatedOptions || []);

		// Determine the selected option based on the passed `value` or `selectedOption`
		const newSelectedOption =
			updatedOptions?.find((opt) => opt?.value === value) || null;
		setSelectedOption(newSelectedOption);
	}, [i18n.language, options, value]);

	// register value to form if first time there is a value
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Trigger the registration `onChange` if `value` exists
		if (value && registration?.onChange) {
			registration.onChange({
				target: {
					name: registration.name,
					value: value,
				},
			});
		}
	}, [value, i18n.language]);

	// useEffect(() => {
	//   if (error && selectRef.current) {
	//     selectRef.current.focus();
	//   }
	// }, [error]);

	const handleChange = (selectedOption: Option | null) => {
		if (registration?.onChange) {
			registration.onChange({
				target: {
					name: registration.name,
					value: selectedOption ? selectedOption.value : "",
				},
			});
			setSelectedOption(selectedOption);
		}
	};

	const handleCreateOption = (inputValue: string) => {
		const newOption = { value: inputValue, label: inputValue };

		setTranslatedOptions((prev) => {
			const updatedOptions = [...prev, newOption];
			setTimeout(() => {
				setSelectedOption(newOption); // Ensure selection after options update
			}, 0); // Delay to allow react-select to re-render
			return updatedOptions;
		});

		if (registration?.onChange) {
			registration.onChange({
				target: {
					name: registration.name,
					value: newOption.value,
				},
			});
		}

		if (onChange) {
			onChange(newOption);
		}
	};

	// Custom Option component to add the Check icon for selected options
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const CustomOption = (props: any) => (
		<components.Option {...props}>
			<div className="flex items-center justify-between">
				<span>
					<TextEllipsis text={props.label} textColor="gray" maxTextCount={30} />
				</span>
				{selectedOption?.value === props.value && <Check />}
			</div>
		</components.Option>
	);

	// Custom Control component to include the PrefixIcon
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const CustomControl = (controlProps: any) => (
		<div>
			<components.Control {...controlProps}>
				{PrefixIcon && (
					<div
						className={`rtl:mr-2 ltr:ml-2 ${
							error ? "text-red-600" : "text-dark"
						}`}
					>
						<PrefixIcon size={size} aria-hidden="true" />
					</div>
				)}
				{controlProps.children}
			</components.Control>
		</div>
	);

	return (
		<FieldWrapper
			label={label ? t(label) : ""}
			error={error}
			className={wrapperClassName}
			labelClassName={labelClassName}
			optional={optional}
		>
			{canAddNew ? (
				<Creatable
					ref={registration?.ref}
					classNamePrefix="react-select"
					options={isLoading ? [] : translatedOptions}
					// value={translatedOptions.find((opt) => opt.value === value) || null}
					isClearable={isClearable}
					value={selectedOption || null}
					onChange={onChange || handleChange}
					onCreateOption={handleCreateOption}
					placeholder={
						isLoading
							? t("LOADING_")
							: placeholder
								? t(placeholder)
								: t("SELECT_PLACEHOLDER")
					}
					components={{ Option: CustomOption, Control: CustomControl }}
					isDisabled={disabled}
					isLoading={isLoading}
					loadingMessage={() => t("LOADING_")}
					noOptionsMessage={() => t("NO_OPTIONS")}
					styles={{
						control: (base, state) => ({
							...base,
							border: error ? "1px solid #FF4D4F" : border,
							backgroundColor: disabled ? "#f7f7f7" : bgColor,
							borderRadius: borderRadius,
							minHeight: "52px",
							display: "flex",

							alignItems: "center",
							// boxShadow: value? 'none': base.boxShadow,
							boxShadow:
								state.isFocused && !value
									? "0 0 0 1px #FF4D4F"
									: state.isFocused && value
										? "none"
										: "none",
							":hover": {
								borderColor: error ? "#FF4D4F" : "#0000",
							},
						}),
						singleValue: (base) => ({
							...base,
							padding: "8px",
							color: "#000",
						}),
						valueContainer: (base) => ({
							...base,
							// padding: "10px",
						}),
						indicatorsContainer: (base) => ({
							...base,
							padding: "0",
							height: "50px",
							// marginTop: "auto",
						}),
						option: (base, state) => ({
							...base,
							color: "#000",
							// backgroundColor: selectedOption?.value === state.value
							backgroundColor: state.isSelected
								? "#ffc1a7"
								: state.isFocused
									? "#ffe0d1"
									: "white",
							":hover": {
								backgroundColor: state.isSelected ? "#ffcab1" : "#ffdece",
								// backgroundColor: selectedOption?.value === state.value ? '#d1eafa' : '#e8f4fd',
							},
						}),
						placeholder: (base) => ({
							...base,
							color: error ? "#FF4D4F" : "#737373",
							fontSize: placeholderSize,
							fontWeight: placeholderWeight,
						}),
					}}
					className={cn("react-select-container", className)}
					data-test-id="Select-5isu2"
				/>
			) : (
				<Select
					ref={registration?.ref}
					classNamePrefix="react-select"
					options={isLoading ? [] : translatedOptions}
					// value={translatedOptions.find((opt) => opt.value === value) || null}
					isClearable={isClearable}
					value={selectedOption || null}
					onChange={onChange || handleChange}
					// placeholder={placeholder ? t(placeholder) : t(`SELECT_PLACEHOLDER`)}
					placeholder={
						isLoading
							? t("LOADING_")
							: placeholder
								? t(placeholder)
								: t("SELECT_PLACEHOLDER")
					}
					components={{ Option: CustomOption, Control: CustomControl }}
					isDisabled={disabled}
					isLoading={isLoading}
					loadingMessage={() => t("LOADING_")}
					noOptionsMessage={() => t("NO_OPTIONS")}
					styles={{
						control: (base, state) => ({
							...base,
							border: error ? "1px solid #FF4D4F" : border,
							backgroundColor: disabled ? "#f7f7f7" : bgColor,
							borderRadius: borderRadius,
							minHeight: "52px",
							display: "flex",

							alignItems: "center",
							// boxShadow: value? 'none': base.boxShadow,
							boxShadow:
								state.isFocused && !value ? "0 0 0 1px #FF4D4F" : "none",
							":hover": {
								borderColor: error ? "#FF4D4F" : "#0000",
							},
						}),
						singleValue: (base) => ({
							...base,
							padding: "8px",
							color: "#000",
						}),
						valueContainer: (base) => ({
							...base,
							// padding: "10px",
						}),
						indicatorsContainer: (base) => ({
							...base,
							padding: "0",
							height: "50px",
							// marginTop: "auto",
						}),
						option: (base, state) => ({
							...base,
							color: "#000",
							// backgroundColor: selectedOption?.value === state.value
							backgroundColor: state.isSelected
								? "#ffc1a7"
								: state.isFocused
									? "#ffe0d1"
									: "white",
							":hover": {
								backgroundColor: state.isSelected ? "#ffcab1" : "#ffdece",
								// backgroundColor: selectedOption?.value === state.value ? '#d1eafa' : '#e8f4fd',
							},
						}),
						placeholder: (base) => ({
							...base,
							color: error ? "#FF4D4F" : "#737373",
							fontSize: placeholderSize,
							fontWeight: placeholderWeight,
						}),
					}}
					className={cn("react-select-container", className)}
					data-test-id="Select-5isu2"
				/>
			)}
		</FieldWrapper>
	);
};
