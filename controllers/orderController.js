//import
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


const orderController = {

    placeOrder: async (request, response) => {

        try {

            //get userid from the request
            const userId = request.userId;
            
            const cart = await Cart.findOne({ user: userId })

            if(!cart) {
                return response.status(404).json({ message: 'No Items In Cart'});
            }

            //get products in the cart
            const { products } = cart

            products.map(
                async(product) => {

                    const newOrder = new Order({
                        user: userId,
                        product: {
                            productId: product.product.productId,
                            title: product.product.title,
                            price: product.product.price,
                            image: product.product.image,
                            user: userId
                        }
                    }
                )

                await newOrder.save()
                //after order placed delete the products ordered from the database(as paintings are single unique products)
                const produId = product.product.productId
                await Product.findByIdAndDelete(produId);
            })


            //after order placed delete the cart
            await Cart.findOneAndDelete({ user: userId })
            

            return response.status(200).send({message: "Order Created Successfully"});
            
        } catch (error) {
            response.status(500).send({ message: error })
        }
    },
    getOrder: async (request, response) => {
        try {
            //get userid from request
            const userId = request.userId;
            //get order details of the user using userId
            const orders = await Order.find({ user: userId })

        if(!orders) {
            return response.status(200).json({ orders: [] });
        }

        const produc = []
    
        orders.map(item => {
                produc.push(item)
            })

            //response message
            return response.status(200).json({ order: produc })

        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },
    getAllOrders: async(request, response) => {
        try {
            //get all order details in the database (for admin)
            const allOrders = await Order.find().populate('product.user', 'name email address phone', 'User');

            const produc = []
    
            allOrders.map(item => {
                    produc.push(item)
            }) 

            response.status(200).json({ orders: produc });

        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },
    updateOrder: async (request, response) => {
        try {

            const { ordStatus, ordId} = request.body; 

            const order = await Order.findById(ordId)

            if(!order) {
                return response.status(404).send({ message: "Order not found"})
            }

            if(order) order.status = ordStatus;

            const updatedOrder = await order.save();
    

        response.status(200).send({message: 'Order Updated', product: updatedOrder})
            
        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    }
    
};

//export
module.exports = orderController;