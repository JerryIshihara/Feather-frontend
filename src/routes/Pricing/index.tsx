// export default Pricing;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, Container, Grid, Typography, Button, Stack, Divider, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { pink } from "@mui/material/colors";
import { CheckCircleOutline } from "@mui/icons-material";
import { plans } from "../Payment";

const PricingContainer = styled(Container)(({ theme }) => ({
	padding: theme.spacing(8, 0),
	backgroundColor: theme.palette.background.paper,
}));

const Pricing = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const navigateTo = (plan: string) => {
		navigate("/payment?plan=" + plan);
	};
	return (
		<PricingContainer maxWidth="lg">
			<Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 10 }}>
				<Typography variant="h1" align="center" sx={{ fontWeight: "bold" }}>
					Pricing Plans
				</Typography>
				<Typography variant="subtitle1" align="center" sx={{ color: theme.palette.text.secondary, maxWidth: "700px" }}>
					Discover the perfect pricing plan tailored to your needs, offering value for money and exceptional quality for individuals, small
					businesses, or large enterprises.
				</Typography>
			</Stack>
			<Grid container spacing={4}>
				{plans.map(plan => (
					<Grid item xs={12} md={4}>
						<PricingCard
							title={plan.title}
							price={plan.price ? `$${plan.price}` : "Free"}
							features={plan.features}
							popular={plan.popular}
							onUpgrade={navigateTo}
						/>
					</Grid>
				))}

				{/* <Grid item xs={12} md={4}>
					<PricingCard
						title="Pro"
						price="$19.99"
						features={["Video upload for replay", "Sports performance analysis", "Unlimited AI editing usage"]}
						popular
						onUpgrade={navigateTo}
					/>
				</Grid>
				<Grid item xs={12} md={4}>
					<PricingCard
						title="Premium"
						price="$29.99"
						features={["Video upload for replay", "Sports advanced analysis", "Unlimited AI editing usage", "Team colloration"]}
						onUpgrade={navigateTo}
					/>
				</Grid> */}
			</Grid>
		</PricingContainer>
	);
};

interface PricingCardProps {
	title: string;
	price: string;
	features: string[];
	popular?: boolean;
	onUpgrade: (plan: string) => void;
}

const PricingCard = ({ title, price, features, popular, onUpgrade }: PricingCardProps) => {
	const theme = useTheme();
	const [elevation, setElevation] = React.useState(4);
	return (
		<Box component={"div"}>
			<Paper key={elevation} elevation={elevation} sx={{ px: 5, py: 7 }}>
				<Stack direction="column" spacing={2}>
					<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }} spacing={2}>
						<Typography
							variant="h6"
							component="div"
							sx={{
								fontWeight: "bold",
							}}
						>
							{title}
						</Typography>
						{popular && (
							<div
								style={{
									backgroundColor: pink[400],
									padding: "2px 10px",
								}}
							>
								<Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
									Popular
								</Typography>
							</div>
						)}
					</Stack>

					<Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
						<Typography variant="h3" component="div">
							{price}
						</Typography>
						<Typography variant="body2" component="div" sx={{ color: theme.palette.text.secondary }}>
							/ month
						</Typography>
					</Stack>
					<Divider sx={{ py: 2 }} />

					<Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
						Features
					</Typography>
					<Stack direction="column" spacing={1}>
						{features.map((feature, index) => (
							<Stack direction="row" spacing={1} key={index}>
								<CheckCircleOutline sx={{ color: theme.palette.text.primary, fontSize: 18 }} />
								<Typography variant="body2" sx={{ fontWeight: "500" }}>
									{feature}
								</Typography>
							</Stack>
						))}
					</Stack>
				</Stack>
				{title.toLowerCase() !== "basic" && (
					<Button
						variant="contained"
						size="large"
						color="primary"
						fullWidth
						sx={{ mt: 5, borderRadius: 0 }}
						onClick={() => {
							onUpgrade(title.toLowerCase());
						}}
					>
						Upgrade
					</Button>
				)}
			</Paper>
		</Box>
	);
};

export default Pricing;
