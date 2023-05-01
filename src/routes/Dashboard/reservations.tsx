import {
	useTheme,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Divider,
	Container,
	Stack,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type Reservation = {
	courtName: string;
	timePeriod: string;
	address: string;
};

const reservations: Reservation[] = [
	{
		courtName: "Eastbay Badminton",
		timePeriod: "10:00 AM - 11:00 AM",
		address: "123 Main St",
	},
	{
		courtName: "Elite Badminton",
		timePeriod: "11:00 AM - 12:00 PM",
		address: "456 Elm St",
	},
	{
		courtName: "Bintang Badminton",
		timePeriod: "12:00 PM - 01:00 PM",
		address: "789 Oak St",
	},
];

const Reservations = () => {
	const theme = useTheme();
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
									<Typography variant="body1">{reservation.courtName}</Typography>
								</TableCell>
								<TableCell>{reservation.timePeriod}</TableCell>
								<TableCell>{reservation.address}</TableCell>
								<TableCell align="right">
									<Stack direction={{ md: "row", sm: "column" }} justifyContent="flex-end" spacing={2}>
										<Button variant="contained" sx={{ mr: 2 }} startIcon={<InfoIcon />}>
											Details
										</Button>
										<Button variant="contained" color="error" startIcon={<WarningAmberIcon />}>
											Cancel
										</Button>
									</Stack>
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
