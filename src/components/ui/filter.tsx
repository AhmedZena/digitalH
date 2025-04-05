import type { Option } from "@/types/misc";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
	type Control,
	Controller,
	type FieldError,
	type FieldValues,
	type UseFormRegister,
	type UseFormStateReturn,
	type UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Form } from "./form/form";
import { SelectField } from "../ui/select";
import { FieldWrapper } from "../ui/form/field-wrapper";
import { InputNumber } from "../ui/input/input-number";
import { Input } from "../ui/input/input";
import { useFilterStore } from "@/store/filter.store";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface InputProps {
	type: string;
	inputName: string;
	inputName2?: string;
	label: string;
	placeholder: string;
	options: Option[];
	prefixIcon?: React.ElementType;
	postfixIcon?: React.ElementType;
	value?: string;
	className?: string;
	canAddNew?: boolean;
}

// Type for the submit function prop

interface FilterProps {
	key: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	filters: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setFilters: (filters: any) => void;
	resetFilters: () => void;
	setPage: (page: number) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	schema?: any;
	setCloseDrawer?: Dispatch<SetStateAction<boolean>>;
	type?: string;
}
interface ExtendedFieldError extends FieldError {
	customError?: string; // Example of an extended error
}

interface ParsedValue {
	Value: string;
	Value2: string;
	Operation: string;
}

const Filter = ({
	filters,
	setFilters,
	resetFilters,
	schema,
	setPage,
	type,
}: FilterProps) => {
	const [phoneValue, setPhoneValue] = useState<string>("");
	const [areaCode, setAreaCode] = useState<string>("");
	// set phone value to item type as phone to it's value at init
	useEffect(() => {
		if (filters) {
			for (const item of filters) {
				if (item.type === "phone" && item.value && item.value2) {
					setPhoneValue(`+${item.value}${item.value2}`);
					setAreaCode(item.value);
				}
			}
		}
	}, [filters]);
	const { t } = useTranslation();
	const { setCloseDrawer } = useFilterStore();

	const handleType = (
		{
			type,
			inputName,
			label,
			placeholder,
			value,
			options,
			prefixIcon,
			postfixIcon,
			className,
			canAddNew,
		}: InputProps,
		register: UseFormRegister<FieldValues>,
		formState: UseFormStateReturn<FieldValues>,
		control: Control<FieldValues> | undefined,
		watch: UseFormWatch<FieldValues>,
	) => {
		switch (type) {
			case "select":
				return (
					<SelectField
						label={label}
						labelClassName=" border-neutral-500 "
						wrapperClassName="md:col-span-2"
						className={cn(
							"w-60 rounded-3xl border border-neutral-500 bg-white lg:w-60",
							className,
						)}
						borderRadius="24px"
						bgColor="white"
						placeholder={placeholder}
						options={options}
						error={
							formState.errors.inputName as
								| FieldError
								| ExtendedFieldError
								| undefined
						}
						registration={register(inputName)}
						value={watch(inputName) || value}
						canAddNew={canAddNew}
						// defaultValue={value}
					/>
				);
			case "text":
				return (
					<Input
						type="text"
						name={inputName}
						label={label}
						placeholder={placeholder}
						// value={watch(inputName)}
						defaultValue={value || ""}
						error={
							formState.errors.inputName as
								| FieldError
								| ExtendedFieldError
								| undefined
						}
						registration={register(inputName)}
						className=" w-32 rounded-3xl border border-neutral-500 bg-white lg:w-36"
						maxLength={70}
					/>
				);
			case "number":
				return (
					<InputNumber
						label={label}
						className=" w-60 rounded-3xl border border-neutral-500 bg-white lg:w-60"
						placeholder={placeholder}
						error={
							formState.errors.inputName as
								| FieldError
								| ExtendedFieldError
								| undefined
						}
						registration={register(inputName)}
						min={1}
						maxLength={10}
					/>
				);
			case "email":
				return (
					<Input
						type="email"
						name={inputName}
						label={label}
						placeholder={placeholder}
						defaultValue={value || ""}
						error={
							formState.errors.inputName as
								| FieldError
								| ExtendedFieldError
								| undefined
						}
						registration={register(inputName)}
						className="border-neutral-500 bg-white"
						maxLength={70}
					/>
				);

			default:
				break;
		}
	};

	return (
		<div>
			<Form
				onSubmit={(values) => {
					const keysWithConditions = Object.entries(values)
						.filter(([_key, value]) => {
							if (typeof value === "string") {
								return (
									value.includes("from") &&
									value.includes("to") &&
									value.includes("Operation")
								);
							}
						})
						.map(([key]) => key);

					const updatedValues = {
						...values,
						...keysWithConditions.reduce(
							(acc: { [key: string]: ParsedValue }, key) => {
								const value = values[key];
								if (value) {
									try {
										const parsedValue = JSON.parse(value);
										acc[key] = {
											Value: parsedValue.from,
											Value2: parsedValue.to,
											Operation: parsedValue.Operation,
										};
									} catch {
										// Error intentionally ignored
									}
								}

								return acc;
							},
							{},
						),
					};
					setFilters(updatedValues);

					setPage(1);
					if (type === "drawer") {
						setCloseDrawer(false);
					}
				}}
				schema={schema}
				className="w-full"
			>
				{({ register, formState, reset, control, watch }) => {
					return (
						<div className="mb-10 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
							<div className="flex w-full flex-wrap gap-5 pb-2">
								{filters &&
									filters.length > 0 &&
									filters.map((item) => {
										return (
											<div key={`filter-${item.inputName}`}>
												{handleType(item, register, formState, control, watch)}
											</div>
										);
									})}
							</div>

							<div className="flex w-full items-center justify-between gap-4 md:w-fit md:justify-end">
								<Button
									type="submit"
									className="H7 h-14 w-full rounded-full md:w-44"
								>
									{t("SEARCH")}
								</Button>
								{/* <Button
									variant="ghost"
									onClick={() => {
										reset();
										resetFilters();
										setPage(1);
										setPhoneValue("");
										setCloseDrawer(false);
									}}
									className="H8 m-0 h-14 w-fit text-error md:p-0"
									icon={<X />}
								>
									{t("CLEAR_FILTERS")}
								</Button> */}
							</div>
						</div>
					);
				}}
			</Form>
		</div>
	);
};

export default Filter;
