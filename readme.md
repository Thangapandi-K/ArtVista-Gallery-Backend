# ArtVista Gallery - CapeStone Project - Back End

- **ArtVista Gallery** is a WebApplication where an Admin can Sell & Users can Buy Unique Paintings.

- This web project is built using **MERN Stack**

    - The MERN stack is a collection of JavaScript-based technologies that are used together to develop web applications. The stack consists of MongoDB, Express, React, and Node.js 

    1. **MongoDB**
        -  a highly scalable document database that makes it easy to store and retrieve data in JSON documents 

    2. **Express JS**
        - a lightweight web application framework that provides a range of app-building tools and supports a variety of programming languages, including JavaScript.

    3. **React JS**
        - an open source, front-end JavaScript library for building user interfaces based on components

    4. **Node JS**
        - a runtime environment that can be used to run JavaScript code on the server side. This allows developers to use the same language for both the front and back ends of their applications.

**For Backend** I have use **NodeJs** (Javascript runtime environment) to build the backend for the web application.

In addition to NodeJS, i also used **npm**, a default package manager for the Javascript runtime environment and some third-party packages in this project as follows

- **ExpressJs**
    -  *Express Js* a backend web application framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features.

- **Mongoose**
    - *Mongoose* is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment

- **Dotenv**
    - *Dotenv* centralizes your configuration management into one file

- **cookie-parser**
    - *cookie-parser* is middleware that simplifies handling cookies. It parses incoming cookies from client requests and makes them accessible in the request. cookies object. This makes it easier to read and manipulate cookies in your Express JS application without manual parsing.

- **JSON Web Token (JWT)**
    - A *JSON web token(JWT)* is JSON Object which is used to securely transfer information over the web(between two parties). It can be used for an authentication system and can also be used for information exchange.

- **Bcrypt**
    - *Bcrypt* is a popular npm package utilized for password hashing within Node. js applications. This package ensures a secure method for safeguarding user passwords, encrypting them before storage in a database.

- **Multer**
    - *Multer* is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.

- **Stripe**
    - *Stripe* is a payment service provider that lets merchants accept credit and debit cards or other payments.


Here the above packages has been used in the project to build the backend functionalities of the project. And they were used to

- create a Model Schema for the datas we store in the database.

- defining routes for every request that are made from front end.

- create route controllers that receives, process and respond to every request it receives and also handle errors in the application

- securely hashing passwords created by users

- controling authentications and authorizations for the users based on their roles.