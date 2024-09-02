//import
const Cart = require('../models/cartModel');

const cartController = {

    addToCart: async (request, response) => {

        try {
             //get the user id from the request
             const userId = request.userId;

            // get the product id from the request params
            const { product: { _id, title, price, image} } = request.body;

            //add to cart
            const cart = await Cart.findOne({ user: userId });
            
            //if cart not exists
            if(!cart) {

                const newCart = new Cart({

                    user: userId,

                    products: [
                        { 
                            product: {
				                productId: _id,
                                title: title,
                                price: price,
                                image: image,
                                user: userId
                            }  
                        }
                    ]

                });

                await newCart.save();

                return response.status(201).send({ message: "Painting Added To Cart" });

            }
            //if cart already exists
            const productIndex = cart.products.findIndex(product => product.product.productId == _id);

            if(productIndex === -1) {

                cart.products.push({ product: {
		            productId: _id,
                    title: title,
                    price: price,
                    image: image,
                    user: userId
                } });

                await cart.save()

                return response.status(201).json({ message: "Painting Added To Cart"})

            } else {

            return response.status(201).json({ message: "This Painting Already Added To Cart"})
            
            }
            
        } catch (error) {

            response.status(500).send({ message: error.message });

        }
    },
    getCart: async (request, response) => {

        try {
            //get user id from the request
            const userId = request.userId;
            
            //get cart
            const cart = await Cart.findOne({ user: userId })

            //if cart not exists
            if(!cart) {
                return response.status(200).json({ cart: [] });
            }

            //if cart exists, response message
            return response.status(200).json({ cart: cart.products })

        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },
        getAllCart: async (request, response) => {
            try {
                //get all cart
                const allCart = await Cart.find().populate('products.product.user', 'name email', 'User');

      const carts = []

                allCart.map(item => {
                    const {products} = item;
                    
                    products.map(prod => {

                        const { product} = prod;
                        
                        carts.push(product);
                    })

                })

                

                return response.status(200).json({ carts: carts })

            } catch (error) {
                response.status(500).send({ message: error.message });
            }
    },
    removeProduct: async (request, response) => {
        try {

            //get the user id from request object
            const userId = request.userId;

            //get the product id from request parameters
            const productId = request.params.id;

            //get cart
            const cart = await Cart.findOne({ user: userId });

            //if cart not exists
            if(!cart) {

                return response.status(404).json({ message: 'Cart not found'});
            }

            //if cart exists
            const productIndex = cart.products.findIndex(product => product._id == productId);

            //if no product in the cart
            if(productIndex == -1) {

                return response.status(404).json({ message: "Product not found in cart"});

            };

            cart.products.splice(productIndex, 1)

            if (cart.products.length === 0) {

                await Cart.findOneAndDelete({ user: userId })

                return response.status(200).send({ message: "Painting Removed From Cart Successfully"})

            }

            await cart.save();

            response.status(200).send({ message: "Painting Removed From Cart Successfully"})

        } catch (error) {
            response.status(500).send({ message: error.message });
        }

    },
    deleteCart: async (request, response) => {
            try {
                //get user id from the request
                const userId = request.userId;

                //find cart by id and delete
                await Cart.findOneAndDelete({ user: userId });

                response.status(200).send({ message: "Cart Deleted Successfully"})

            } catch (error) {
                response.status(500).send({ message: error.message });
            }
    }
};

//export
module.exports = cartController;