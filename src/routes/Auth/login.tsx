import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTheme, Stack, Button, TextField, Divider, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

import { useAuth } from "../../contexts/auth";
import Logo from "../../components/Logo";
import GoogleButton from "./google-button";

const Login = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery((theme as any).breakpoints.down("md"));
	const auth = useAuth();
	const navigate = useNavigate();
	const { innerWidth: width, innerHeight: height } = window;
	const [error, setError] = React.useState<boolean | undefined>(false);
	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");

	const login = async (email: string, password: string) => {
		setError(false);
		if (email.length * password.length === 0) {
			throw new Error("Email or password or confirm password is empty");
		}
		auth.login &&
			auth
				.login(email, password)
				.then(() => {})
				.catch(err => {
					if (err.name === "UserNotConfirmedException") {
						navigate("../verification", { state: { email } });
					} else {
						console.error(err);
						setError(true);
					}
				});
		// navigate("../dashboard");
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
			{!isMobile && (
				<div style={{ flex: 1, backgroundColor: lightBlue[900], padding: theme.spacing(4) }}>
					<h1 style={{ fontSize: "70px" }}>Start to know your badminton skills</h1>
					<img alt="court" src={require("../../assets/court.png")} style={{ width: "100%" }} />
				</div>
			)}
			<div style={{ flex: 1.2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<Logo
					href="/"
					style={{
						marginBottom: theme.spacing(4),
					}}
				/>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ width: isMobile ? "80%" : "40%" }}>
					<h2>Welcome back!</h2>
					<TextField
						required
						id="email"
						label="Email"
						type="email"
						variant="outlined"
						fullWidth
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						required
						id="password"
						label="Password"
						type="password"
						error={error}
						variant="outlined"
						fullWidth
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<div style={{ width: "100%" }}>
						<Link to="/auth/signup" style={{ textDecoration: "none", color: theme.palette.primary.dark, fontWeight: "600" }}>
							Forgot password?
						</Link>
					</div>

					<Button
						variant="contained"
						size="large"
						fullWidth
						onClick={() => {
							login(email, password);
						}}
					>
						Log in
					</Button>
					<Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
						<div style={{ backgroundColor: theme.palette.text.primary, flex: 1, height: "1px" }} />
						<span>or</span>
						<div style={{ backgroundColor: theme.palette.text.primary, flex: 1, height: "1px" }} />
					</Stack>
					<GoogleButton
						onClick={() => {
							auth.loginWithGoogle && auth.loginWithGoogle();
						}}
					/>
				</Stack>
				<p style={{ color: theme.palette.text.secondary, marginTop: theme.spacing(16) }}>
					Don't have an account?{" "}
					<Link to="/auth/signup" style={{ textDecoration: "none", color: theme.palette.primary.dark, fontWeight: "600" }}>
						Sign up for free
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
