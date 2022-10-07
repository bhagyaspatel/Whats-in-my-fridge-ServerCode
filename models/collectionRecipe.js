const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: ['true', 'Please provide user']
	},
	collectionName: {
		type: String,
		required: ['true', 'Please provide name of collection'],
		enum: {
			values: ["dessert", "veg", "nonveg", "fastfood"],
			message: "Please select the proper collection name"
		}
	},
	recipeList: [
		{
			aggregateLikes: {
				type: Number,
				required: ['true', 'Please provide total like counts']
			},
			id: {
				type: Number,
				required: ['true', 'Please provide recipe id']
			},
			image: {
				type: String,
				required: ['true', 'Please provide an image'],
			},
			instructions: {
				type: String,
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
			extendedIngredients: [{
				type: String,
				required: ['true', 'Please provide ingredients'],
			}],
		}
	]
});

module.exports = mongoose.model('Collection', collectionSchema);