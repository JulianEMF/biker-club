import axios from 'axios';
import {
LIST_PRODUCTS_REQUEST,
LIST_PRODUCTS_SUCCESS,
LIST_PRODUCTS_FAIL,
PRODUCT_CREATE_REQUEST,
PRODUCT_CREATE_SUCCESS,
PRODUCT_CREATE_FAIL,
PRODUCT_UPDATE_REQUEST,
PRODUCT_UPDATE_SUCCESS,
PRODUCT_UPDATE_FAIL,
PRODUCT_DELETE_REQUEST,
PRODUCT_DELETE_SUCCESS,
PRODUCT_DELETE_FAIL,
USER_LIST_REQUEST,
USER_LIST_SUCCESS,
USER_LIST_FAIL,
USER_DELETE_REQUEST,
USER_DELETE_SUCCESS,
USER_DELETE_FAIL,
ORDER_LIST_REQUEST,
ORDER_LIST_SUCCESS,
ORDER_LIST_FAIL,
} from '../constants/adminConstants';

export const listAllProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try{
        dispatch({ type: LIST_PRODUCTS_REQUEST });
        const { data } = await axios.get(`/products/allproducts?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: LIST_PRODUCTS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    };
};

// export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
//     try{
//         dispatch({ type: "PRODUCT_LIST_REQUEST" });
//         const { data } = await axios.get(`/api/admin/products?keyword=${keyword}&pageNumber=${pageNumber}`);
//         dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data });
//     }catch(error){
//         dispatch({type: "PRODUCT_LIST_FAIL", payload: error.response && error.response.data.message ? error.response.data.message : error.message })
//     };
// };

export const createProduct = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/products/create`, {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// export const addProduct = (product) => async (dispatch, getState) => {
//     try{
//         dispatch({
//             type: CREATE_PRODUCT_REQUEST
//         });
        
//         const { userLogin: { userInfo }} = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.post(`/api/admin/addProduct`, product, config);

//         dispatch({
//             type: CREATE_PRODUCT_SUCCESS,
//             payload: data
//         });

//     }catch(error){
//         dispatch({
//             type: CREATE_PRODUCT_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }

export const updateProduct = (product) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/products/editproduct/${product._id}`, product, config);
        
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        });

    }catch(error){
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/products/deleteproduct/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        });

    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/user/getusers`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    }catch(error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/user/deleteuser/${id}`, config);

        dispatch({
            type: USER_DELETE_SUCCESS
        });

    }catch(error){
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_LIST_REQUEST
        });
        
        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/order/allorders`, config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}