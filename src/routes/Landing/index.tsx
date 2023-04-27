import React, { useRef } from "react";
import { useTheme, Container, Button } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

import { Header, Footer } from "../../components";
import Court3D from "./court";
import Booking from "../Booking";
import Feed from "../Feed";
import Pricing from "../Pricing";
import { Stack } from "@mui/system";
import SplineCourt from "./spline-court";

const SCENE = "https://prod.spline.design/U2fplQkZQPZ02Xkn/scene.splinecode";

const LandingContent = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const ref = useRef() as any;
	return (
		<div>
			<Container maxWidth="lg">
				<Stack direction="column" alignItems="center" spacing={0} style={{ marginTop: -50 }}>
					<p style={{ textAlign: "center", fontSize: 70, fontWeight: "600", backgroundColor: "transparent", marginTop: 50 }}>
						Smash the badminton with AI-powered tool.
					</p>
					<img alt="court" src={require("../../assets/spline-court.png")} style={{ width: "100%", marginTop: -200, marginBottom: -100 }} />
					{/* <div style={{ width: "100%", background: "grey", height: 500 }}> */}
					{/* <Spline
						ref={ref}
						scene={SCENE}
						style={{ width: "100%", background: "grey", height: 500 }}
						onLoad={() => {
							console.log(ref?.current?.children[0]);
							ref!.current!.children[0].style.width = `${1474 / 2}px`;
							ref!.current!.children[0].style.height = `${1086 / 2}px`;
							ref!.current!.children[0].position += 20;
							// ref!.current!.children[0].width = window.innerWidth / 2;
							// ref!.current!.children[0].height = "500px";
						}}
					/> */}

					<center>
						<p style={{ fontSize: "25px", padding: "0 30px" }}>
							Get your game highlight clips with just one-click. Analyze your motion data and skills with our advanced AI tools.
						</p>
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
				</Stack>

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
				<Route path="/feed/*" element={<Feed />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/pricing" element={<Pricing />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default LandingPage;
