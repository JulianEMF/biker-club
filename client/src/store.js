import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userRegisterReducer, userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { productListReducer, getProductDetailsReducer, productReviewCreateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderPayReducer, updateOrderToPaidReducer, orderListMyReducer, orderDetailsReducer, updateOrderProductToReviewedReducer } from './reducers/orderReducers';
import { orderListReducer, userListReducer, userDeleteReducer, listAllProductsReducer, productDeleteReducer, updateProductReducer, productCreateReducer } from './reducers/adminReducers';


// Store reducer
const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productList: productListReducer,
    productListAll: listAllProductsReducer,
    productCreate: productCreateReducer,
    productDetails: getProductDetailsReducer,
    productReview: productReviewCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: updateProductReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderPay: orderPayReducer,
    orderUpdateToPaid: updateOrderToPaidReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,    
    updateOrderProductToReviewed: updateOrderProductToReviewedReducer
});

// Fetch initial data from local storage
const cartItemsFromStorage = localStorage.getItem('bikerClubCartItems') ? JSON.parse(localStorage.getItem('bikerClubCartItems')) : [];
const userInfoFromStorage = localStorage.getItem('bikerClubUserInfo') ? JSON.parse(localStorage.getItem('bikerClubUserInfo')) : "";
const shippingAddressFromStorage = localStorage.getItem('bikerClubShippingAddress') ? JSON.parse(localStorage.getItem('bikerClubShippingAddress')) : {};
const lastOrderFromStorage = localStorage.getItem('bikerClubOrder') ? JSON.parse(localStorage.getItem('bikerClubOrder')) : {};

// Store initial state
const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { 
        userInfo: userInfoFromStorage
    },
    orderPay: {
        lastOrder: lastOrderFromStorage
    }
};

// Store middleware
const middleware = [thunk];

// Store creation and configuration
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;