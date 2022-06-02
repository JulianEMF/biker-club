import React, { useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import { useNavigate } from 'react-router';
import { listAllProducts, deleteProduct, createProduct } from '../actions/adminActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
    
    let { pageNumber } = useParams();
    (pageNumber === undefined) && (pageNumber = 1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productListAll);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(()=> {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if(!userInfo.isAdmin){
            navigate('/login');
        } if (successCreate) {
            navigate(`/admin/productedit/${createdProduct._id}`)            
        } else {
            dispatch(listAllProducts('', pageNumber));
        }
    // }, [dispatch, userInfo, navigate, successDelete, successCreate, createdProduct, pageNumber]);
}, [dispatch, userInfo, navigate, pageNumber, successDelete, successCreate,  createdProduct]);

    const onDeleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
            dispatch(deleteProduct(id));
        } 
    }

    const onCreateProductHandler = () => {
        dispatch(createProduct());
        // navigate('/admin/editproduct');
    }

    return (
        <>
            <h1>Products</h1>
            <button onClick={onCreateProductHandler}>CREATE PRODUCT</button>            
            {loadingDelete && "... Loading ..."}
            {errorDelete && "error"}
            {loading ? " .. Loading .." : error ? "Error" : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <div className="horizontal">
                                            <Link to={'/admin/editproduct/${product._id'}>Edit</Link>
                                            <button onClick={()=> onDeleteHandler(product._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
  )
};

export default ProductListScreen;