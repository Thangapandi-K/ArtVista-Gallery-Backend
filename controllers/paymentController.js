const Stripe = require('stripe');
const {STRIPE_SECRET_KEY} = require('../utils/config')

const paymentController = {
    
    handleCheckoutPayment: async (request, response) => {

        const stripe = new Stripe(STRIPE_SECRET_KEY);
    
        try {
    
            const data = request.body;
    
            if(!data) {
                return response.status(404).json({ message: 'No Items In Cart'});
            };
    
            if(!Array.isArray(data) || data.length === 0) {
                return response.status(400).send({error: "Product Not Found"})
            };
    
            const lineItems = data.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.product.title
                    },
                    unit_amount: Math.round(item.product.price * 100)
                },
                quantity: item.product.quantity
            }));
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${request.headers.origin}/user/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${request.headers.origin}/user/cart`
            });
    
            response.status(200).json({ sessionId : session.id })
    
        } catch (error) {
    
            response.status(500).send({ message: error })
            
        }
    }
};

module.exports = paymentController;