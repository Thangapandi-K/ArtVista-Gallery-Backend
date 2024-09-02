const mongoose = require('mongoose')

//define product model
const productSchema = new mongoose.Schema({
    title: String,
    artist: String,
    description: String,
    price: Number,
    image: {
        type: String,
        default: 'download.jpeg'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

//export
module.exports = mongoose.model('Product', productSchema, 'products');