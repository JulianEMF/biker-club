import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getProductDetails } from '../actions/productActions';
import { updateProduct } from '../actions/adminActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch();

    const { id } = useParams();
    // const productId = id;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("jackets");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);


    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    
    useEffect(()=>{
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== id) {
                dispatch(getProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setDescription(product.description);
                setCategory(product.category);
                setCountInStock(product.countInStock);
            }
        }
        
    }, [product, dispatch, id, successUpdate, navigate])
    
    
    const onUploadImageHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/upload', formData, config);
            setImage(data);
            setUploading(false);
        }catch(error){
            setUploading(false);
        }
    }
    
    // const onSubmitHandler = (e) => {
    // e.preventDefault();
    // dispatch(addProduct({
    //     name,
    //     image,
    //     brand,
    //     category,
    //     description,
    //     price,
    //     countInStock
    // }))
    // navigate('/admin/productlist');    
    // };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }));
    };

  return (
      <>
       <Link to='/admin/productlist' >Go Back</Link>

        {id ? <h1>Edit Product</h1> : <h1>Create Product</h1>}
        {loadingUpdate && ".. Loading .."}
        {errorUpdate && "Error Updating"}
        {loading ? " ... Loading ... " : error ? "Error" : (
            <form onSubmit={onSubmitHandler} className="vertical">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input type="text" name="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />

                <label htmlFor="name">Image</label>
                <input type="text" placeholder="Image Url" value={image} onChange={(e) => setImage(e.target.value)} />
                <input type="file" name="name" label="Choose file" onChange={onUploadImageHandler} />
                {uploading && "... Loading ..."}

                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} />

                <label htmlFor="countInStock">Count in Stock</label>
                <input type="text" name="countInStock" placeholder="Enter count in stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />

                <label htmlFor="category">Category</label>
                <input type="text" name="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <button type="submit">{id ? "UPDATE PRODUCT" : "CREATE PRODUCT"}</button>
            
            </form>
        )}
    </>
  )
};

export default ProductEditScreen;