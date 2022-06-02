import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { listProducts, resetListProducts, listProductsByCategory } from '../actions/productActions';
import SearchBox from '../components/SearchBox';
import '../css/header.css';
import logo from '../images/logo.svg';
import Dropdown from './Dropdown';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const { pageNumber } = useParams();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [category, setCategory] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");

    useEffect(()=>{
        if (category) {
            dispatch(listProductsByCategory(category, pageNumber));
            setCurrentCategory(category);
        }
      }, [dispatch, category]);

    const onSelectCategory = (category) => {
      setCategory(category);
      navigate('/');
    }

    const onLogoutHandler = () => {
      dispatch(logout());
      navigate("/");
    };
  
    const onResetHomeScreen = () => {
      dispatch(resetListProducts());
    };

  return (
    <div className="vertical">
        <div className="horizontal">
            <Link to="/" className="img-container" onClick={onResetHomeScreen}>
                <img src={logo} alt="Biker club logo"/>
            </Link>
            <div className="horizontal">
              <SearchBox />
              {userInfo ? <p onClick={onLogoutHandler}>Logout</p> : <Link to="/login">Login</Link>} 
              {userInfo && <Link to="/user">{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}</Link>}
              {/* {userInfo && userInfo.isAdmin && <Link to="/"} */}
              {userInfo && userInfo.isAdmin && <Dropdown elements={[{link: "admin/userlist", name: "Users"}, {link:"admin/orderlist", name: "Orders"}, {link:"admin/productlist", name:"Products"}]}/>}
              <Link to="/cart">Cart</Link>
            </div>
        </div>

        <div className="horizontal">
          <ul className="horizontal">
            <li>Brands</li>
            <li onClick={() => onSelectCategory("helmets")}>Helmets</li>
            <li onClick={() => onSelectCategory("jackets")}>Jackets</li>
            <li onClick={() => onSelectCategory("gloves")}>Gloves</li>
            <li onClick={() => onSelectCategory("boots")}>Boots</li>
            <li onClick={() => onSelectCategory("pants")}>Pants</li>
            <li onClick={() => onSelectCategory("goggles")}>Goggles</li>
            <li onClick={() => onSelectCategory("casual")}>Casual</li>


            {/* <li onClick={() => setCategory("helmets")}>Helmets</li>
            <li onClick={() => setCategory("jackets")}>Jackets</li>
            <li onClick={() => setCategory("gloves")}>Gloves</li>
            <li onClick={() => setCategory("boots")}>Boots</li>
            <li onClick={() => setCategory("pants")}>Pants</li>
            <li onClick={() => setCategory("goggles")}>Goggles</li>
            <li onClick={() => setCategory("casual")}>Casual</li> */}
            <li>Sale</li>
          </ul>
        </div>
    </div>
  )
}

export default Header