import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Spinner } from "../spinner";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none",
	{
		variants: {
			variant: {
				default:
					"bg-secondary text-white shadow hover:bg-secondary/90 rounded-xl",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-2xl",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-2xl",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded-2xl",
				ghost: "hover:bg-transparent hover:text-secondary rounded-2xl",
				link: "text-primary underline-offset-4 hover:underline rounded-2xl",
			},
			size: {
				default: "h-9 px-3 py-3",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		isLoading?: boolean;
		icon?: React.ReactNode;
	};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			children,
			isLoading,
			disabled,
			icon,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading || disabled}
				{...props}
			>
				{isLoading && <Spinner size="sm" className="text-current" />}
				{!isLoading && icon && <span>{icon}</span>}

				{children && <span className="mx-2">{children}</span>}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
