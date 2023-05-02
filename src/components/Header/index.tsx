import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Box, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Menu } from "@mui/icons-material";

import { HeaderRoutes } from "../../constants";
import Logo from "../Logo";
import Avatar from "./avatar";
import "./style.css";
import { useTheme } from "@emotion/react";

interface NavbarOptionsProps {
	open: boolean;
	onClose: () => void;
}
const NavbarOptions: React.FC<NavbarOptionsProps> = ({ open, onClose }) => {
	const navigate = useNavigate();
	const list = () => (
		<Box component="div" sx={{ width: 250, py: 4 }} role="presentation" onClick={() => {}} onKeyDown={() => {}}>
			<List>
				{Object.keys(HeaderRoutes).map((title: string, index: number) => (
					<ListItem key={index} disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(HeaderRoutes[title]);
								onClose();
							}}
						>
							{/* <ListItemIcon>
					{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
				  </ListItemIcon> */}
							<ListItemText primary={title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	return (
		<Drawer anchor={"left"} open={open} onClose={onClose}>
			{list()}
		</Drawer>
	);
};

interface TabProps {
	title: string;
}
const Tab: React.FC<TabProps> = props => {
	const loc = useLocation();
	return (
		<Link className={`header-tab ${HeaderRoutes[props.title] === loc.pathname ? "header-tab-active" : ""}`} to={HeaderRoutes[props.title]}>
			{props.title}
		</Link>
	);
};

interface Props {
	onSearch?: (keyword: string | undefined) => void;
}

const Header: React.FC<Props> = props => {
	const theme = useTheme();
	const isMobile = useMediaQuery((theme as any).breakpoints.down("md"));
	const [open, setOpen] = useState(false);
	return (
		<Container maxWidth="lg" sx={{ px: isMobile ? 2 : 0 }}>
			<NavbarOptions
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			/>
			<div className="header">
				<Stack direction="row" alignItems="center" sx={{ flex: 1 }} spacing={2}>
					{isMobile && (
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
					)}
					<Logo href="/" style={{ height: isMobile ? 20 : 30 }} />
				</Stack>

				{!isMobile && (
					<Stack direction="row" spacing={2}>
						{Object.keys(HeaderRoutes).map(title => (
							<Tab key={title} title={title} />
						))}
					</Stack>
				)}

				<Avatar />
			</div>
		</Container>
	);
};

export default Header;
