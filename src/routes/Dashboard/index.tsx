import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useTheme, Stack, Box, Avatar, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Logout, Home, Movie, Settings, Person, Payment, SportsTennis } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { indigo } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu } from "@mui/icons-material";

import { useAuth } from "../../contexts/auth";
import { Logo } from "../../components";
import Setting from "./settings";
import Video from "./videos";
import Billing from "./billing";
import Overview from "./overview";
import Reservations from "./reservations";
import Profile from "./profile";

const SideBarRoutes = [
	{ title: "Overview", icon: <Home />, uri: "/dashboard", isActive: (path: string) => /^\/dashboard$/.test(path) },
	{ title: "Profile", icon: <Person />, uri: "/dashboard/profile", isActive: (path: string) => /^\/dashboard\/profile*/.test(path) },
	{ title: "Video", icon: <Movie />, uri: "/dashboard/video", isActive: (path: string) => /^\/dashboard\/video*/.test(path) },
	// { title: "Analysis", icon: <AutoGraph />, uri: "/dashboard/analysis", isActive: (path: string) => /^\/dashboard\/analysis*/.test(path) },
	{
		title: "Reservations",
		icon: <SportsTennis />,
		uri: "/dashboard/reservations",
		isActive: (path: string) => /^\/dashboard\/reservations*/.test(path),
	},
	{ title: "Billing", icon: <Payment />, uri: "/dashboard/billing", isActive: (path: string) => /^\/dashboard\/billing*/.test(path) },
	{ title: "Settings", icon: <Settings />, uri: "/dashboard/settings", isActive: (path: string) => /^\/dashboard\/settings*/.test(path) },
];

const Dashboard = () => {
	const auth = useAuth();
	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery((theme as any).breakpoints.down("md"));
	const [open, setOpen] = React.useState(false);

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
				padding: isMobile ? theme.spacing(1) : theme.spacing(4),
				paddingTop: theme.spacing(4),
				minHeight: "100vh",
				backgroundColor: "black",
				color: theme.palette.text.primary,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			{(!isMobile || open) && (
				<Drawer
					open={open || !isMobile}
					anchor={"left"}
					onClick={() => {
						setOpen(false);
					}}
					variant={!isMobile ? "permanent" : "temporary"}
					sx={{
						width: "20%",
						maxWidth: 240,
						minWidth: 240,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: "20%",
							maxWidth: 240,
							minWidth: 240,
							boxSizing: "border-box",
						},
					}}
				>
					{list()}
				</Drawer>
			)}
			<Stack direction="column" spacing={2} sx={{ width: "100%" }}>
				{isMobile && (
					<Stack direction="row" alignItems="center">
						<Stack direction="row" alignItems="center" sx={{ flex: 1 }} spacing={2}>
							<IconButton
								color="primary"
								component="label"
								size="large"
								sx={{ color: "white" }}
								onClick={() => {
									setOpen(true);
								}}
							>
								<Menu sx={{ fontSize: 30 }} />
							</IconButton>
							<Logo href="/" style={{ height: isMobile ? 20 : 30 }} />
						</Stack>
						{auth.user && <Avatar alt="avatar" src={(auth.user as any).attributes.picture} />}
					</Stack>
				)}
				<Box component="div" sx={{ flexGrow: 1 }}>
					{/* <Container maxWidth="lg" sx={{ pd: 0 }}>
					<Stack direction="row-reverse" justifyContent="flex-start" alignItems="center" spacing={0}>
						<Avatar size={60} />
					</Stack>
				</Container> */}
					<Routes>
						{/* <Route path="/analysis/*" element={<Analysis />} /> */}
						<Route path="/video/*" element={<Video />} />
						<Route path="/settings/*" element={<Setting />} />
						<Route path="/billing/*" element={<Billing />} />
						<Route path="/reservations/*" element={<Reservations />} />
						<Route path="/profile/*" element={<Profile />} />
						<Route path="/*" element={<Overview />} />
					</Routes>
				</Box>
			</Stack>
		</div>
	);
};

export default Dashboard;
