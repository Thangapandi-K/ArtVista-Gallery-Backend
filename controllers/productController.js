//import
const Product = require('../models/productModel');

const productController = {

    addProduct: async (request, response) => {
        try {
            //get details from the request body
            const { title, artist, description, price, image } = request.body;

            if (!request.file) {
                return response.status(400).send({ message: 'Please upload an image' });
            }

            //create new product
            const newProduct = new Product({
                title,
                artist,
                description,
                price,
                image : request.file.filename 
            });
            //save product
            const savedproduct = await newProduct.save();
            //response message
            response.status(201).send({ message: "Painting Added Successfully", painting: savedproduct });
        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },

    viewAllProduct: async (request, response) => {
        try {
            //get all products
            const products = await Product.find();
            //reponse message
            response.status(200).json({ "products": products });
        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },

    deleteProduct: async (request, response) => {
        try {
            //get the product id from request parameters
            const productId = request.params.id;
            //find the prodcut by id and delete
            const deletedProduct = await Product.findByIdAndDelete(productId);

            const cartProductDelete = await Cart
            //return error if product not exits
            if(!deletedProduct) {
                response.status(404).send({ message: "Product Not Found" })
            }
            //rsponse message
            response.status(200).send({ message: "Product Deleted Successfully" })
        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },
    editDetails: async (request, response) => {
        try {
        //get product details from the body
        const { id, title, artist, description, price } = request.body; 

        const productId = id;

        //find the product by id
        const product = await Product.findById(productId);

        if(!product) {
            response.status(404).send({ message: 'Product Not Found'})
        }

        if(title) product.title = title;
        if(artist) product.artist = artist;
        if(description) product.description = description;
        if(price) product.price = price;

        const updatedProduct = await product.save();

        response.status(200).send({ message: 'Product Updated', product: updatedProduct })

        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }

};

//export
module.exports = productController;