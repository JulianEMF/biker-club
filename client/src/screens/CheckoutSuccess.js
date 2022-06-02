import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { updateOrderToPaid } from '../actions/orderActions';

const CheckoutSuccess = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector(state => state.orderPay);
  const { lastOrder } = order;

  const paidOrder = useSelector(state => state.orderUpdateToPaid);
  const { success } = paidOrder;

  const [message, setMessage] = useState("Waiting for payment confirmation.");

  useEffect(() => {
    if (lastOrder) {
      dispatch(updateOrderToPaid(lastOrder._id));
    }
  }, [lastOrder]);

  useEffect(() => {
    if (success) {
      setMessage("Your payment has been successfully submitted. Thank you!")
    }
  }, [success])

  const onBackToShopping = () => {
    navigate("/");
  }

  return (
    <div>
      <h1>Checkout Success</h1>
      <p>{message}</p>
      <button onClick={onBackToShopping}>Back to Shopping</button>
    </div>
  )
}

export default CheckoutSuccess