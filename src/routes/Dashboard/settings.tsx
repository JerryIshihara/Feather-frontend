import React from "react";
import { useTheme, Container, FormControlLabel, Checkbox, Typography, Divider, RadioGroup, Radio, FormControl, FormLabel } from "@mui/material";

const Setting = () => {
const theme = useTheme();

return (
    <div style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(4) }}>
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Account</Typography>
            <Typography variant="subtitle1">Current Account: UserA</Typography>
            <FormControl component="fieldset">
                <FormLabel component="legend">Switch Account</FormLabel>
                <RadioGroup aria-label="account" name="account" defaultValue="UserA">
                    <FormControlLabel value="UserA" control={<Radio />} label="UserA" />
                    <FormControlLabel value="UserB" control={<Radio />} label="UserB" />
                    <FormControlLabel value="UserC" control={<Radio />} label="UserC" />
                </RadioGroup>
            </FormControl>
            <Divider style={{ margin: theme.spacing(2, 0) }} />
            <Typography variant="h4" gutterBottom>Notifications</Typography>
            <FormControl component="fieldset">
                <FormLabel component="legend">Receive Notifications</FormLabel>
                <RadioGroup aria-label="notifications" name="notifications" defaultValue="email">
                    <FormControlLabel value="email" control={<Radio />} label="Email" />
                    <FormControlLabel value="text" control={<Radio />} label="Text" />
                </RadioGroup>
            </FormControl>
            <Typography variant="subtitle1">Select messages you want to receive:</Typography>
            <FormControl component="fieldset">
                <FormControlLabel control={<Checkbox />} label="Product Updates" />
                <FormControlLabel control={<Checkbox />} label="New Videos" />
                <FormControlLabel control={<Checkbox />} label="New Comments" />
            </FormControl>
            <Divider style={{ margin: theme.spacing(2, 0) }} />
            <Typography variant="h4" gutterBottom>Billing and Payment</Typography>
            <Typography variant="subtitle1">Select your payment option:</Typography>
            <FormControl component="fieldset">
                <RadioGroup aria-label="payment" name="payment" defaultValue="visa">
                    <FormControlLabel value="visa" control={<Radio />} label="Visa/Master Card" />
                    <FormControlLabel value="applepay" control={<Radio />} label="ApplePay" />
                    <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                </RadioGroup>
            </FormControl>
            <Divider style={{ margin: theme.spacing(2, 0) }} />
            <Typography variant="h4" gutterBottom>Preference</Typography>
            <Typography variant="subtitle1">Select topics you're interested in:</Typography>
            <FormControl component="fieldset">
                <FormControlLabel control={<Checkbox />} label="Topic A" />
                <FormControlLabel control={<Checkbox />} label="Topic B" />
                <FormControlLabel control={<Checkbox />} label="Topic C" />
            </FormControl>
        </Container>
    </div>
  );
};

export default Setting;