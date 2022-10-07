const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	uuid: {
		type: String,
		required: true,
		unique: ['true', 'Please provide user uuid']
	},
	username: {
		type: String,
		required: true,
		maxlength: [40, 'Username must be less than 40 characters'],
		unique: ['true', 'Please provide user username']
	},
	imageUri: {
		type: String,
		default: "male"
	},
	email: {
		type: String,
		required: true,
		validate: [validator.isEmail, 'Please enter the email in the correct format'],
		unique: ['true', 'Please provide user email']
	},
	role: {
		type: String,
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);