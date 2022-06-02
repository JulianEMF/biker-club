import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { getProductDetails } from '../actions/productActions';

const ProductDetailsScreen = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  
  useEffect(()=> {
        dispatch(getProductDetails(id));
}, [dispatch, id]);

  const onAddToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`);
  };

  console.log(product);

  return (
    <div>
      <h1>Product Details</h1>
      {productDetails.product ? (
          <div>
            <img src={productDetails.product.image} alt={productDetails.product.name} className="image"/>            
            <h2>{productDetails.product.name}</h2>
            <p>{productDetails.product.description}</p>
            <p>{productDetails.product.brand}</p>
            <p>{productDetails.product.price}</p>
            <p>{(productDetails.product.countInStock > 0) ? "In Stock" : "Sold Out"}</p>

            <form>
                <label htmlFor="select">Quantity </label>
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                </select>
                <button onClick={onAddToCartHandler} type='button' disabled={productDetails.product.countInStock === 0}>Add to Cart</button>
            </form>
          </div>
        ) : "Loading..."}
    </div>
  )
}

export default ProductDetailsScreen