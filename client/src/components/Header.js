import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { resetListProducts } from '../actions/productActions';
import SearchBox from '../components/SearchBox';
import '../css/header.css';
import logo from '../images/logo.svg';
import Dropdown from './Dropdown';

const Header = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    const onLogoutHandler = () => {
      dispatch(logout());
      navigate("/");
    };
  
    const onResetHomeScreen = () => {
      dispatch(resetListProducts());
    }

  return (
    <div className="vertical">
        <div className="horizontal">
            <Link to="/" className="img-container" onClick={onResetHomeScreen}>
                <img src={logo} alt="Biker club logo"/>
            </Link>
            <div className="horizontal">
              <SearchBox />
              {userInfo ? <p onClick={onLogoutHandler}>Logout</p> : <Link to="/login">Login</Link>} 
              {userInfo && <Link to="/user">User</Link>}
              {/* {userInfo && userInfo.isAdmin && <Link to="/"} */}
              {userInfo && userInfo.isAdmin && <Dropdown elements={[{link: "admin/userlist", name: "Users"}, {link:"admin/orderlist", name: "Orders"}, {link:"admin/productlist", name:"Products"}]}/>}
              <Link to="/cart">Cart</Link>
            </div>
        </div>

        <div className="horizontal">
            <Link to ="/">Brands</Link>
            <Link to ="/">Helmets</Link>
            <Link to ="/">Jackets</Link>
            <Link to ="/">Gloves</Link>
            <Link to ="/">Boots</Link>
            <Link to ="/">Pants</Link>
            <Link to ="/">Goggles</Link>
            <Link to ="/">Casual</Link>
            <Link to ="/">Sale</Link>
        </div>
    </div>
  )
}

export default Header