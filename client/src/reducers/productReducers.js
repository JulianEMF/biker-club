import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_FAIL,
    RESET_PRODUCT_LIST_REQUEST,
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
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
 } from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages, 
                page: action.payload.page,
                query: action.payload.query 
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case RESET_PRODUCT_LIST_REQUEST:
            return { loading: false, products: []}
        default:
            return state;
    }
}

export const productsByCategoryReducer = (state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCT_BY_CATEGORY_REQUEST:
            return { 
                loadingCategory: true, 
                products: [] 
            }
        case PRODUCT_BY_CATEGORY_SUCCESS:
            return { 
                loadingCategory: false, 
                resultsCategory: action.payload.products,
                pagesCategory: action.payload.pages, 
                pageCategory: action.payload.page 
            }
        case PRODUCT_BY_CATEGORY_FAIL:
            return { 
                loadingCategory: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}

export const getProductDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productReviewCreateReducer = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return { }
        default:
            return state;
    }
}

