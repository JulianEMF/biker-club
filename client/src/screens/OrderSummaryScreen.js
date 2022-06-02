import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { createOrder, payOrder, getOrderDetails } from '../actions/orderActions';


const OrderSummaryScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id  } = useParams();

    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderCreate = useSelector(state => state.orderCreate);
    const { orderCreated, success, orderError } = orderCreate;

    const orderPay = useSelector(state => state.orderPay);
    const { url } = orderPay;

    // This part belongs to the order when reviewed by the user
    // const orderDetails = useSelector(state => state.orderDetails);
    // const { order, loading, error } = orderDetails;

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if(!userInfo){
            return navigate('/login');
        }
        if (url) {
            return window.location.href = url;
        }  
    }, [orderPay]);

    // useEffect(() => {
    //     if(!userInfo){
    //         navigate('/login');
    //     }

        // if(!order || successPay || successDeliver){
            // dispatch({ type: "ORDER_PAY_RESET" });
            // dispatch({ type: "ORDER_DELIVER_RESET" });
            // dispatch(getOrderDetails(orderId));
        // } else if(!order.isPaid){
            // if(!window.paypal){
            //     addPayPalScript();
            // } else{
            //     setSdkReady(true);
            // }
            // (navigate("/payment"))
        // }
    // }, [order, orderId, successPay, successDeliver]);
// }, []);

    // const successPaymentHandler = (paymentResult) => {
    //     // dispatch(payOrder(orderId, paymentResult));
    //     setShowToast(true);
    // }

    useEffect(()=>{
        if(cartItems.length) {
            setTotal(cartItems.reduce((acc, cur) => {
                return acc.price + cur.price;
            }));
            setShippingCost(total > 120 ? 0 : 10)
        } else {
            setTotal(0)
        }
    }, [cartItems]);

    const onSubmitOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            // paymentMethod: cart.paymentMethod,
            itemsPrice: total,
            shippingPrice: shippingCost,
            // taxPrice: cart.taxPrice,
            totalPrice: total + shippingCost
        }));
        dispatch(payOrder());
    }

  return (
    <div>
        <h1>Order Summary</h1>
            <div>
                <h2>Shipping</h2>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
            </div>
        <div>
            <h2>Items:</h2>
            <div>
                {cartItems.map(item => {
                    return(
                    <div key={item.product}>
                        <p>{item.name}</p>
                        <p>{item.qty}</p>
                        <p>{item.price}</p>
                    </div>
                    )
                })}
            </div>
        </div>
        <div>
            <h2>Summary</h2>
            {/* <p>Items: {total}</p>
            <p>Shipping: {shippingCost}</p>
            <p>Total: {total + shippingCost}</p> */}
        </div>
        {!id && <button onClick={onSubmitOrder}>PLACE ORDER</button>}
    </div>
  )
}

export default OrderSummaryScreen