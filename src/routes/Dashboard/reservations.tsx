import React, { useState, useEffect } from "react";
import { useTheme, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Container, DialogContentText, DialogTitle, Box, Dialog, Stack, MenuItem, TextField, DialogContent, DialogActions} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useAuth } from "../../contexts/auth";

import court1 from "./assets/court1.jpg";
import court2 from "./assets/court2.jpg";
import court3 from "./assets/court3.jpg";
import court4 from "./assets/court4.jpg";
import court5 from "./assets/court5.jpg";

type Reservation = {
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

const Reservations = () => {
	const auth = useAuth() as any;
	const theme = useTheme();
	const user_id = auth.user.attributes.sub;
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [selectedReservation, setSelectedReservation] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchReservations = async () => {
			const response = await fetch("/api/getReserve?user_id=" + user_id);
			// const response = await fetch("http://localhost:8000/api/booking/getReserve?user_id=" + user_id);
			const data = await response.json();
			const reservationWithImages = data.courts.map((court: Reservation) => {
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
			  setReservations(reservationWithImages);
		};
		fetchReservations();
	}, []);

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
				My Reservations
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{reservations.map((reservation, index) => (
							<TableRow key={index} sx={{ py: 4, px: 2 }}>
								<TableCell>
									<Typography variant="body1">{reservation.field_name}</Typography>
								</TableCell>
								<TableCell>{reservation.date}&nbsp;{reservation.start_time}&nbsp;-&nbsp;{reservation.end_time}</TableCell>
								<TableCell>{reservation.address}</TableCell>
								<TableCell align="right">
									<Button variant="contained" sx={{ mr: 2 }} startIcon={<InfoIcon />}>
										Details
									</Button>
									<Button variant="contained" color="error" startIcon={<WarningAmberIcon />}>
										Cancel
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Reservations;
