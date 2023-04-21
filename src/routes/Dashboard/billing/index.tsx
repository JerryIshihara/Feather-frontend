import React from "react";
import { useTheme, TextField, Container, FormControlLabel, Checkbox, Typography, Divider, RadioGroup, Radio, FormControl, FormLabel, Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PricingTable from "./pricingTable";
import Payment from "./payment";

const Billing = () => {
const theme = useTheme();

return (
    <div style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(4) }}>
        <Container maxWidth="lg">

			{/* -----------------------------------------My Membership----------------------------------------- */}
			<Typography variant="h4" gutterBottom>
				My Pricing Plan
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
				<div>
					<br/>
				</div>
				<div>
					<PricingTable/>
				</div>
				<div>
					<br/>
				</div>
			</Typography>

			{/* -----------------------------------------Payment Method----------------------------------------- */}
			<Divider style={{ margin: theme.spacing(2, 0) }} />
			<Typography variant="h4" gutterBottom>
				My Payment Methods
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
				<div>
					<br/>
				</div>
				<div>
					<Payment/>
				</div>
			</Typography>
        </Container>
    </div>
  );
};

export default Billing;