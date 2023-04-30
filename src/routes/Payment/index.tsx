// export default Payment;
import React from "react";
import { useTheme, Container, Grid, Typography, Button, Stack, Avatar, Box, Paper, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { Logo } from "../../components";
import { grey } from "@mui/material/colors";
import { CheckCircleOutline } from "@mui/icons-material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardDetail from "./CreditCardDetail";
import { useAuth } from "../../contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../../contexts/notification";
import { useLoading } from "../../contexts/loading";

export const plans = [
	{
		title: "Basic",
		price: 0,
		features: ["Video upload for replay", "Limited sports performance analysis", "Limited AI editing usage"],
		popular: false,
	},
	{
		title: "Pro",
		price: 19.99,
		features: ["Video upload for replay", "Sports performance analysis", "Unlimited AI editing usage"],
		popular: true,
	},
	{
		title: "Premium",
		price: 29.99,
		features: ["Video upload for replay", "Sports advanced analysis", "Unlimited AI editing usage", "Team colloration"],
		popular: false,
	},
];

const stripePromise = loadStripe("pk_test_ju6veMmqd5eDMe1XhQVPyze2");

const PaymentContainer = styled(Container)(({ theme }) => ({
	padding: theme.spacing(8, 0),
	backgroundColor: theme.palette.background.paper,
}));

const Payment = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const auth = useAuth() as any;
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const plan = plans.filter(p => p.title.toLowerCase() === params.get("plan"))[0];
	const notification = useNotification();
	const loading = useLoading();
	React.useEffect(() => {
		if (!auth.user?.attributes) {
			console.log("No user");
			navigate("/auth/login");
		}
	}, [auth.user]);

	const handleSubmit = async () => {
		loading.show("Verifying transaction...");
		auth.subscribe(plan.title).then((res: any) => {
			console.log(res);
			loading.hide();
			notification.pop({ status: "success", message: "Transaction verified!" });
			setTimeout(() => {
				navigate("/dashboard");
			}, 1000);
		});
	};

	return (
		<Elements stripe={stripePromise}>
			<PaymentContainer maxWidth="lg" sx={{ bgcolor: theme.palette.background.paper, p: 4, py: 12 }}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 8 }}>
					<Box component="div" sx={{ flex: 1, borderRadius: 2, overflow: "hidden", minHeight: "80vh" }}>
						<Paper
							sx={{
								minHeight: "30%",
								background: "linear-gradient(41deg, rgba(39,0,83,1) 41%, rgba(82,0,80,1) 98%)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								p: 4,
								py: 8,
								borderRadius: 0,
							}}
						>
							<Stack direction="column" alignItems="center" spacing={4}>
								<Logo style={{ width: 200, objectFit: "contain" }} href={"/"} />
								<Typography variant="h5" align="center">
									Subscribe and analyze your badminton performance!
								</Typography>
							</Stack>
						</Paper>
						<Paper
							sx={{
								borderRadius: "0 0 5px 5px",
								bgcolor: grey[100],
								p: 4,
								color: grey[900],
								flex: 1,
							}}
						>
							<Stack direction="column" spacing={6} sx={{ pb: 4 }}>
								<Paper
									elevation={24}
									sx={{
										borderRadius: 2,
										bgcolor: grey[100],
										p: 2,
										color: grey[900],
									}}
								>
									<Stack direction="column" spacing={1}>
										<Typography variant="h6">{plan.title} Plan</Typography>
										<Typography variant="h4" sx={{ fontWeight: "bold" }}>
											{`${plan.price} / month`}
										</Typography>
									</Stack>
								</Paper>
								<Stack direction="column" spacing={4}>
									{plan.features.map((feature: string, index: number) => (
										<Stack direction="row" alignItems="center" spacing={2} key={index}>
											<CheckCircleOutline sx={{ fontSize: 20 }} />
											<Typography variant="body1">{feature}</Typography>
										</Stack>
									))}
								</Stack>
							</Stack>
						</Paper>
					</Box>
					<Stack direction="column" spacing={8} sx={{ flex: 1.3 }}>
						<Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
							Payment Details
						</Typography>
						<CreditCardDetail />
						<Stack direction="column" spacing={4}>
							{auth.user && (
								<Stack direction="row" alignItems="center" spacing={2}>
									<Avatar src={auth.user.attributes.picture} />
									<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
										{auth.user.attributes.given_name} {auth.user.attributes.family_name}
									</Typography>
								</Stack>
							)}
							<Stack direction="row" justifyContent="space-between" spacing={2}>
								<Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
									Subtotal:
								</Typography>

								<Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: "bold" }}>
									$ {plan.price}
								</Typography>
							</Stack>
							<Stack direction="row" justifyContent="space-between" spacing={2}>
								<Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
									Tax:
								</Typography>

								<Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: "bold" }}>
									{plan.price} x 7.25% = $ {(plan.price * 0.0725).toFixed(2)}
								</Typography>
							</Stack>
							<Divider />
							<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
								<Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
									Total amount:
								</Typography>

								<Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
									$ {(plan.price * 1.0725).toFixed(2)}
								</Typography>
							</Stack>
						</Stack>
						<Button
							variant="contained"
							size="large"
							fullWidth
							onClick={handleSubmit}
							sx={{
								p: 1,
								color: theme.palette.text.primary,
							}}
						>
							Make Payment
						</Button>
					</Stack>
				</Stack>
			</PaymentContainer>
		</Elements>
	);
};

export default Payment;
