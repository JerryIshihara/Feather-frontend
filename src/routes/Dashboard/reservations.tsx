import React, { useState, useEffect, useContext } from "react";
import {
	useTheme,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Typography,
	Container,
	DialogContentText,
	DialogTitle,
	Box,
	Dialog,
	Stack,
	MenuItem,
	TextField,
	DialogContent,
	DialogActions,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import court1 from "./assets/court1.jpg";
import court2 from "./assets/court2.jpg";
import court3 from "./assets/court3.jpg";
import court4 from "./assets/court4.jpg";
import court5 from "./assets/court5.jpg";

import { useAuth } from "../../contexts/auth";
import { useNotification } from "../../contexts/notification";

type Reservation = {
	id: number;
	field_name: string;
	court_number: string;
	date: string;
	start_time: string;
	end_time: string;
	address: string;
	price: string;
	description: string;
	image?: string;
};

const Reservations = () => {
	const auth = useAuth();
	const theme = useTheme();
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [selectedReservation, setSelectedReservation] = useState<Reservation>();
	const [open, setOpen] = useState(false);
	const [confirmCancel, setConfirmCancel] = useState(false);
	const notification = useNotification();
	const [cancelStatus, setCancelStatus] = useState("");

	const handleDetailsClick = (reservation: Reservation) => {
		setSelectedReservation(reservation);
		setOpen(true);
	};

	const handleCancel = (reservation: Reservation) => {
		const { id } = reservation;

		setCancelStatus("pending");

		fetch(process.env.REACT_APP_HEROKU_URL + "/api/booking/cancel_reserve", {
			// fetch('http://localhost:8000/api/booking/cancel_reserve', {
			method: "POST",
			body: JSON.stringify({
				id: id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setCancelStatus("success");
				notification.pop({ status: "success", message: "You have successfully cancelled your reservation!" });
			})
			.catch(error => {
				console.error(error);
				setCancelStatus("You have failed to cancelled your reservation!");
			});
	};

	useEffect(() => {
		const fetchReservations = async () => {
			if (!(auth.user as any).attributes) return;
			console.log((auth.user as any).attributes.sub);
			//   const response = await fetch("http://localhost:8000/api/booking/getReserve?user_id=" + user_id);
			const response = await fetch(`${process.env.REACT_APP_HEROKU_URL}/api/booking/getReserve?user_id=` + (auth.user as any).attributes.sub);
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
	}, [cancelStatus]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
				My Reservations
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{reservations.map((reservation: Reservation) => (
							<TableRow key={reservation.id} sx={{ py: 4, px: 2 }}>
								<TableCell>
									<Typography variant="body1">{reservation.field_name}</Typography>
								</TableCell>
								<TableCell>
									{reservation.date}&nbsp;{reservation.start_time}&nbsp;-&nbsp;{reservation.end_time}
								</TableCell>
								<TableCell>{reservation.address}</TableCell>
								<TableCell align="right">
									<Button
										variant="contained"
										sx={{ mr: 2 }}
										startIcon={<InfoIcon />}
										onClick={() => handleDetailsClick(reservation)}
									>
										Details
									</Button>
									<Button
										variant="contained"
										color="error"
										startIcon={<WarningAmberIcon />}
										onClick={() => handleCancel(reservation)}
									>
										Cancel
									</Button>
								</TableCell>
							</TableRow>
						))}
						{selectedReservation && (
							<Dialog open={open} onClose={handleClose}>
								<DialogTitle sx={{ backgroundColor: "##1e1e1e" }}>{selectedReservation.field_name}</DialogTitle>
								<DialogContent sx={{ backgroundColor: "##1e1e1e" }}>
									<Stack direction="column" spacing={2}>
										<img src={selectedReservation.image || "court.jpg"} alt={selectedReservation.field_name} />
										<Stack direction="column" spacing={1}>
											<Stack direction="row" justifyContent="space-between">
												<Typography variant="body1">
													<b>Court Number:</b>
												</Typography>
												<Typography variant="body1">{selectedReservation.court_number}</Typography>
											</Stack>
											<Stack direction="row" justifyContent="space-between">
												<Typography variant="body1">
													<b>Available Time:</b>
												</Typography>
												<Typography variant="body1">
													{selectedReservation.date} &nbsp; {selectedReservation.start_time} -{" "}
													{selectedReservation.end_time}
												</Typography>
											</Stack>
											<Stack direction="row" justifyContent="space-between">
												<Typography variant="body1">
													<b>Address:</b>
												</Typography>
												<Typography variant="body1">{selectedReservation.address}</Typography>
											</Stack>
											<Stack direction="row" justifyContent="space-between">
												<Typography variant="body1">
													<b>Price:</b>
												</Typography>
												<Typography variant="body1">{selectedReservation.price} &nbsp; $</Typography>
											</Stack>
											<Stack direction="row" justifyContent="space-between">
												<Typography variant="body1">
													<b>Description:</b>
												</Typography>
												<Typography variant="body1">{selectedReservation.description}</Typography>
											</Stack>
										</Stack>
									</Stack>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose}>Close</Button>
								</DialogActions>
							</Dialog>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Reservations;
