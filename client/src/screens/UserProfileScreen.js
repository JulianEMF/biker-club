import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const UserProfileScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(()=> {
        if(!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails(userInfo._id));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }    
    }, [userInfo, user, success, orders, navigate, dispatch]);


    // const [ordersToReview, setOrdersToReview] = useState([]);

    

    // const onReviewButtonHandler = () => {
    //     navigate(`/profile/review/${userInfo._id}`);
    // }

    const onUpdateUserInfo = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }else{
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        } 
    }

  return (
    <div className="horizontal">
        
        <div>
        <h1>UserProfileScreen</h1>
            <form onSubmit={onUpdateUserInfo} className="vertical">
                <label htmlFor="name">Name</label>
                <input type="name" name="name" placeholder="Enter name" autoComplete="on" required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" placeholder="Enter email" autoComplete="on" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="password" placeholder="Enter password" autoComplete="off" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type="submit">UPDATE</button>
            </form>
        </div>

        <div>
            <h2>My Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
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
            {user && user.pendingReviews && <button>REVIEW PRODUCTS</button>}
        </div>
    </div>
  )
}

export default UserProfileScreen;