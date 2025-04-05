import { CheckCircle, CircleAlert, Info, XCircle } from "lucide-react"; // Import custom icons
import { toast } from "react-toastify";
import i18next from "i18next";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

export const showToast = (type: ToastType, customMessage: string) => {
	const fontFamily =
		i18next?.language === "ar" ? "font-arabic" : "font-english";
	let container = null;
	let bgColor = null;
	let borderColor = null;

	switch (type) {
		case "success":
			container = (
				<div
					className={cn(
						"flex items-center justify-center gap-4  text-green-600",
						fontFamily,
					)}
				>
					<div>
						<CheckCircle />
					</div>
					<span>{customMessage}</span>
				</div>
			);
			bgColor = "#E3FFF3";
			borderColor = "#3F8D6B";
			break;
		case "error":
			container = (
				<div
					className={cn(
						"flex items-center justify-center gap-4  text-error",
						fontFamily,
					)}
				>
					<div>
						<XCircle />
					</div>
					<span>{customMessage}</span>
				</div>
			);
			bgColor = "#FBE9E9";
			borderColor = "#E25050";
			break;
		case "warning":
			container = (
				<div
					className={cn(
						"flex items-center justify-center gap-4  text-orange-400",
						fontFamily,
					)}
				>
					<div>
						<CircleAlert />
					</div>
					<span>{customMessage}</span>
				</div>
			);
			bgColor = "#FEF5E6";
			borderColor = "#F7A933";
			break;
		case "info":
			container = (
				<div
					className={cn(
						"flex items-center justify-center gap-4  text-primary",
						fontFamily,
					)}
				>
					<div>
						<Info />
					</div>
					<span>{customMessage}</span>
				</div>
			);
			bgColor = "#f0f8ff";
			borderColor = "#0f598a";
			break;
		default:
			container = (
				<div className="flex items-center justify-center gap-4">
					<div>
						<Info />
					</div>
					<span>{customMessage}</span>
				</div>
			);
			bgColor = "#f0f8ff";
			borderColor = "#0f598a";
	}

	toast(container, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		style: {
			backgroundColor: bgColor,
			borderInlineStart: "10px solid",
			borderInlineColor: borderColor,
		},
	});
};
