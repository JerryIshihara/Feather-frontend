import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, Stack, MenuItem, TextField} from "@mui/material";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Remove in the future
import court1 from "./assets/court1.jpg";
import court2 from "./assets/court2.jpg";
import court3 from "./assets/court3.jpg";
import court4 from "./assets/court4.jpg";
import court5 from "./assets/court5.jpg";

type CardData = {
	id: number;
	title: string;
	image?: string;
	description: string;
	time: string;
};

const Booking = () => {
	const [courts, setCourts] = React.useState<CardData[]>([
		{
			id: 1,
			title: "Eastbay Badminton",
			image: court3,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/25 Tues 1:00 am - 2:00 am",
		},
		{
			id: 2,
			title: "Eastbay Badminton",
			image: court3,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4-26 Wes 7:00 pm - 9:00 pm",
		},
		{
			id: 3,
			title: "Eastbay Badminton",
			image: court3,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4-26 Wes 8:00 am - 9:00 am",
		},
		{
			id: 4,
			title: "Elite Badminton",
			image: court1,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/27 Thurs 10:00 am - 11:00 am",
		},
		{
			id: 5,
			title: "Elite Badminton",
			image: court1,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/25 Tues 1:00 am - 2:00 am",
		},
		{
			id: 6,
			title: "Bintang Badminton",
			image: court2,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/28 Fri 11:00 am - 12:00 am",
		},
		{
			id: 7,
			title: "Bintang Badminton",
			image: court2,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/25 Tues 1:00 am - 2:00 am",
		},
		{
			id: 8,
			title: "Bay Badminton",
			image: court4,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/29 Sat 11:00 am - 12:00 am",
		},
		{
			id: 9,
			title: "Synergy Badminton",
			image: court5,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/30 Sun 8:00 am - 10:00 am",
		},
		{
			id: 10,
			title: "Synergy Badminton",
			image: court5,
			description: "There are 8 badminton courts. They are clean and spacious.",
			time: "4/30 Sun 11:00 am - 12:00 am",
		},
	]);

	const [selectedCourt, setSelectedCourt] = useState<string>("");
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// const handleDateChange = (date: Date | null) => {
	//   setSelectedDate(date);
	// };
  
	const handleCourtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setSelectedCourt(event.target.value);
	};

	return (
		<Container maxWidth="lg">
			<Stack direction="column" spacing={6} sx={{ py: 4 }}>

				{/* Court List */}
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: "2em" }}>
					<TextField
						select
						label="Select a court"
						variant="outlined"
						fullWidth
					>
						{['Eastbay Badminton', 'Elite Badminton', 'Bintang Badminton', 'Synergy Badminton', 'Bay Badminton'].map((court) => (
						<MenuItem key={court} value={court}>
							{court}
						</MenuItem>
						))}
					</TextField>

					<Button variant="contained" startIcon={<SearchIcon />} component="span">
						Search
					</Button>
				</div>
			</Stack>
			<Stack direction="column" spacing={6} sx={{ py: 4 }}>
				<Box component="div" sx={{ mt: 4, display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr 1fr" }, gap: 4 }}>
					{courts.map((card: CardData) => (
						<Card key={card.id} sx={{ width: "100%", height: "auto", aspectRatio: "100% / 150%" }}>
							<CardMedia component="img" alt={card.title} height="140" image={card.image || "court.jpg"} />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{card.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{card.description}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{card.time}
								</Typography>
							</CardContent>
							<CardActions sx={{ position: "relative", bottom: 0 }}>
								<Button size="small">Details</Button>
								<Button size="small">Reserve</Button>
							</CardActions>
						</Card>
					))}
				</Box>
			</Stack>
		</Container>
	);
};

export default Booking;
