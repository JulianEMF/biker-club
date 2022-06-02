import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import { createProductReview } from '../actions/productActions';
import { updateOrderProductToReviewed } from '../actions/orderActions';


const ReviewProductScreen = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();

    const [ordersToReview, setOrdersToReview] = useState(0);
    const [productToReview, setProductToReview] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;

    useEffect(()=> {
        if (id){
            dispatch(getOrderDetails(id));
        }
    }, [id]);

    useEffect(() => {
        if (order) {
            const count = order.orderItems.filter(item => {
                return item.isReviewed === false;
            })
            setOrdersToReview(count.length);
        }
    }, [order]);
    
    const onClearReview = () => {
        setProductToReview({});
        setComment("");
        setRating(5);
    }

    const onSubmitReviewHandle = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productToReview.product, {
            rating, comment
        })).then(result => {
            const productId = {productId: productToReview}
            dispatch(updateOrderProductToReviewed(id, productId));
            onClearReview();
        })
    }

  return (
    <div>
        <h1>Review Products</h1>
        <h2>{order && `You have ${ordersToReview} product${ordersToReview === 1 ? "" : "s"} to review.`}</h2>
        <div>
            {/* {order ? order.orderItems.map(item => (
                <div key={item._id} onClick={() => setProductToReview(item)}>
                    <p>Image</p>
                    <h3>{item.name}</h3>
                </div>
            )) : "No Products to review."} */}
            {order ? order.orderItems.filter(item => {
                return item.isReviewed === false }).map(newItem => (
                    <div key={newItem._id} onClick={() => setProductToReview(newItem)}>
                        <p>Image</p>
                        <h3>{newItem.name}</h3>
                    </div>
                )) : ""}      
        </div>

        {productToReview.name && (
            <form onSubmit={onSubmitReviewHandle} className="vertical">
                <label htmlFor={productToReview.product}>{`Please leave a review for: ${productToReview.name}`}</label> 
                <textarea name={productToReview.product} type="text" autoComplete="on" placeholder="Please leave a review" value={comment} required onChange={(e) => setComment(e.target.value)}/>
                <label htmlFor="rating">How would you rate this product?</label>
                <select name="rating" id={productToReview.product} onChange={(e) => setRating(e.target.value)}>
                    <option value="5">5 Star</option>
                    <option value="4">4 Stars</option>  
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Stars</option>
                </select>
                <button onClick={onClearReview}>CANCEL</button>
                <button type="submit">SUBMIT REVIEW</button>
            </form>
        )}
       
    </div>
  )
}

export default ReviewProductScreen