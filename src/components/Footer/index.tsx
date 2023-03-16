import React from "react";
import { useTheme, Container } from "@mui/material";

const Footer = () => {
	const theme = useTheme();
	return (
		<div style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(4) }}>
			<Container maxWidth="lg">
				<div style={{ color: theme.palette.text.primary }}>{new Date().getFullYear()} Feather @ CS260A</div>
			</Container>
		</div>
	);
};

export default Footer;
