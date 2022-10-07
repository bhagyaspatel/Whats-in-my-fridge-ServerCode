const mongoose = require('mongoose');

const createdSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: ['true', 'Please provide user']
	},
	recipeList: [
		{
			imageUrl: {
				type: String,
				required: ['true', 'Please provide an image'],
			},
			instructions: {
				type: String,
				required: ['true', 'Please provide instructions of recipe'],
			},
			summary: {
				type: String,
				required: ['true', 'Please provide summary'],
			},
			title: {
				type: String,
				required: ['true', 'Please provide title'],
			},
			vegan: {
				type: Boolean,
			},
			vegetarian: {
				type: Boolean,
			},
			readyInMinutes: {
				type: Number,
				required: ['true', 'Please provide time required']
			},
			servings: {
				type: Number,
				required: ['true', 'Please provide number of servings']
			},
			ingredients: {
				type: String,
				required: ['true', 'Please provide ingredients'],
			},
		}
	]
});

module.exports = mongoose.model('Created', createdSchema);