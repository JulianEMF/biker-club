import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        if(shippingAddress) {
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setPostalCode(shippingAddress.postalCode);
            setCountry(shippingAddress.country);
        }
    }, [shippingAddress])
  
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/summary');
    }
    
    return (
    <div>
        <h1>ShippingScreen</h1>
        <Link to="/cart">Back</Link>
        <form onSubmit={onSubmitHandler} className="vertical">
            <label htmlFor="address">Address</label>
            <input type="address" name="address" placeholder="Enter address" value={address} required autoComplete='on' onChange={(e) => setAddress(e.target.value)} />
            <label htmlFor="city">city</label>
            <input type="city" name="city" placeholder="Enter city" value={city} required autoComplete='on' onChange={(e) => setCity(e.target.value)} />
            <label htmlFor="postal-code">Postal code</label>
            <input type="postal-code" name="postal-code" placeholder="Enter postal code" value={postalCode} required autoComplete='on' onChange={(e) => setPostalCode(e.target.value)} />
            <label htmlFor="country">Country</label>
            <input type="country" placeholder="Enter country" value={country} required autoComplete='on' onChange={(e) => setCountry(e.target.value)} />
            <button type="submit">CONTINUE</button>
        </form>
    </div>
  )
}

export default ShippingScreen