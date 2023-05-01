import * as React from "react";
import { Grid, Stack, TextField, Box } from "@mui/material";
import { StripeTextFieldNumber, StripeTextFieldExpiry, StripeTextFieldCVC } from "./commonTextFields";

export default function CreditCardDetail() {
	const [fullname, setFullname] = React.useState<string>("");

	const [state, setState] = React.useState({
		cardNumberComplete: false,
		expiredComplete: false,
		cvcComplete: false,
		cardNumberError: undefined,
		expiredError: undefined,
		cvcError: undefined,
	});

	interface ElementChangeParams {
		complete: boolean;
		error: { message: string | null };
	}
	const onElementChange =
		(field: any, errorField: any) =>
		({ complete, error = { message: null } }: ElementChangeParams) => {
			setState({ ...state, [field]: complete, [errorField]: error.message });
		};

	const { cardNumberError, expiredError, cvcError } = state;

	return (
		<Stack direction={"column"} spacing={3} sx={{ width: "100%" }}>
			<TextField
				required
				id="fname"
				label="Full name"
				type="text"
				variant="filled"
				fullWidth
				value={fullname}
				onChange={e => {
					setFullname(e.target.value);
				}}
				InputProps={{
					disableUnderline: true,
				}}
				sx={{
					borderRadius: 1,
				}}
			/>
			<StripeTextFieldNumber
				fullWidth
				error={Boolean(cardNumberError)}
				labelErrorMessage={cardNumberError}
				onChange={onElementChange("cardNumberComplete", "cardNumberError") as any}
			/>

			<Stack direction="row" spacing={2}>
				<StripeTextFieldExpiry
					error={Boolean(expiredError)}
					labelErrorMessage={expiredError}
					onChange={onElementChange("expiredComplete", "expiredError") as any}
				/>

				<StripeTextFieldCVC
					error={Boolean(cvcError)}
					labelErrorMessage={cvcError}
					onChange={onElementChange("cvcComplete", "cvcError") as any}
				/>
			</Stack>
		</Stack>
	);
}
