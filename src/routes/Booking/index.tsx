import React from "react";
import { useTheme, Container } from "@mui/material";

const Booking = () => {
	const theme = useTheme();
	return (
		<Container maxWidth="lg">
			<div style={{ color: theme.palette.text.primary }}>Booking</div>
		</Container>
	);
};

export default Booking;
