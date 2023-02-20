const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    yearOfPublication: String,
	isInTheaters:Boolean
});

module.exports = mongoose.model('Movie', movieSchema);