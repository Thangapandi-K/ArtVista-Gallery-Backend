//import
const mongoose = require("mongoose");

//define user model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

//export
module.exports = mongoose.model('User', userSchema, 'users');
  