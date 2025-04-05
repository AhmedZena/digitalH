import { FieldWrapper } from "./field-wrapper";
import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/lib/utils";
import { CircleX, FileText, Lock, Trash } from "lucide-react";
import { type JSX, useState } from "react";
import {
	Controller,
	type FieldError,
	type FieldErrors,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ZodSchema } from "zod";
import { Button } from "../../ui/button";
import { ConfirmModal } from "../modal/confirm-modal";
import { type InputProps, Input } from "../input";
import { Form } from "./form";
import Link from "next/link";
import { SelectField, type SelectFieldProps } from "../select";
import { InputNumber } from "../input/input-number";
import { Textarea } from "../input/textarea";
import { Options } from "react-select";
import type { Option } from "@/types/misc";

export type Field = InputProps & {
	inputPhoneName?: string;
	inputAreaCodeName?: string;
	prefixIcon?: React.ElementType | JSX.Element | React.ComponentType<unknown>;
	defaultVal?: boolean;
	defaultValue?: string | string[];
	defaultPhoneValue?: string;
	defaultCountryCode?: string;
	minDate?: Date;
	horizontalShape?: boolean;
	enableEdit?: boolean;
	forgetPass?: boolean;
	canAddNew?: boolean;
	colSpan?: number;
	options?: Option[];
};

type FormCreatorProps = {
	fields: Field[];
	formId: string;
	// onSubmit?: (values: Record<string, unknown>) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSubmit?: (values: any) => void;
	onCancel?: () => void;
	isSubmitting?: boolean;
	submissionType?: "submit" | "modal";
	schema: ZodSchema<Record<string, unknown>>;
	confirmButtonText?: string;
	confirmButtonIcon?: React.ReactNode;
	cancelButtonText?: string;
	resetPasswordBtn?: boolean;

	disableSubmit?: boolean;
	buttonsClassName?: string;
	confirmButtonClassName?: string;
	containerClassName?: string;
	deleteButton?: boolean;
	deleteButtonText?: string;
	deleteButtonIcon?: React.ReactNode;
	secodaryComponent?: JSX.Element;
};

export const FormCreator = <T extends {}>({
	fields,
	formId,
	onSubmit,
	onCancel,
	isSubmitting,
	confirmButtonText = "SUBMIT",
	confirmButtonIcon,
	cancelButtonText = "CANCEL",
	submissionType = "submit",
	schema,
	disableSubmit = false,
	buttonsClassName,
	confirmButtonClassName,
	containerClassName,
	deleteButton,
	deleteButtonText = "DELETE",
	deleteButtonIcon = <Trash />,
	secodaryComponent,
}: FormCreatorProps) => {
	const { t } = useTranslation();
	const { close, open, isOpen } = useDisclosure();
	// Single confirm modal state
	const [modalConfig, setModalConfig] = useState<{
		title: string;
		confirmAction: () => void;
		type: string;
	} | null>(null);

	const handleModalOpen = (config: {
		title: string;
		confirmAction: () => void;
		type: string;
	}) => {
		setModalConfig(config);
		open();
	};

	const [validationErrors, setValidationErrors] = useState<
		Record<
			string,
			{ message: string; ref: { name: string | number }; type: string }
		>
	>({});
	const handleSubmitModalOpen = (formData: Record<string, unknown>) => {
		const validationResult = schema.safeParse(formData);
		if (validationResult.success) {
			setValidationErrors({});
			// open(); // Open modal if validation passes
			handleModalOpen({
				title: t("ARE_YOU_SURE_TO_CHANGE_DATA"),
				confirmAction: () => onSubmit?.(formData),
				type: "submit",
			});
		} else {
			// Collect and set validation errors
			const errors: Record<
				string,
				{ message: string; ref: { name: string | number }; type: string }
			> = {};

			for (const err of validationResult.error.errors) {
				errors[err.path[0]] = {
					message: err.message,
					ref: {
						name: err.path[0],
					},
					type: err.code,
				};
			}
			setValidationErrors(errors);
		}
	};

	return (
		<>
			<Form
				id={formId}
				onSubmit={onSubmit ?? (() => {})}
				schema={schema}
				className={`grid grid-cols-1 gap-x-[101px] gap-y-[36px] space-y-0 bg-white py-10 md:grid-cols-2 ${containerClassName}`}
			>
				{({ register, formState, watch, getValues, control }) => (
					<>
						{fields.map((field) => {
							const error =
								(validationErrors[field.name as string] as
									| FieldError
									| undefined) ||
								(formState.errors[field.name as keyof FieldErrors<T>] as
									| FieldError
									| undefined);
							const colSpanClass = `md:col-span-${field.colSpan ?? 1}`;
							const isHidden = field.hidden;
							if (isHidden) {
								return null;
							}
							switch (field.type) {
								case "select":
									return (
										<div key={field.name} className={colSpanClass}>
											<SelectField
												label={field.label}
												options={field.options}
												placeholder={field.placeholder}
												error={error}
												value={
													Array.isArray(watch(field.name as Path<T>))
														? watch(field.name as Path<T>).join(", ")
														: (watch(field.name as Path<T>) as
																| string
																| undefined) || field.value
												}
												// value={
												// 	(watch(field.name as Path<T>) as
												// 		| string
												// 		| undefined) || field.value
												// }
												registration={{
													...register(field.name as Path<T>),
													// biome-ignore lint/suspicious/noExplicitAny: <explanation>
													onChange: async (e: any) => {
														await register(field.name as Path<T>).onChange(e);
														if (field.onChange) {
															field.onChange(e);
														}
													},
												}}
												prefixIcon={field.prefixIcon as React.ElementType}
												optional={field.optional}
												disabled={field.disabled}
												className={field.className}
												canAddNew={field.canAddNew}
											/>
										</div>
									);
								case "text":
								case "email":
									return (
										<div key={field.name} className={colSpanClass}>
											<Input
												type={field.type}
												label={field.label}
												error={error}
												defaultValue={field.value || ""}
												registration={register(field.name as Path<T>)}
												placeholder={field.placeholder}
												optional={field.optional}
												className={cn(
													field.disabled ? "border-[#0F598A] bg-[#E8E8E8]" : "",
													field.className,
												)}
												disabled={field.disabled}
												{...(field as InputProps)}
												ref={register(field.name as Path<T>)?.ref}
											/>
										</div>
									);

								case "number":
									return (
										<div key={field.name} className={colSpanClass}>
											<InputNumber
												type="number"
												label={field.label}
												error={error}
												registration={register(field.name as Path<T>)}
												min={field.min}
												max={field.max}
												maxLength={field.maxLength}
												placeholder={field.placeholder}
												optional={field.optional}
												defaultValue={field.value}
												value={field.value}
												className={cn(
													field.disabled ? "border-[#0F598A] bg-[#E8E8E8]" : "",
													field.className,
												)}
												disabled={field.disabled}
											/>
										</div>
									);

								case "textarea":
									return (
										<div key={field.name} className={colSpanClass}>
											<Textarea
												label={field.label}
												error={error}
												defaultValue={field.value || ""}
												registration={register(field.name as Path<T>)}
												placeholder={field.placeholder}
												className={field.className}
												// rows={13}
												disabled={field.disabled}
											/>
										</div>
									);

								// if type is title then return a div with the title
								case "title":
									return (
										<div key={field.label} className={colSpanClass}>
											<h3 className=" text-secondary-600">
												{t(`${field.label}`)}
											</h3>
										</div>
									);

								default:
									return null;
							}
						})}

						{secodaryComponent && secodaryComponent}

						{/* Submit and Cancel Buttons */}
						<div
							className={`col-span-1 flex flex-wrap items-center justify-center gap-4 md:col-span-2 md:justify-end ${buttonsClassName}`}
						>
							<Button
								form={formId}
								type={submissionType === "submit" ? "submit" : "button"}
								// type="button"
								icon={confirmButtonIcon || undefined}
								isLoading={isSubmitting}
								onClick={
									submissionType === "modal"
										? () => {
												const formData = getValues();
												handleSubmitModalOpen(formData);
											}
										: undefined
								}
								// disabled={disableSubmit}
								disabled={disableSubmit || isSubmitting}
								className={`H5 h-[66px] w-[305px] ${confirmButtonClassName}`}
							>
								{t(`${confirmButtonText}`)}
							</Button>

							{onCancel && (
								<Button
									type="button"
									onClick={() => {
										onCancel();
									}}
									className="H5 h-[66px] w-[305px] rounded-xl border border-neutral-300 bg-neutral-50 px-[91px] py-6 text-dark hover:bg-neutral-100 md:w-fit"
									icon={<CircleX />}
								>
									{t(`${cancelButtonText}`)}
								</Button>
							)}

							{deleteButton && (
								<Button
									type="button"
									onClick={() => {
										handleModalOpen({
											title: t("ARE_YOU_SURE_TO_DELETE_THIS_CAR"),
											confirmAction: () => onSubmit?.(getValues()),
											type: "delete",
										});
									}}
									className="H5 h-[66px] w-[305px] rounded-xl border border-error bg-error px-[91px] py-6 text-white hover:bg-error/80 md:w-fit"
									icon={deleteButtonIcon}
								>
									{t(`${deleteButtonText}`)}
								</Button>
							)}

							{/* Single Confirm Modal */}
							{modalConfig && (
								<ConfirmModal
									isOpen={isOpen}
									open={open}
									close={close}
									isLoading={isSubmitting}
									confirmButtonAction={modalConfig.confirmAction}
									cancelButtonText="CANCEL"
									title={modalConfig.title}
									closeAfterDone={modalConfig.type === "submit"}
								/>
							)}
						</div>
					</>
				)}
			</Form>
		</>
	);
};
