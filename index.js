//import
const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URI, PORT } = require('./utils/config');

//connect to server
console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
.then(() =>{
    console.log("Connected to MongoDB.. !!!");

    //connect local server
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    })
})
.catch((error) => {
    console.log('Error connecting MongoDB', error);
})