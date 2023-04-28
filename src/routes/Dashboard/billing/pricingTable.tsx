import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio } from '@mui/material';

const PricingTable = () => {
  const [selectedOption, setSelectedOption] = React.useState('free');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    {id: 'premium', price: '$29.99 / month', description: ["Video upload for replay", "Sports advanced analysis", "Unlimited AI editing usage", "Team colloration"]},
    {id: 'pro', price: '$19.99 / month', description: ["Video upload for replay", "Sports performance analysis", "Unlimited AI editing usage"]},
    {id: 'basic', price: '$9.99 / month', description: ["Video upload for replay", "Limited sports performance analysis", "Limited AI editing usage"]},
    {id: 'free', price: '$0.00 / month', description: ["Video upload for replay", "Limited sports performance analysis", "Limited AI editing usage"]},
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {options.map((option) => (
            <TableRow key={option.id}>
              <TableCell>
                <Radio
                  checked={selectedOption === option.id}
                  onChange={handleChange}
                  value={option.id}
                  name="plan-radio-button"
                />
                {option.id.charAt(0).toUpperCase() + option.id.slice(1)}
              </TableCell>
              <TableCell>{option.price}</TableCell>
              <TableCell>
                <ul>
                  {option.description.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PricingTable;
