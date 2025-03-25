import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: '0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3,
      }
    }}>
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%',
          backgroundColor: 'grey.200',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
