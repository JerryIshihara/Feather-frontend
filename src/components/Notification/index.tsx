import * as React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNotification } from "../../contexts/notification";

export default function Notification() {
	const notification = useNotification();
	return (
		<Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={notification.show} autoHideDuration={6000}>
			<Alert severity={notification.props?.status} variant="filled" sx={{ width: "100%", color: "white" }}>
				{notification.props?.message}
			</Alert>
		</Snackbar>
	);
}
