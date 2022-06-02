const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const generateToken = require('../token/generateToken.js');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

exports.addOrder = asyncHandler(async(req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        // paymentMethod, 
        itemsPrice, 
        // taxPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error("No order items")
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            // paymentMethod, 
            itemsPrice, 
            // taxPrice, 
            shippingPrice, 
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

exports.checkout = asyncHandler(async(req, res, next) => {
    const products = req.body;
    // It creates a session that then will be passed to the view
    return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: products.map(p => {
        return {
        name: p.name,
        description: "Something good",
        amount: p.price * 100,
        currency: 'usd',
        quantity: p.qty
        };
    }),
    // success_url: req.protocol + '://' + req.get('host') + '/',
    success_url: req.protocol + '://' + "localhost:3000" + '/checkout/success',
    cancel_url: req.protocol + '://' + "localhost:3000" + '/checkout/cancel'
    }).then(session => {
        res.json({ url: session.url })
    })
    .catch(err => {
    //   const error = new Error(err);
    //   error.httpStatusCode = 500;
    //   return next(error);
        console.error(err.message);
    });
});

exports.updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.pendingReviews = true
        // order.paymentResult = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.payer.email_address
        // }

        const updatedOrder= await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

exports.getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

exports.getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

exports.updateOrderProductToReviewed = asyncHandler(async(req, res) => {
    const { productId } = req.body;
    const order = await Order.findById(req.params.id);

    if(order){
        const productToUpdate = order.orderItems.find(p => {
            return p.product == productId;
        })
        console.log("Product to update is", productToUpdate)
        productToUpdate.isReviewed = true;

        const updatedOrder= await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

exports.getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});