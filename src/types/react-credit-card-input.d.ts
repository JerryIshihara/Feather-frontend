declare module "react-credit-card-input" {
	import * as React from "react";

	export interface CreditCardInputProps {
		cardNumberInputProps?: React.HTMLProps<HTMLInputElement>;
		cardExpiryInputProps?: React.HTMLProps<HTMLInputElement>;
		cardCVCInputProps?: React.HTMLProps<HTMLInputElement>;
		containerStyle?: React.CSSProperties;
		inputStyle?: React.CSSProperties;
		fieldClassName?: string;
		inputClassName?: string;
		customTextLabels?: object;
		containerClassName?: string;
		dangerTextClassName?: string;
		focusClassName?: string;
		isValidClassName?: string;
		inputComponent?: React.ReactType;
		errorTextClassName?: string;
		inputMode?: "numeric" | "decimal" | "none" | "tel" | "search" | "email" | "url" | "text";
		onError?: (error: any) => void;
		onKeyUp?: (key: string) => void;
	}

	const CreditCardInput: React.FunctionComponent<CreditCardInputProps>;
	export default CreditCardInput;
}
