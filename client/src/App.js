import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import OrderShippingScreen from './screens/OrderShippingScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';
import CheckoutSuccess from './screens/CheckoutSuccess';
import UserProfileScreen from './screens/UserProfileScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import ReviewProductScreen from './screens/ReviewProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/details/:id' element={<ProductDetailsScreen/>} />
        <Route path='/cart/:id' element={<CartScreen/>} />
        <Route path='/cart/' element={<CartScreen/>} />
        <Route path='/shipping' element={<OrderShippingScreen/>}/>
        <Route path='/order/:id' element={<OrderDetailsScreen/>}/>
        <Route path='/summary' element={<OrderSummaryScreen/>}/>
        <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
        <Route path='/review/:id' element={<ReviewProductScreen/>}/>
        <Route path='/user' element={<UserProfileScreen/>}/>
        <Route path='/admin/orderlist' element={<OrderListScreen/>} exact/>
        <Route path='/admin/userlist' element={<UserListScreen/>} exact/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>} exact/>
        <Route path='/admin/productlist' element={<ProductListScreen/>} exact/>
        <Route path='/admin/productedit/:id' element={<ProductEditScreen/>} />
        <Route path='/admin/productedit' element={<ProductEditScreen/>} />
        <Route path='/' element={<HomeScreen/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;
