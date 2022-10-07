const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: ['true', 'Please provide user']
	},
	recipeId: {
		type: String,
		required: true,
		unique: ['true', 'Please provide recipeID'],
	},
	title: {
		type: String,
		required: ['true', 'Please provide title'],
	},
	likes: {
		type: String,
		default: "0"
	},
	imageUrl: {
		type: String,
		required: ['true', 'Please provide photo url of recipe'],
	},
	ingredients: [{
		type: String,
		required: ['true', 'Please provide ingredients of recipe'],
	}]
});

module.exports = mongoose.model('Saved', savedSchema);