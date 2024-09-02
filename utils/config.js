require('dotenv').config();

MONGODB_URI = process.env.MONGODB_URI;
PORT = process.env.PORT;
SECRET_KEY = process.env.SECRET_KEY;
STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;


//export
module.exports = { MONGODB_URI, PORT, SECRET_KEY, STRIPE_SECRET_KEY };