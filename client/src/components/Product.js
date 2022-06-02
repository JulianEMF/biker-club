import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Link to={`/details/${product._id}`}>
        <p>{product.name}</p>
        <p>{product.brand}</p>
        <p>{product.rating}</p>
        <p>$ {product.price}</p>
    </Link>
  )
}

export default Product