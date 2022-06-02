import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if(error) {
            return setMessage(error.error);
        }
        setMessage("");
    }, [error, userInfo])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return setMessage('Passwords do not match');
        } else {
            setMessage("");
            dispatch(register(name, email, password)).then(result => {
                console.log(result);
                return navigate("/login");
            })
        }        
    }

    return(
        <>
            <div>
                <h1>Register</h1>
            </div>
            <div>
                {loading && <h2>... Loading ...</h2>}
            </div>
            <div>
                <p>Join BikerClub and start enjoying the best prices for motorcycle apparel online</p>
            </div>
            <form className="vertical" onSubmit={onSubmitHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Enter name" autoComplete="on" required value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Email</label>
                <input type="email" name="email" placeholder="Enter email" autoComplete="on" required value={email} className={message === "This email has already been registered" ? "wrong-input" : ""} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="name">Password</label>
                <input type="password" name="password" placeholder="Enter password" autoComplete="off" required value={password} className={message === "Passwords do not match" ? "wrong-input" : ""} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="name">Confirm password</label>
                <input type="password" name="confirm-password" placeholder="Confirm password" autoComplete="off" required value={confirmPassword} className={message === "Passwords do not match" ? "wrong-input" : ""} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <input type="checkbox" name="subscribe" />
                <label htmlFor="subscribe">Subscribe to our newsletter to receive news, offers, and promotions.</label>
                <button type="submit">REGISTER</button>
            </form>
            <div>
                <span>Already have an accout?<Link to="/login">Sign in</Link></span>
            </div>
            <div>
                {message && message}
            </div>
        </>
    )
}

export default RegisterScreen;