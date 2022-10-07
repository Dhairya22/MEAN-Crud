const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/youtube')
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error !!", err);
        process.exit();
    });;