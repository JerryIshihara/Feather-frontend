import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: grey[900],
	backgroundColor: "white",
	textTransform: "none",
	"&:hover": {
		backgroundColor: grey[300],
	},
}));

interface Props {
	onClick: () => void;
}

const GoogleButton = (props: Props) => {
	return (
		<ColorButton
			size="large"
			variant="contained"
			fullWidth
			startIcon={<img alt="google logo" src={require("../../assets/google_logo.png")} style={{ width: 25, height: 25 }} />}
			onClick={props.onClick}
		>
			Login with Google
		</ColorButton>
	);
};

export default GoogleButton;
