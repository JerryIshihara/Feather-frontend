import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme, Stack, Button, TextField, useMediaQuery } from "@mui/material";
import { pink, grey, green } from "@mui/material/colors";
import { Circle, CheckCircle } from "@mui/icons-material";

import { useAuth } from "../../contexts/auth";
import { useNotification } from "../../contexts/notification";
import Logo from "../../components/Logo";
import GoogleButton from "./google-button";

const PasswordCheckBox = ({ checked, message }: { checked: boolean; message: string }) => {
	const theme = useTheme();
	const size = 16;
	return (
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="center"
			spacing={1}
			sx={{ color: checked ? green["A400"] : theme.palette.text.disabled, fontSize: 15 }}
		>
			{checked ? <CheckCircle sx={{ width: size, height: size }} /> : <Circle sx={{ width: size, height: size }} />}
			<span>{message}</span>
		</Stack>
	);
};

const Signup = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery((theme as any).breakpoints.down("md"));
	const auth = useAuth();
	const navigate = useNavigate();
	const notification = useNotification();
	const { innerWidth: width, innerHeight: height } = window;
	const [error, setError] = React.useState<boolean | undefined>(false);
	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [confirmPassword, setConfirmPassword] = React.useState<string>("");
	const [pwdValid, setPwdValid] = React.useState<{
		len: boolean;
		upper: boolean;
		number: boolean;
		special: boolean;
		match: boolean;
	}>({ len: false, upper: false, number: false, special: false, match: false });

	useEffect(() => {
		setPwdValid({
			len: password.length >= 8,
			upper: /[A-Z]/.test(password),
			number: /[0-9]/.test(password),
			special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
			match: password.length * password.length > 0 && password === confirmPassword,
		});
	}, [password, confirmPassword]);

	const signup = async (email: string, password: string) => {
		setError(false);
		try {
			if (email.length === 0) {
				throw new Error("Email is empty");
			}
			if (Object.values(pwdValid).some(v => !v)) {
				throw new Error("Password is invalid");
			}
			auth.signup &&
				auth
					.signup(email, password)
					.then((res: any) => {
						navigate("../verification", { state: { email } });
					})
					.catch((err: any) => {
						console.log(err);
						if (err.name === "UsernameExistsException") {
							notification?.pop({ status: "info", message: err.message });
							navigate("../login");
						}
					});
		} catch (err: any) {
			setError(true);
		}
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
				<div style={{ flex: 1, backgroundColor: pink[900], padding: theme.spacing(4) }}>
					<h1 style={{ fontSize: "70px" }}>Start to know your badminton skills</h1>
					<img alt="court" src={require("../../assets/smash.png")} style={{ width: "70%" }} />
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
					<h2>Let's start!</h2>
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
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<TextField
						required
						id="confirmPassword"
						label="Confirm password"
						type="password"
						error={error}
						variant="outlined"
						fullWidth
						value={confirmPassword}
						onChange={e => {
							setConfirmPassword(e.target.value);
						}}
					/>
					<Stack direction="column" spacing={1} sx={{ width: "100%" }}>
						<PasswordCheckBox checked={pwdValid.len} message={"at least 8 characters"} />
						<PasswordCheckBox checked={pwdValid.upper} message={"one uppercase"} />
						<PasswordCheckBox checked={pwdValid.number} message={"one number"} />
						<PasswordCheckBox checked={pwdValid.special} message={"one special character"} />
						<PasswordCheckBox checked={pwdValid.match} message={"match with confirm password"} />
					</Stack>
					<Button
						variant="contained"
						size="large"
						fullWidth
						onClick={() => {
							signup(email, password)
								.then(res => {
									// navigate("../verification", { state: { email } });
								})
								.catch(err => {
									console.error(err);
								});
						}}
					>
						Sign up
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
					Already have an account?{" "}
					<Link to="/auth/login" style={{ textDecoration: "none", color: theme.palette.primary.dark, fontWeight: "600" }}>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
