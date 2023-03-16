import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme, Stack, Button, TextField, Divider } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

import { useAuth } from "../../contexts/auth";
import Logo from "../../components/Logo";
import { useNotification } from "../../contexts/notification";

const Verification = () => {
	const theme = useTheme();
	const auth = useAuth();
	const navigate = useNavigate();
	const { state } = useLocation();
	const notification = useNotification();
	const { innerWidth: width, innerHeight: height } = window;
	const [error, setError] = React.useState<boolean | undefined>(false);
	const [code, setCode] = React.useState<string>("");

	useEffect(() => {
		if (!state.email) {
			navigate("/auth/login");
		}
	}, [state]);

	const confirm = async () => {
		setError(false);
		if (code.length === 0) {
			console.error("Confirm code is empty");
		}
		auth.confirmSignUp &&
			auth
				.confirmSignUp(state.email, code)
				.then(() => {
					navigate("/dashboard");
				})
				.catch(err => {
					if (/CONFIRMED/.test(err.message)) {
						navigate("../login");
					} else {
						notification?.pop({ status: "error", message: err.message });
						setError(true);
					}
				});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				color: theme.palette.text.primary,
				height: height,
			}}
		>
			<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Logo
					href="/"
					style={{
						margin: theme.spacing(16),
						marginBottom: theme.spacing(32),
					}}
				/>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ width: "400px" }}>
					<center
						style={{
							color: theme.palette.text.secondary,
							lineHeight: 1.5,
						}}
					>
						All done! We have sent the verification code to{" "}
						<span style={{ fontWeight: "700", color: theme.palette.text.primary }}>{state.email}</span>
					</center>
					<TextField
						required
						type="string"
						variant="outlined"
						fullWidth
						value={code}
						inputProps={{ min: 0, style: { textAlign: "center" } }}
						onChange={e => {
							setCode(e.target.value);
						}}
					/>
					<Button variant="contained" size="large" fullWidth onClick={confirm}>
						Confirm
					</Button>
				</Stack>
				<Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: theme.spacing(16) }}>
					<span style={{ color: theme.palette.text.secondary }}>Didn't receive the verification code? </span>
					<Button
						size="large"
						sx={{ color: theme.palette.primary.dark, fontWeight: "600", textTransform: "none" }}
						onClick={() => {
							auth.resendConfirmationCode &&
								auth.resendConfirmationCode(state.email).then(() => {
									notification?.pop({ status: "success", message: "Code resent!" });
								});
						}}
					>
						Resend
					</Button>
				</Stack>
			</div>
		</div>
	);
};

export default Verification;
