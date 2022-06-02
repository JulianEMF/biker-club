import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import { Link } from 'react-router-dom';

const OrderDetailsScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }       
    }, [error])

  return (
    <div>
        <h1>Order Details</h1>
        {loading ? "... Loading ..." : error ? "... Error ..." : (
            <>
                <h2>{`Order Number: ${id}`}</h2>
                <h3>Shipping:</h3>
                <p>{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
                <div>
                    <h3>Items:</h3>
                    <div>
                        {order.orderItems.map(item => (
                            <div key={item._id} className="horizontal">
                                <div>Image</div>
                                <p>{item.name}</p>
                                <span>{`${item.qty} x $${item.price} = $${item.qty * item.price}`} </span>
                            </div>
                        ))}
                    </div>
                    <h3>Total:</h3>
                    <p>{`Shipping: ${order.shippingPrice}`}</p>
                    <p>{`Total: ${order.totalPrice}`}</p>
                    <div>
                        {!order.isReviewed && <Link to={`/review/${id}`}>REVIEW PRODUCTS</Link>}
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default OrderDetailsScreen