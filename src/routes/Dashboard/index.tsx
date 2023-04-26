import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useTheme, Stack, Box, Container, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout, Home, Movie, Settings, AutoGraph, Person, Payment } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";

import { useAuth } from "../../contexts/auth";
import { Logo } from "../../components";
import Analysis from "./analysis";
import Setting from "./settings";
import Video from "./videos";
import Billing from "./billing";
import Overview from "./overview";

const SideBarRoutes = [
	{ title: "Overview", icon: <Home />, uri: "/dashboard", isActive: (path: string) => /^\/dashboard$/.test(path) },
	{ title: "Profile", icon: <Person />, uri: "/dashboard/profile", isActive: (path: string) => /^\/dashboard\/profile*/.test(path) },
	{ title: "Video", icon: <Movie />, uri: "/dashboard/video", isActive: (path: string) => /^\/dashboard\/video*/.test(path) },
	{ title: "Analysis", icon: <AutoGraph />, uri: "/dashboard/analysis", isActive: (path: string) => /^\/dashboard\/analysis*/.test(path) },
	{ title: "Billing", icon: <Payment />, uri: "/dashboard/billing", isActive: (path: string) => /^\/dashboard\/billing*/.test(path) },
	{ title: "Settings", icon: <Settings />, uri: "/dashboard/settings", isActive: (path: string) => /^\/dashboard\/settings*/.test(path) },
];

const Dashboard = () => {
	const auth = useAuth();
	const theme = useTheme();
	const navigate = useNavigate();
	const [state, setState] = React.useState(false);

	const list = () => (
		<Box component="div" sx={{ width: "100%" }} role="presentation">
			<Logo href="/" style={{ height: 20, marginTop: theme.spacing(5), margin: theme.spacing(3) }} />
			<List>
				{SideBarRoutes.map(({ title, icon, uri, isActive }) => (
					<ListItem key={title} disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(uri);
							}}
							sx={{
								bgcolor: isActive(window.location.pathname) ? indigo["800"] : "transparent",
								color: isActive(window.location.pathname) ? theme.palette.text.primary : theme.palette.text.secondary,
							}}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<List style={{ marginTop: theme.spacing(16) }}>
				<ListItem key={"logout"} disablePadding onClick={auth.signout}>
					<ListItemButton>
						<ListItemIcon>
							{" "}
							<Logout />
						</ListItemIcon>
						<ListItemText primary={"Log out"} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<div
			style={{
				padding: theme.spacing(4),
				minHeight: "100vh",
				backgroundColor: "black",
				color: theme.palette.text.primary,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			{/* {list()} */}
			<Drawer
				anchor={"left"}
				variant="permanent"
				sx={{
					width: "20%",
					maxWidth: 240,
					minWidth: 180,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: "20%",
						maxWidth: 240,
						minWidth: 180,
						boxSizing: "border-box",
					},
				}}
			>
				{list()}
			</Drawer>
			<Box component="div" sx={{ flexGrow: 1 }}>
				{/* <Container maxWidth="lg" sx={{ pd: 0 }}>
					<Stack direction="row-reverse" justifyContent="flex-start" alignItems="center" spacing={0}>
						<Avatar size={60} />
					</Stack>
				</Container> */}
				<Routes>
					<Route path="/analysis/*" element={<Analysis />} />
					<Route path="/video/*" element={<Video />} />
					<Route path="/settings/*" element={<Setting />} />
					<Route path="/billing/*" element={<Billing />} />
					<Route path="/*" element={<Overview />} />
				</Routes>
			</Box>
		</div>
	);
};

export default Dashboard;
