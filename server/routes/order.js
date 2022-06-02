const express = require('express');
const { addOrder, getMyOrders, checkout, getOrderById, updateOrderToPaid, updateOrderProductToReviewed, getOrders } = require('../controllers/order.js');
const { protect, admin } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/add', protect, addOrder);

router.post('/checkout', protect, checkout);

router.put('/checkout/success/:orderId', protect, updateOrderToPaid);

router.get('/allorders', getOrders);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/product-reviewed', protect, updateOrderProductToReviewed);

module.exports = router;