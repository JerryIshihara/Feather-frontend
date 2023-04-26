import {useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type Reservation = {
  courtName: string;
  timePeriod: string;
  address: string;
}

const reservations: Reservation[] = [
  {
    courtName: 'Eastbay Badminton',
    timePeriod: '10:00 AM - 11:00 AM',
    address: '123 Main St'
  },
  {
    courtName: 'Elite Badminton',
    timePeriod: '11:00 AM - 12:00 PM',
    address: '456 Elm St'
  },
  {
    courtName: 'Bintang Badminton',
    timePeriod: '12:00 PM - 01:00 PM',
    address: '789 Oak St'
  }
];

const Reservations = () => {

  const theme = useTheme();
  return (
	<div style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(4) }}>
		<Typography variant="h4" gutterBottom>
			My Reservations
		</Typography>
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
				{reservations.map((reservation, index) => (
					<TableRow key={index}>
						<TableCell>{reservation.courtName}</TableCell>
						<TableCell>{reservation.timePeriod}</TableCell>
						<TableCell>{reservation.address}</TableCell>
						<TableCell>
							<Button variant="contained" sx={{ color: theme.palette.text.primary, marginRight: '8px' }} startIcon={<InfoIcon />}>Details</Button>
							<Button variant="contained" color="error" startIcon={<WarningAmberIcon />}>Cancel</Button>
						</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
		</TableContainer>
	</div>
  );
};

export default Reservations;