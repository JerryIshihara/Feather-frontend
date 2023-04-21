import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio } from "@mui/material";
import creditcard from "../../../assets/creditcard.png";
import paypal from "../../../assets/paypal.png";
import apple from "../../../assets/apple.png";

const Payment = () => {
	const [selectedOption, setSelectedOption] = React.useState("creditCard");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	const paymentOptions = [
		{
			id: "creditCard",
			label: "Credit Card",
			image: creditcard,
		},
		{
			id: "applePay",
			label: "Apple Pay",
			image: apple,
		},
		{
			id: "paypal",
			label: "Paypal",
			image: paypal,
		},
	];

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{paymentOptions.map(option => (
						<TableRow key={option.id}>
							<TableCell>
								<Radio checked={selectedOption === option.id} onChange={handleChange} value={option.id} name="payment-radio-button" />
								{option.label}
							</TableCell>
							<TableCell>
								<img src={option.image} alt={option.label} style={{ height: 40, objectFit: "contain" }} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Payment;
