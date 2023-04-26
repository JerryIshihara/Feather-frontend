import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Pagination } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Remove in the future
import court1 from './assets/court1.jpg';
import court2 from './assets/court2.jpg';
import court3 from './assets/court3.jpg';
import court4 from './assets/court4.jpg';
import court5 from './assets/court5.jpg';

type CardData = {
  id: number;
  title: string;
  image?: string;
  description: string;
  time: string;
};

interface BookingProps {
	cards: CardData[];
  }

const cards: CardData[] = [
  {
    id: 1,
    title: 'Eastbay Badminton',
    image: court3,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/25 Tues 1:00 am - 2:00 am'
  },
  {
    id: 2,
    title: 'Eastbay Badminton',
    image: court3,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4-26 Wes 7:00 pm - 9:00 pm'
  },
  {
    id: 3,
    title: 'Eastbay Badminton',
    image: court3,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4-26 Wes 8:00 am - 9:00 am'
  },
  {
    id: 4,
    title: 'Elite Badminton',
    image: court1,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/27 Thurs 10:00 am - 11:00 am'
  },
  {
    id: 5,
    title: 'Elite Badminton',
    image: court1,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/25 Tues 1:00 am - 2:00 am'
  },
  {
    id: 6,
    title: 'Bintang Badminton',
    image: court2,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/28 Fri 11:00 am - 12:00 am'
  },
  {
    id: 7,
    title: 'Bintang Badminton',
    image: court2,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/25 Tues 1:00 am - 2:00 am'
  },
  {
    id: 8,
    title: 'Bay Badminton',
    image: court4,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/29 Sat 11:00 am - 12:00 am'
  },
  {
    id: 9,
    title: 'Synergy Badminton',
    image: court5,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/30 Sun 8:00 am - 10:00 am'
  },
  {
    id: 10,
    title: 'Synergy Badminton',
    image: court5,
    description: 'There are 8 badminton courts. They are clean and spacious.',
	time: '4/30 Sun 11:00 am - 12:00 am'
  },
];

const cardsPerRow = 4;
const numRows = Math.ceil(cards.length / cardsPerRow);

const rows: CardData[][] = [];

for (let i = 0; i < numRows; i++) {
  const start = i * cardsPerRow;
  const end = start + cardsPerRow;
  rows.push(cards.slice(start, end));
}

const Booking = () => {
	const cardsPerRow = 4;
	const numRows = Math.ceil(cards.length / cardsPerRow);
  
	const rows: CardData[][] = [];
  
	for (let i = 0; i < numRows; i++) {
	  const start = i * cardsPerRow;
	  const end = start + cardsPerRow;
	  rows.push(cards.slice(start, end));
	}
  
	return (
		<div>
			<div style={{ margin: '0 0% 0 4%' }}>
			{rows.map((row, rowIndex) => (
				<Box key={rowIndex} sx={{ display: 'flex', mb: 2 }} component="div">
				{row.map((card: CardData) => (
					<Card key={card.id} sx={{ width: '23%', height: 'auto', aspectRatio: '100% / 150%', mr: 2, position: 'relative' }}>
					<CardMedia
						component="img"
						alt={card.title}
						height="140"
						image={card.image || 'court.jpg'}
					/>
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
					<CardActions sx={{ position: 'relative', bottom: 0 }}>
						<Button size="small">Share</Button>
						<Button size="small">Reserve</Button>
					</CardActions>
					</Card>
				))}
				</Box>
			))}
			</div>
		</div>
	  );
}	  
  
  export default Booking;