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

const Payment = () => {
  const [selectedOption, setSelectedOption] = React.useState('creditCard');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const paymentOptions = [
    {
      id: 'creditCard',
      label: 'Credit Card',
      image: "../../assets/creditcard.png",
    },
    {
      id: 'applePay',
      label: 'Apple Pay',
      image: "../../assets/apple.png",
    },
    {
      id: 'paypal',
      label: 'Paypal',
      image: "../../assets/paypal.png",
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
                <img src={option.image} alt={option.label} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Payment;