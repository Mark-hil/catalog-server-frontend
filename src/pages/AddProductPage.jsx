import React from 'react';
import AddProductForm from '../components/AddProductForm';

const AddProductPage = ({ token }) => {
  return (
    <div>
      <AddProductForm token={token} />
    </div>
  );
};

export default AddProductPage;