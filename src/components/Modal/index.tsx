import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal, CircularProgress, Paper, Stack } from "@mui/material";

import { useLoading } from "../../contexts/loading";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: 300,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 8,
	border: "none",
};

export default function LoadingModal() {
	const loader = useLoading();
	return (
		<Modal open={loader.loading} disableAutoFocus={true}>
			<Paper sx={style}>
				<Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
					<CircularProgress />
					<h4>{loader.message}</h4>
				</Stack>
			</Paper>
		</Modal>
	);
}
