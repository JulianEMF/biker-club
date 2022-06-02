import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Footer from '../components/Footer';
import Product from '../components/Product';
import '../css/main.css';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const { keyword  } = useParams();
    const { pageNumber } = useParams();
  
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages, query } = productList;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const [results, setResults] = useState([]);
    const [sortBy, setSortBy] = useState([]);

    useEffect(() => {
        setResults(products);
        console.log(products);
      }, [products]);
    
      useEffect(()=> {
          if(keyword) {
            dispatch(listProducts(keyword, pageNumber));
          }
    }, [dispatch, keyword, pageNumber]);
    
      const sortProductsBy = (e) => {
        setSortBy(e.target.value);
        switch(e.target.value) {
            case "price-asc":
                setResults(results.sort((a, b) => {
                    return a.price - b.price;
                }));
                break;
            case "price-desc":
                setResults(results.sort((a, b) => {
                    return b.price - a.price;
                }))
                break;
            case "brand":
                setResults(results.sort((a, b) => {
                    return a.brand.localeCompare(b.brand);
                }))
                break;
            case "arrival":
                setResults(results.sort((a, b) => {
                    return a.updatedAt.localeCompare(b.updatedAt);
                }))
                break;
            case "rating":
                setResults(results.sort((a, b) => {
                    return b.rating - a.rating;
                }))
                break;
            default:
                console.log("is default case")
        }
    }

  return (
    <>
        <div className="main-content">
            <h1>Welcome to Biker Club{userInfo && `, ${userInfo.name}`}</h1>

            {loading ? <h2>...Loading...</h2> : error ?( <p>{error}</p>) :
                <>
                    {products.length > 0 && (
                        <div>
                            <form>
                                <label htmlFor="select">Sort by: </label>
                                <select onChange={sortProductsBy}>
                                    <option value="sort-by">Sort by:</option>
                                    <option value="price-asc">Sort by Price: Low To High</option>
                                    <option value="price-desc">Sort by Price: High To Low</option>
                                    <option value="brand">Sort by Brand</option>
                                    <option value="arrival">Sort by Newest</option>
                                    <option value="rating">Sort by Rating</option>
                                </select>
                            </form>
                        </div>
                    )}
                    <div className="horizontal">
                        {products.length > 0 ? products.map(product => (
                            <div key={product._id} >
                              <Product product={product} />
                            </div>
                        )) : "Regular stuff"} 
                    </div>
                    <h3>{(query && products.length === 0) && "...No results"}</h3>
                    <Paginate pages={pages} page={page} keyword={query ? query : ''}/> 
                </>
            }
        </div>
        <Footer />
    </>
  )
}

export default HomeScreen;