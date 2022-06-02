import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

const CartScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { id } = useParams();
    const qty = new URLSearchParams(location.search).get('qty');

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(()=> {
      if(id){
        dispatch(addToCart(id, qty));
      }
    }, [dispatch, id, qty]);
  
    const onRemoveFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    }
  
    const onCheckoutHandler = () => {
      navigate('/login/?redirect=/shipping');
    }

  return (
    <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <h2>Your cart is empty</h2> : (
          <div>
            {cartItems.map(item => (
              <div key={item.product}>
                <div>
                  <img src={item.image} alt={item.name}/>
                </div>
                <div>
                  <Link to={`/products/details/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  ${item.price}
                </div>
                <form>
                  <label htmlFor="select">Quantity</label>
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))} >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x+1} value={x+1}>
                        {x+1}
                      </option>
                    ))}
                  </select>
                </form>

                <div>
                  <button type='button' variant='light' onClick={() => onRemoveFromCartHandler(item.product)}>
                    {/* <i className='fas fa-trash'></i> Add an icon later on */}
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <div>
          <h2>Subtotal ({cartItems.reduce((acc, item) => parseInt(acc) + parseInt(item.qty), 0)}) items</h2>
          ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </div>

          <button type="button" disabled={cartItems.length === 0} onClick={onCheckoutHandler}>
            CONTINUE
          </button>
   
        </div>
    </div>
  )
}

export default CartScreen