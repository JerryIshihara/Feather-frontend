import React, { useState, ChangeEvent } from "react";
import { Tabs, Tab, Box as MuiBox } from "@mui/material";
import Feed from "../Feed";
import Booking from "../Booking";
import Pricing from "../Payment";
import { styled } from "@mui/system";

const Box = styled(MuiBox)<{ sx: any }>``;

const Overview = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div>
			<Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
				<Tabs value={value} onChange={handleChange} aria-label="overview tabs">
					<Tab label="Feed" />
					<Tab label="Booking" />
					<Tab label="Pricing" />
				</Tabs>
			</Box>
			{value === 0 && <Feed />}
			{value === 1 && <Booking />}
			{value === 2 && <Pricing />}
		</div>
	);
};

export default Overview;
