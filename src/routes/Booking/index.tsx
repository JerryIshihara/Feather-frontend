import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {DialogContentText, DialogTitle, Box, Container, Dialog, Stack, MenuItem, TextField, DialogContent, DialogActions} from "@mui/material";

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

const Booking = () => {
	const [courts, setCourts] = useState<CardData[]>([]);
	const [selectedCourt, setSelectedCourt] = useState<string>("all");
	const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
	const [open, setOpen] = useState(false);
  
	const handleDetailsClick = (card: CardData) => {
	  setSelectedCard(card);
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
	  
	const handleCourtChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedCourt(event.target.value as string);
	};
  
	useEffect(() => {
		const fetchCourts = async () => {
		  try {
			const response = await fetch(`/api/booking/search?name=${selectedCourt}`);
			// const response = await fetch(`http://localhost:8000/api/booking/search?name=${selectedCourt}`);
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

	return (
		<Container maxWidth="lg">
			<Stack direction="column" spacing={6} sx={{ py: 4 }}>

				{/* Court List */}
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: "2em" }}>
					<TextField
						select
						label="Select a court"
						variant="outlined"
						value={selectedCourt}
						onChange={handleCourtChange}
						fullWidth
					>
						{['All', 'Eastbay Badminton', 'Elite Badminton', 'Bintang Badminton', 'Synergy Badminton', 'Bay Badminton'].map((court) => (
						<MenuItem key={court} value={court}>
							{court}
						</MenuItem>
						))}
					</TextField>
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
								<Button size="small" onClick={() => handleDetailsClick(card)}>Details</Button>
								<Button size="small">Reserve</Button>
							</CardActions>
						</Card>
					))}
					{selectedCard && (
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle sx={{backgroundColor: '##1e1e1e'}}>{selectedCard.field_name}</DialogTitle>
							<DialogContent sx={{backgroundColor: '##1e1e1e'}}>
								<Stack direction="column" spacing={2}>
									<img src={selectedCard.image || "court.jpg"} alt={selectedCard.field_name}/>
									<Stack direction="column" spacing={1}>
										<Stack direction="row" justifyContent="space-between">
											<Typography variant="body1"><b>Court Number:</b></Typography>
											<Typography variant="body1">{selectedCard.court_number}</Typography>
										</Stack>
										<Stack direction="row" justifyContent="space-between">
											<Typography variant="body1"><b>Available Time:</b></Typography>
											<Typography variant="body1">{selectedCard.date} &nbsp; {selectedCard.start_time} - {selectedCard.end_time}</Typography>
										</Stack>
										<Stack direction="row" justifyContent="space-between">
											<Typography variant="body1"><b>Address:</b></Typography>
											<Typography variant="body1">{selectedCard.address}</Typography>
										</Stack>
										<Stack direction="row" justifyContent="space-between">
											<Typography variant="body1"><b>Price:</b></Typography>
											<Typography variant="body1">{selectedCard.price} &nbsp; $</Typography>
										</Stack>
										<Stack direction="row" justifyContent="space-between">
											<Typography variant="body1"><b>Description:</b></Typography>
											<Typography variant="body1">{selectedCard.description}</Typography>
										</Stack>
									</Stack>
								</Stack>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Close</Button>
							</DialogActions>
						</Dialog>
						)}
				</Box>
			</Stack>
		</Container> 
	);
};

export default Booking;