import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, resetListProducts } from '../actions/productActions';
import "../css/searchbox.css";


const SearchBox = () => {
    const { keyword  } = useParams();
    const { pageNumber } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(query.trim()){
            // navigate(`/search/${query}`);
            switch (query.toLowerCase().trim()) {
                case "helmet":
                    navigate(`/categories/${"helmets"}`);
                    break;
                case "helmets":
                    navigate(`/categories/${"helmets"}`);
                    break;
                case "jacket":
                    navigate(`/categories/${"jackets"}`);
                break;
                case "jackets":
                    navigate(`/categories/${"jackets"}`);
                    break;
                case "glove":
                    navigate(`/categories/${"gloves"}`);
                break;
                case "gloves":
                    navigate(`/categories/${"gloves"}`);
                    break;
                case "pants":
                    navigate(`/categories/${"pants"}`);
                    break;
                default:
                    console.log("looking for: ", query)
                dispatch(listProducts(query, pageNumber));
                navigate('/');
            }
        } else {
            dispatch(resetListProducts());
            navigate('/');
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="horizontal height">
        <input type="text" name="q" onChange={(e) => setQuery(e.target.value)} placeholder="Search Products..." />
        <button type="submit">Search</button>
    </form>
  )
};

export default SearchBox;