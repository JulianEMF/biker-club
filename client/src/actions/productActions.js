import axios from 'axios';
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    RESET_PRODUCT_LIST_REQUEST,
    RESET_PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
 } from "../constants/productConstants";

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/products/search?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    };
};

export const resetListProducts = () => async(dispatch) => {
    try {
        dispatch({ type: RESET_PRODUCT_LIST_REQUEST });
    } catch (error) {
        dispatch({type: RESET_PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    };
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    console.log("creating review with id: ", productId)
    console.log("creating review with id: ", review)
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/products/${productId}/review`, review, config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        });

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}