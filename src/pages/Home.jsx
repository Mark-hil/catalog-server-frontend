import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Pagination, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import AddProductForm from '../components/AddProductForm';
import { getProducts, searchProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch all products or search results
  const fetchProducts = async (query = '', page = 1) => {
    try {
      setLoading(true);
      const response = await searchProducts(query, page);
      setProducts(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when searching
    fetchProducts(query, 1);
  };

  // Handle page changes
  const handlePageChange = (event, value) => {
    setPage(value);
    fetchProducts(searchQuery, value);
  };

  // Fetch products on component mount or when page changes
  useEffect(() => {
    fetchProducts(searchQuery, page);
  }, [page]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddForm(!showAddForm)}
        sx={{ mb: 2 }}
      >
        {showAddForm ? 'Hide Form' : 'Add Product'}
      </Button>

      {showAddForm && <AddProductForm />}

      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : products.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          )}
        </>
      ) : (
        <Typography variant="h6" align="center" color="text.secondary">
          No products found
        </Typography>
      )}
    </Container>
  );
};

export default Home;