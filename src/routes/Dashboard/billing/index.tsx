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
import { useMediaQuery } from "@mui/material";
import PricingTable from "./pricingTable";
import Payment from "./payment";

interface BillingSectionProps {
	title: string;
	onSave?: () => void;
	children: React.ReactNode;
}
const BillingSection = (props: BillingSectionProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Stack direction="column" spacing={4}>
			<Stack direction="row" sx={{ justifyContent: "space-between" }}>
				<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }}>
					{props.title}
				</Typography>
				<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
					{isMobile ? "" : "Save"}
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
