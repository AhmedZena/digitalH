"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { confirmModalProps } from "@/types/confirm-modal-types";
import i18n from "@/lib/i18n";

export const ConfirmModal = ({
	open,
	close,
	isOpen,
	confirmButtonAction,
	isLoading = false,
	title,
	titleIcon,
	titleColor = "#fcbe2b",
	description,
	descriptionComponent,
	confirmButtonText = "YES_SURE",
	confirmButtonBgColor = "#fcbe2b",
	confirmButtonTextColor = "#000",
	confrimButtonClassName,
	confirmButtonDisabled = false,
	confirmButtonIcon,
	cancelButtonText = "CANCEL",
	cancelButtonBgColor = "#f2f2f2",
	cancelButtonTextColor = "#000",
	cancelButtonClassName,
	cancelButtonIcon,
	closeAfterDone = false,
	onCancel,
	allowCloseOnOutsideClick = true,
	showTitle = true,
	dialogClassName,
	showFooter = true,
}: confirmModalProps) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (closeAfterDone && isLoading) {
			close?.();
			// }, 500);
		}
	});

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen && allowCloseOnOutsideClick && !isLoading) {
			handleCancel(); // Close the modal if outside click is allowed
		} else if (isOpen) {
			open?.();
		}
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		close?.();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent
				className={cn(
					"md:!max-w-3xl lg:!max-w-[1000px] md:!px-6 w-11/12 rounded-2xl px-5 font-arabic md:w-full",
					allowCloseOnOutsideClick ? "" : "[&>button]:hidden",
					dialogClassName,
				)}
			>
				{showTitle && (
					<DialogHeader className="flex">
						<DialogTitle
							className="flex w-full flex-col items-center justify-center text-center border-b border-[#E8E8E8] pb-4 "
							dir={i18n.dir()}
						>
							<span
								className="H5  flex items-center gap-2 "
								style={{ color: titleColor }}
								dir={i18n.dir()}
							>
								{/* {t(`${title}`)} */}
								{title && t(`${title}`)}
								{titleIcon}
							</span>
						</DialogTitle>
					</DialogHeader>
				)}

				<>
					<DialogDescription />
					{description && (
						<DialogDescription
							dir={i18n.dir()}
							className="Caption_400 text-center"
						>
							{t(`${description}`)}
						</DialogDescription>
					)}
					{descriptionComponent && (
						<div dir={i18n.dir()} className="Caption_400 text-center">
							{descriptionComponent}
						</div>
					)}

					{showFooter && (
						<DialogFooter className="mt-5" dir={i18n.dir()}>
							<div className="flex items-center justify-center w-full gap-12">
								<Button
									variant="destructive"
									isLoading={isLoading}
									type="submit"
									className={cn(
										"Line_400 w-full rounded-xl py-6",
										confrimButtonClassName,
									)}
									style={{
										backgroundColor: confirmButtonBgColor,
										color: confirmButtonTextColor,
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = `${confirmButtonBgColor}CC`;
									}} // 'CC' adds opacity (~80%)
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor =
											confirmButtonBgColor;
									}}
									onClick={() => {
										confirmButtonAction?.();
									}}
									disabled={isLoading || confirmButtonDisabled}
									data-test-id="Button-fcm7p"
									icon={confirmButtonIcon}
								>
									{t(`${confirmButtonText}`)}
								</Button>

								<Button
									className={cn(
										"Line_400 w-full rounded-xl py-6 border border-neatral-500",
										cancelButtonClassName,
									)}
									style={{
										color: cancelButtonTextColor,
										backgroundColor: cancelButtonBgColor,
									}}
									onClick={handleCancel}
									disabled={isLoading}
									data-test-id="Button-vk0jb"
									icon={cancelButtonIcon}
								>
									{t(`${cancelButtonText}`)}
								</Button>
							</div>
						</DialogFooter>
					)}
				</>
			</DialogContent>
		</Dialog>
	);
};
