import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, Stack, MenuItem, TextField} from "@mui/material";

// Remove in the future
import court1 from "./assets/court1.jpg";
import court2 from "./assets/court2.jpg";
import court3 from "./assets/court3.jpg";
import court4 from "./assets/court4.jpg";
import court5 from "./assets/court5.jpg";

type CardData = {
	id: number;
	field_name: string;
	court_number: string;
	date: string;
	start_time: string;
	end_time: string;
	address:  string;
	price: string;
	description: string;
	image?: string;
};

const loadCourtInfo = () =>{
	
}

const Booking = () => {
	const [courts, setCourts] = useState<CardData[]>([]);
	const [selectedCourt, setSelectedCourt] = useState<string>("");
  
	useEffect(() => {
		const fetchCourts = async () => {
		  try {
			// http://localhost:8000/api/booking/search?name=${selectedCourt}
			const response = await fetch(`http://localhost:8000/api/booking/search?name=${selectedCourt}`);
			const data = await response.json();

			const courtsWithImages = data.courts.map((court: CardData) => {
				let image;
				switch (court.field_name) {
				  case "Elite Badminton":
					image = court1;
					break;
				  case "Eastbay Badminton":
					image = court2;
					break;
				  case "Bintang Badminton":
					image = court3;
					break;
				  case "Synergy Badminton":
					image = court4;
					break;
				  default:
					image = court5;
				}
				return { ...court, image };
			  });
			setCourts(courtsWithImages);
		  } catch (error) {
			console.error(error);
		  }
		};
	
		fetchCourts();
	  }, [selectedCourt]);
	
	const handleSearchClick = () => {
		const fetchCourts = async () => {
		  try {
			// http://localhost:8000/api/booking/search?name=${selectedCourt}
			const response = await fetch(`/api/booking/search?name=${selectedCourt}`);
			const data = await response.json();

			const courtsWithImages = data.courts.map((court: CardData) => {
				let image;
				switch (court.field_name) {
				  case "Elite Badminton":
					image = court1;
					break;
				  case "Eastbay Badminton":
					image = court2;
					break;
				  case "Bintang Badminton":
					image = court3;
					break;
				  case "Synergy Badminton":
					image = court4;
					break;
				  default:
					image = court5;
				}
				return { ...court, image };
			  });
			setCourts(courtsWithImages);
		  } catch (error) {
			console.error(error);
		  }
		};
	
		fetchCourts();
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

					<Button variant="contained" startIcon={<SearchIcon />} component="span" onClick={handleSearchClick}>
						Search
					</Button>
				</div>
			</Stack>
			<Stack direction="column" spacing={6} sx={{ py: 0 }}>
				<Box component="div" sx={{ mt: 4, display: "grid", gridTemplateColumns: { md: "1fr 1fr 1fr 1fr" }, gap: 4 }}>
					{courts.map((card: CardData) => (
						<Card key={card.id} sx={{ width: "100%", height: "auto", aspectRatio: "100% / 150%" }}>
							<CardMedia component="img" alt={card.field_name} height="140" image={card.image || "court.jpg"} />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{card.field_name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{card.description}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{card.date} &nbsp; {card.start_time} - {card.end_time}
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
