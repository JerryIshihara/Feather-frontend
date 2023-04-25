import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
} from '@mui/material';
import creditCardImage from './assets/creditcard.png';
import applePayImage from './assets/apple.png';
import paypalImage from './assets/paypal.png';

const Payment = () => {
  const [selectedOption, setSelectedOption] = React.useState('creditCard');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const paymentOptions = [
    {
      id: 'creditCard',
      label: 'Credit Card',
      image: creditCardImage,
    },
    {
      id: 'applePay',
      label: 'Apple Pay',
      image: applePayImage,
    },
    {
      id: 'paypal',
      label: 'Paypal',
      image: paypalImage,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {paymentOptions.map((option) => (
            <TableRow key={option.id}>
              <TableCell>
                <Radio
                  checked={selectedOption === option.id}
                  onChange={handleChange}
                  value={option.id}
                  name="payment-radio-button"
                />
                {option.label}
              </TableCell>
              <TableCell>
                <img 
                  src={option.image} 
                  alt={option.label} 
                  style= {{ width: '150px', height: '50px', objectFit: 'contain' }}  
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Payment;