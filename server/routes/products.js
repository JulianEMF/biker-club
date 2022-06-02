const express = require('express');
const { getProductDetails, getCategory, getProducts, createProductReview, getAllProducts, deleteProduct, createProduct, updateProduct } = require('../controllers/product.js');
const { protect, admin } = require('../middleware/authMiddleware.js');
const router = express.Router();

// @desc Get search products
// @route GET /products/search
router.get('/search', getProducts); 

// @desc Get products of a specific category
// @route GET /products/categories/:category
router.get('/categories/:category', getCategory);

router.get('/allproducts', getAllProducts);

// @desc Edit Product
// @route GET /admin/manage-products/edit/:id
router.get('/:id', getProductDetails); 

router.post('/create', protect, admin, createProduct);

router.put('/editproduct/:id', protect, admin, updateProduct);

router.post('/:id/review', protect, createProductReview);

router.delete('/deleteproduct/:id', protect, admin, deleteProduct)


module.exports = router;