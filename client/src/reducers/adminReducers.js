import {
    LIST_PRODUCTS_REQUEST,
    LIST_PRODUCTS_SUCCESS,
    LIST_PRODUCTS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
} from '../constants/adminConstants';

export const listAllProductsReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case LIST_PRODUCTS_REQUEST:
            return { loading: true, products: [] }
        case LIST_PRODUCTS_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products,
                pages: action.payload.pages, 
                page: action.payload.page 
            }
        case LIST_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productCreateReducer = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const updateProductReducer = (state = { product: {} }, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state;
    }
}

export const productDeleteReducer = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const orderListReducer = (state = { orders:[] }, action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return{
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state     
    }
}