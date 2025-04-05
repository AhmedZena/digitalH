export type ErrorProps = {
	errorMessage?: string | null;
};

export const FieldErrorWrapper = ({ errorMessage }: ErrorProps) => {
	if (!errorMessage) return null;

	return (
		<div role="alert" aria-label={errorMessage} className="  text-red-500 mt-1">
			{errorMessage}
		</div>
	);
};
