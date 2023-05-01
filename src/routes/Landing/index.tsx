import React, { useRef } from "react";
import { useTheme, Container, Button } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/98288-loading.json";
import useMediaQuery from "@mui/material/useMediaQuery";

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
	const [loading, setLoading] = React.useState(true);
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<div>
			<Container maxWidth="lg">
				<Stack direction="column" alignItems="center" spacing={0} style={{ marginTop: -50 }}>
					<p
						style={{
							textAlign: "center",
							fontSize: isMobile ? 50 : 70,
							fontWeight: "600",
							backgroundColor: "transparent",
							marginTop: 50,
						}}
					>
						Smash the badminton with AI-powered tool.
					</p>
					{loading && (
						<div style={{ height: 300 }}>
							<Lottie animationData={animationData} autoplay loop size={300} style={{ margin: "0 auto" }} />
						</div>
					)}
					<img
						alt="court"
						onLoad={() => {
							setLoading(false);
						}}
						className={`image-container${!loading ? " loaded" : ""}`}
						src={require("../../assets/spline-court.png")}
						style={{
							width: "100%",
							marginTop: isMobile ? -50 : -200,
							marginBottom: isMobile ? -50 : -100,
							display: loading ? "none" : "block",
						}}
					/>

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
					<p style={{ fontSize: "20px", color: theme.palette.text.secondary, fontWeight: "700", marginBottom: 20 }}>TRUSTED BY</p>
					<div style={{ gap: "10px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
						{[...Array(5)].map((item, index) => (
							<span key={index} style={{ backgroundColor: theme.palette.action.selected, padding: "10px", margin: theme.spacing(2) }}>
								Partner {index + 1}
							</span>
						))}
					</div>
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
						<p style={{ fontSize: "50px", fontWeight: "700" }}>🎥 One-Click Highlight Reel</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>
							🚀 Save time and showcase your skills with our one-click highlight feature! ⏰
						</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>
							🙌 Never struggle with complex video editing tools again - create high-quality highlights with ease! 💪
						</p>
					</div>
				</Container>
			</div>
			<div>
				<Container maxWidth="lg" style={{ padding: theme.spacing(4) }}>
					<div style={{ textAlign: "center" }}>
						<p style={{ fontSize: "50px", fontWeight: "700" }}>🏸️ Smash Your Way to Success: AI-powered Badminton Skill Assessment</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>🎮 Serve up your game with AI-assisted skill analysis ⏰</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>🤖️ Let AI be your coach: Assess and improve your badminton skills 💪</p>
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
						<p style={{ fontSize: "50px", fontWeight: "700" }}>🗓️ Ace your Game with Easy Court Booking</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>🏸 Book your court and let the games begin 🎮</p>
						<p style={{ fontSize: "20px", fontWeight: "400" }}>👟 Get ready to play! Reserve your badminton court now 💪</p>
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
