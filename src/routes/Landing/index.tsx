import React from "react";
import { useTheme, Container, Button } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Header, Footer } from "../../components";
import Court3D from "./court";
import Booking from "../Booking";
import Feed from "../Feed";
import Pricing from "../Pricing";

const LandingContent = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<div style={{ textAlign: "center", marginTop: "50px" }}>
					<span style={{ fontSize: "100px", fontWeight: "600" }}>Smash the badminton with AI-powered tool.</span>
				</div>
				<Court3D />
				<Container style={{ textAlign: "center", marginTop: "450px" }} maxWidth="md">
					<p style={{ fontSize: "25px" }}>
						Get your game highlight clips with just one-click. Analyze your motion data and skills with our advanced AI tools.
					</p>
					<center>
						<Button
							variant="contained"
							size="large"
							onClick={() => {
								navigate("/dashboard");
							}}
						>
							Get started
						</Button>
					</center>
				</Container>
				<center style={{ marginTop: "100px", opacity: 0.5 }}>
					<p style={{ fontSize: "20px", color: theme.palette.text.secondary, fontWeight: "700" }}>TRUSTED BY</p>
					<center style={{ gap: "10px" }}>
						{[...Array(5)].map((item, index) => (
							<span key={index} style={{ backgroundColor: theme.palette.action.selected, padding: "10px", margin: theme.spacing(2) }}>
								Partner {index + 1}
							</span>
						))}
					</center>
				</center>
			</Container>
			<div
				style={{
					backgroundColor: "black",
					marginTop: theme.spacing(16),
				}}
			>
				<Container maxWidth="lg" style={{ padding: theme.spacing(4) }}>
					<div style={{ textAlign: "center" }}>
						<p style={{ fontSize: "50px", fontWeight: "700" }}>Get your high-light clip with one-click.</p>
					</div>
				</Container>
			</div>
			<div>
				<Container maxWidth="lg" style={{ padding: theme.spacing(4) }}>
					<div style={{ textAlign: "center" }}>
						<p style={{ fontSize: "50px", fontWeight: "700" }}>Know you badminton skills with the support of AI.</p>
					</div>
				</Container>
			</div>
			<div
				style={{
					backgroundColor: "black",
				}}
			>
				<Container maxWidth="lg" style={{ padding: theme.spacing(4) }}>
					<div style={{ textAlign: "center" }}>
						<p style={{ fontSize: "50px", fontWeight: "700" }}>Want you play badminton? Book a court on our website.</p>
					</div>
				</Container>
			</div>
		</div>
	);
};

const LandingPage = () => {
	const theme = useTheme();
	return (
		<div style={{ flex: 1, color: theme.palette.text.primary }}>
			<Header />
			<Routes>
				<Route path="/" element={<LandingContent />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/pricing" element={<Pricing />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default LandingPage;
