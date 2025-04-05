import type { JSX } from "react";

export type confirmModalProps = {
	isOpen?: boolean;
	open?: () => void;
	close?: () => void;
	isLoading?: boolean;
	confirmButtonAction?: () => void;
	title?: string;
	titleIcon?: JSX.Element;
	titleColor?: string;
	description?: string;
	descriptionComponent?: JSX.Element;
	dataTitle?: string;
	dataDescription?: string;
	confirmButtonText?: string;
	confirmButtonBgColor?: string;
	confirmButtonTextColor?: string;
	confirmButtonDisabled?: boolean;
	confirmButtonIcon?: JSX.Element;
	cancelButtonText?: string;
	cancelButtonBgColor?: string;
	cancelButtonTextColor?: string;
	cancelButtonIcon?: JSX.Element;
	closeAfterDone?: boolean;
	showTitle?: boolean;
	onCancel?: () => void;
	allowCloseOnOutsideClick?: boolean;
	confrimButtonClassName?: string;
	cancelButtonClassName?: string;
	dialogClassName?: string;
	showFooter?: boolean;
};
