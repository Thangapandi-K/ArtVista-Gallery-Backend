//import
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const User = require('../models/userModel');

//protected routes

const auth = {
    requireSignIn: async (request, response, next) => {  
        try {
            //get the token from request cookies
        const token = request.cookies.token;

        //return error if token not exists
        if(!token) {
            response.status(404).send({ message: "Access Denied !!!"});
        };

            try {
                const decode = jwt.verify(token, SECRET_KEY);

                request.userId = decode.id;

                next();

            } catch (error) {
                return response.status(401).send({ message: "Invalid Token !!!" });
            }

        } catch (error) {
            response.send({ message: error.message});
        }    
    },
    isAdmin: async (request, response, next) => {
        try {
            //get user id from the request object
            const userId = request.userId;

            //find the user from the database
            const user = await User.findById(userId);

            //return error if the user is not found
            if(!user) {
                return response.send({ message: "User not found"});
            };

            //return error if user is not admin
            if(user.role !== 'admin') {
                return response.send({ message: "Not Authorised"})
            };

            next();

        } catch (error) {
            response.send({ message: error.message});
        }
    }
}

//export
module.exports = auth;