import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Subscribed!")
    }

    const date =  new Date().getFullYear();

  return (
    <div className="vertical dark-background">
        <div className="horizontal">
            <span>---------</span>
            <span>Biker Club</span>
            <span>---------</span>
        </div>
        <div className="horizontal">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="subscribe-email">Subscribe to our newsletter</label>
                <input type="email" name="subscribe-email" placeholder="Enter your email address..." required autoComplete='on'/>
                <button type="submit">SUBSCRIBE</button>
            </form>
            <div className="vertical">
                <Link to="/">About Us</Link>
                <Link to="/">Gift Cards</Link>
                <Link to="/">Customer Service</Link>
                <Link to="/">Return Policy</Link>
                <Link to="/">Careers</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Blog</Link>
            </div>
            <div>
                <p>Stay Connected</p>
                <div className="horizontal">
                    <p>f</p>
                    <p>i</p>
                    <p>l</p>
                    <p>w</p>
                    <p>y</p>
                </div>
            </div>
        </div>
        <p>&#64;Biker Club all rigths reserved {date}</p>
    </div>
  )
}

export default Footer;