const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        productId: String,
        title: String,
        price: Number,
        image: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    status: {
        type: String,
        enum: ['Order Placed', 'Item Dispatched', 'Item Delivered', 'Order Cancelled'],
        default: 'Order Placed'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

//export
module.exports = mongoose.model('Order', orderSchema, 'orders');