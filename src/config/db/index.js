const mongoose = require('mongoose');

function connect() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/web_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.log('Failed to connect to MongoDB!');
    }
}


module.exports = { connect }