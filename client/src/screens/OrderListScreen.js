import React, { useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';
import { listOrders } from '../actions/adminActions';

const OrderListScreen = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        } else {
            navigate('/login');
        }
    }, [dispatch, userInfo, navigate]);

    return (
        <>
            <h1>Orders</h1>
            {loading ? "... Loading ..." : error ? "ERROR" : (
                <table>
                <thead>
                    <tr>
                    <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {orders && orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : ("x")}</td>
                        <td>
                            <Link to={`/order/${order._id}`}>Details</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </>
    )
};

export default OrderListScreen;