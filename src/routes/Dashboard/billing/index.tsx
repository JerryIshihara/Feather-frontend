import React from "react";
import {
	useTheme,
	TextField,
	Container,
	FormControlLabel,
	Checkbox,
	Typography,
	Divider,
	RadioGroup,
	Radio,
	FormControl,
	FormLabel,
	Button,
	Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PricingTable from "./pricingTable";
import Payment from "./payment";

interface BillingSectionProps {
	title: string;
	onSave?: () => void;
	children: React.ReactNode;
}
const BillingSection = (props: BillingSectionProps) => {
	return (
		<Stack direction="column" spacing={4}>
			<Stack direction="row" sx={{ justifyContent: "space-between" }}>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					{props.title}
				</Typography>
				<Button variant="contained" startIcon={<SaveIcon />} component="span">
					Save
				</Button>
			</Stack>
			{props.children}
		</Stack>
	);
};

const Billing = () => {
	const theme = useTheme();

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Stack direction="column" spacing={16}>
				<BillingSection title="My Membership" onSave={() => {}}>
					<PricingTable />
				</BillingSection>
				<BillingSection title="Payment Method" onSave={() => {}}>
					<Payment />
				</BillingSection>
			</Stack>
		</Container>
	);
};

export default Billing;
