import React from "react";
import { useTheme, Container } from "@mui/material";

const Feed = () => {
	const theme = useTheme();
	return (
		<Container maxWidth="lg">
			<div style={{ color: theme.palette.text.primary }}>Feed</div>
		</Container>
	);
};

export default Feed;
