import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { addProduct } from '../services/api';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !price) {
      setMessage('Name and price are required.');
      return;
    }

    try {
      const productData = { name, description, price: parseFloat(price) };
      const response = await addProduct(productData);
      setMessage('Product added successfully!');
      console.log('Product added:', response.data);

      // Clear the form
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Add Product
        </Button>
        {message && (
          <Typography variant="body1" align="center" sx={{ mt: 2, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default AddProductForm;