import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

const Watch = () => {
	const [params, setParams] = useSearchParams();
	return (
		<Container maxWidth="lg">
			<Stack direction="row" alignItems="center" sx={{ minHeight: "64px" }} spacing={2}>
				<video controls autoPlay src={`${process.env.REACT_APP_CDN_URL}${params.get("v")}`} style={{ width: "100%" }} />
			</Stack>
		</Container>
	);
};

export default Watch;
