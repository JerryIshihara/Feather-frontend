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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const Setting = () => {
	const theme = useTheme();

	return (
		<Container maxWidth="lg">
			<Stack direction="column" spacing={6} sx={{ py: 4 }}>
				{/* -----------------------------------------Password----------------------------------------- */}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, bgcolor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Change Password
						<div style={{ float: "right" }}>
							<Button variant="contained" startIcon={<SaveIcon />} component="span">
								Save
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
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Contact Information
						<div style={{ float: "right" }}>
							<Button variant="contained" startIcon={<SaveIcon />} component="span">
								Save
							</Button>
						</div>
					</Typography>

					<div>
						<TextField label="Email" required type="email" margin="normal" variant="outlined" fullWidth />
						<TextField label="Phone Number" type="tel" margin="normal" variant="outlined" fullWidth />
					</div>
				</Stack>

				{/* -----------------------------------------Notification----------------------------------------- */}
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						Notifications
						<div style={{ float: "right" }}>
							<Button variant="contained" startIcon={<SaveIcon />} component="span">
								Save
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
				<Stack direction="column" spacing={4} sx={{ borderRadius: 2, backgroundColor: theme.palette.background.default, p: 5 }}>
					<Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
						Preference
						<div style={{ float: "right" }}>
							<Button variant="contained" startIcon={<SaveIcon />} component="span">
								Save
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
