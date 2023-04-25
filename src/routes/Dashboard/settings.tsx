import React from "react";
import { useTheme, TextField, Container, FormControlLabel, Checkbox, Typography, Divider, RadioGroup, Radio, FormControl, FormLabel, Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

const Setting = () => {
const theme = useTheme();

return (
    <div style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(4) }}>
        <Container maxWidth="lg">

			{/* -----------------------------------------Password----------------------------------------- */}
			<Typography variant="h4" gutterBottom>
				Change Password
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
				<div>
					<TextField label="Current Password" required type="password" margin="normal" variant="outlined" fullWidth />
					<TextField label="New Password" type="password" margin="normal" variant="outlined" fullWidth inputProps={{ minLength: 8 }} />
					<TextField label="Confirm New Password" type="password" margin="normal" variant="outlined" fullWidth inputProps={{ minLength: 8 }} />
				</div>
			</Typography>

			{/* -----------------------------------------Contact Info----------------------------------------- */}
			<Divider style={{ margin: theme.spacing(2, 0) }} />
			<Typography variant="h4" gutterBottom>
				Contact Information
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
				<div>
					<TextField label="Email" required type="email" margin="normal" variant="outlined" fullWidth/>
					<TextField label="Phone Number" type="tel" margin="normal" variant="outlined" fullWidth/>
				</div>
			</Typography>

			{/* -----------------------------------------Notification----------------------------------------- */}
            <Divider style={{ margin: theme.spacing(2, 0) }} />
            <Typography variant="h4" gutterBottom>
				Notifications
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
			</Typography>

			<Typography variant="h5">Receive Notifications:</Typography>
			<FormControl component="fieldset">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Text" />
            </FormControl>

            <Typography variant="h5">Select messages you want to receive:</Typography>
            <FormControl component="fieldset">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Product updates" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="New videos" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="New comments" />
				<FormControlLabel control={<Checkbox defaultChecked />} label="Advertisements" />
				<FormControlLabel control={<Checkbox defaultChecked />} label="Sport lover events and meetups" />
            </FormControl>

			{/* -----------------------------------------Preference----------------------------------------- */}
            <Divider style={{ margin: theme.spacing(2, 0) }} />
            <Typography variant="h4" gutterBottom>
				Preference
				<div style={{ float: 'right' }}>
					<Button variant="contained" sx={{ color: theme.palette.text.primary }} startIcon={<SaveIcon />} component="span">
						Save
					</Button>
				</div>
			</Typography>
            <Typography variant="h5">Select topics you're interested in:</Typography>
            <FormControl component="fieldset">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Skill improving" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Daily sharing" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Sports brands" />
				<FormControlLabel control={<Checkbox defaultChecked />} label="Sporting events" />
            </FormControl>
        </Container>
    </div>
  );
};

export default Setting;