//import
const mongoose = require('mongoose');

//define cart model
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [
        {
            product: {
                productId: String,
                title: String,
                price: Number,
                image: String,
                quantity: {
                    type: Number,
                    default: 1
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            },

        }
    ]
});

//export
module.exports = mongoose.model('Cart', cartSchema, 'carts');