import React from "react";
import { useTheme, Container } from "@mui/material";

const Pricing = () => {
	const theme = useTheme();
	return (
		<Container maxWidth="lg">
			<div style={{ color: theme.palette.text.primary }}>Pricing</div>
		</Container>
	);
};

export default Pricing;
