// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    pendingReviews: {
        type: Boolean,
        required: true,
        default: false
    },
    // resetToken: String,
    // resetTokenExpiration: Date,
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }, 
            quantity:{ 
                type: Number,
                required: true
            }
        }]
    }
}, {
    timestamps: true
    }
);

// Password validation through mongoose own method. Returns a boolean
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// The .pre middleware will verify if the password changed
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);

