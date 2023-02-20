const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
	age:Number,
	nationality: String
});

module.exports = mongoose.model('User', userSchema);