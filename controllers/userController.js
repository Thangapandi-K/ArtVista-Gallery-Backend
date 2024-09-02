//import
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../utils/config');


const userController = {
    register: async (request, response) => {
        try {
            //get details from the request body
            const { name, email, password, address, phone } = request.body;

            //check if user already exists
            const user = await User.findOne({ email });

            //return error if user already exists
            if(user) {
                return response.status(200).send({ message: 'User already exists !'});
            };

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                address,
                phone
            });

            //save user
            const savedUser = await newUser.save();

            //response message
            response.status(201).send({ message: 'User created Successfully !', user: savedUser });

        } catch (error) {
            response.status(500).send({ message: error.message });
        }
    },
    login: async (request, response) => {
        try {
            //get details from the request body
            const { email, password } = request.body;

            //find user details in the dabase
            const user = await User.findOne({ email });

            //return error if user not exists in database
            if(!user) {
                return response.status(404).send({ message: 'User Not Found'});
            };

            //check password is correct
            const ispasswordCorrect = await bcrypt.compare(password, user.password);

            //return error if password is wrong
            if(!ispasswordCorrect) {
                return response.status(400).send({ message: "Invalid Password" });
            };

            //create token
            const token = jwt.sign({ id: user._id}, SECRET_KEY);

            //set a cookie with the token
            response.cookie('token', token, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) //24hrs from login 
            });

            //response message
            response.status(200).send({ message: "Login Successfull", user: user});

        } catch (error) {
            response.status(500).send({message: error.message});   
        }
    },
    logout: async (request, response) => {
        try {
            //clear cookie
            response.clearCookie("token", {
                path: '/',
                domain: '',
                httpOnly: true,
                sameSite: "None",
                secure: true
            });
            
            //response message
            response.status(200).send({ message: 'Logged Out Successfully !!'});

        } catch (error) {
            response.status(500).send({ message: error.message }); 
        }
    },
    checkAuth: async (request, response) => {
        try {
            //get the token from the request cookies
            const token = request.cookies.token;

            const userId = request.params.id;

            const user = await User.findById(userId);

            //return error if no token exists
            if(!token) {
                return response.status(401).send({ message: "Access denied" });
            };

            //verify the token
            try {
                jwt.verify(token, SECRET_KEY);

                return response.status(200).send({ message: user });

            } catch (error) {
               response.status(400).send({ message: "Invalid Token"}); 
            }
        } catch (error) {
            response.send({ message: error.message });
        }
    },
    getProfile: async (request, response) => {
        try {
            //get user id from the request object
            const userId = request.userId;

            //find the user by id in the database
            const userProfile = await User.findById(userId);

            //return error if the user not exists
            if(!userProfile) {
                return response.status(404).send({ message: "user not exists !!!"});
            }

            //response message
            response.status(200).send({ message: "User Profile", user: userProfile })
            
        } catch (error) {
            response.send({ message: error.message });
        }
    },
    getUsers: async (request, response) => {
        try {
            //get all users
            const users = await User.find();

            //reponse message
            response.status(200).send({users: users});

        } catch (error) {
            response.send({ message: error.message });
        }
    },
    deleteUser: async (request, response) => {
        try {
            //get user id from request
            const userId = request.params.id;

            //delete user
            const deleteUser = await User.findByIdAndDelete(userId);

            //response message
            response.status(200).send({ message: "User Deleted Successfully" });
            
        } catch (error) {
            response.send({ message: error.message });
        }
    },
    editProfile: async (request, response) => {
        try {
            //get user id from the request
            const userId = request.userId;

            //get details from the request body
            const { name, email, address, phone } = request.body;

            //find user
            const user = await User.findById(userId);

            if(!user) {
                return response.status(404).send({ message: "User not found"})
            }

            if(user) user.name = name;
            if(email) user.email = email;
            if(address) user.address = address;
            if(phone) user.phone = phone;

            const updatedUser = await user.save()

            response.status(200).send({ message: "Profile Updated", user: updatedUser })
            
        } catch (error) {
            response.send({ message: error.message });
        }
    }
};

//export
module.exports = userController;