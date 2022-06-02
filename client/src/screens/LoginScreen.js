import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router';
import "../css/forms.css";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // This hook obtains the redirect parameter from the URL that invoked this route,
    // in this case, it will be used to check if the user is authenticated and then redirect to shipping
    const [searchParams] = useSearchParams();
    const redirect = [...searchParams].length > 0 ? [...searchParams][0][1] : "/";

    const navigate = useNavigate();

    useEffect(()=>{
        if (userInfo){
            return navigate(redirect);
        } 
        if (error) {
            return setMessage(error.error);
        }
    }, [userInfo, error, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

  return (
    <>
        <h1>Sign In</h1>
        <div>
            {loading && <h2>... Loading ...</h2>}
        </div>
        <form onSubmit={onSubmitHandler} className="vertical">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter email" autoComplete="on" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter password" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">SIGN IN</button>
            <span>New User? <Link to="/register">Register</Link></span>
        </form>
        <div>
            {message && message}
        </div>
    </>
  )
}

export default LoginScreen