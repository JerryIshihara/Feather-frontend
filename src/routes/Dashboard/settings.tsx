import React from "react";
import {
	useTheme,
	TextField,
	Container,
	FormControlLabel,
	Checkbox,
	Typography,
	Divider,
	RadioGroup,
	Radio,
	FormControl,
	FormLabel,
	Button,
	Stack,
	useMediaQuery,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const Setting = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Container maxWidth="lg">
			<Stack direction="column" spacing={6} sx={{ py: 4 }}>
				{/* -----------------------------------------Password----------------------------------------- */}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: isMobile ? 3 : 5 }}>
					<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }}>
						Change Password
						<div style={{ float: "right" }}>
							<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
								{isMobile ? "" : "Save"}
							</Button>
						</div>
					</Typography>

					<div>
						<TextField label="Current Password" required type="password" margin="normal" variant="outlined" fullWidth />
						<TextField label="New Password" type="password" margin="normal" variant="outlined" fullWidth inputProps={{ minLength: 8 }} />
						<TextField
							label="Confirm New Password"
							type="password"
							margin="normal"
							variant="outlined"
							fullWidth
							inputProps={{ minLength: 8 }}
						/>
					</div>
				</Stack>

				{/* -----------------------------------------Contact Info----------------------------------------- */}
				<Stack
					direction="column"
					spacing={4}
					sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: isMobile ? 3 : 5 }}
				>
					<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }}>
						Contact Information
						<div style={{ float: "right" }}>
							<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
								{isMobile ? "" : "Save"}
							</Button>
						</div>
					</Typography>

					<div>
						<TextField label="Email" required type="email" margin="normal" variant="outlined" fullWidth />
						<TextField label="Phone Number" type="tel" margin="normal" variant="outlined" fullWidth />
					</div>
				</Stack>

				{/* -----------------------------------------Addresses----------------------------------------- */}
				<Stack
					direction="column"
					spacing={4}
					sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: isMobile ? 3 : 5 }}
				>
					<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }}>
						Address
						<div style={{ float: "right" }}>
							<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
								{isMobile ? "" : "Save"}
							</Button>
						</div>
					</Typography>
					<TextField label="Street Address" required margin="normal" variant="outlined" fullWidth />
					<TextField label="City" required margin="normal" variant="outlined" fullWidth />
					<TextField label="State/Province" required margin="normal" variant="outlined" fullWidth />
					<TextField label="Postal Code" required margin="normal" variant="outlined" fullWidth />
					<TextField label="Country" required margin="normal" variant="outlined" fullWidth />
				</Stack>

				{/* -----------------------------------------Notification----------------------------------------- */}
				<Stack
					direction="column"
					spacing={4}
					sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: isMobile ? 3 : 5 }}
				>
					<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }}>
						Notifications
						<div style={{ float: "right" }}>
							<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
								{isMobile ? "" : "Save"}
							</Button>
						</div>
					</Typography>

					<Stack direction="column" spacing={2}>
						<Typography variant="h6">Receive Notifications:</Typography>
						<FormControl component="fieldset">
							<FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Text" />
						</FormControl>
					</Stack>

					<Stack direction="column" spacing={2}>
						<Typography variant="h6">Select messages you want to receive:</Typography>
						<FormControl component="fieldset">
							<FormControlLabel control={<Checkbox defaultChecked />} label="Product updates" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="New videos" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="New comments" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Advertisements" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Sport lover events and meetups" />
						</FormControl>
					</Stack>
				</Stack>

				{/* -----------------------------------------Preference----------------------------------------- */}
				<Stack
					direction="column"
					spacing={4}
					sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: isMobile ? 3 : 5 }}
				>
					<Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: "bold" }} gutterBottom>
						Preferences
						<div style={{ float: "right" }}>
							<Button variant={isMobile ? "text" : "contained"} startIcon={<SaveIcon />} component="span">
								{isMobile ? "" : "Save"}
							</Button>
						</div>
					</Typography>
					<Stack direction="column" spacing={2}>
						<Typography variant="h6">Select topics you're interested in:</Typography>
						<FormControl component="fieldset">
							<FormControlLabel control={<Checkbox defaultChecked />} label="Skill improving" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Daily sharing" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Sports brands" />
							<FormControlLabel control={<Checkbox defaultChecked />} label="Sporting events" />
						</FormControl>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Setting;
