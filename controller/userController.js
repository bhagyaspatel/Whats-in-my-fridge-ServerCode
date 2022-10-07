const User = require('../models/user');
const Saved = require('../models/savedRecipe');
const Collection = require('../models/collectionRecipe');
const Created = require('../models/createdRecipe');
const BigPromise = require('../middleware/bigPromise');
const customErrors = require('../utils/customErrors');

exports.signup = BigPromise(async (req, res, next) => {
	const { uuid, username, email } = req.body;

	if (!uuid || !username || !email) {
		return next(new customErrors(401, 'Please provide all the required details'));
	}

	const isExist = await User.findOne({ uuid });

	if (isExist) {
		return next(new customErrors(401, 'User already exist'));
	}

	const user = await User.create({
		uuid,
		username,
		email
	});

	console.log(user);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'User created successfully'
	}));

});

exports.updateUserDetail = BigPromise(async (req, res, next) => {
	const { uuid, username, imageUri } = req.body;
	console.log("updateUserDetail called");

	if (!uuid || !(username || imageUri)) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	let user = await User.findOne({ uuid });

	if (!user) {
		return next(new customErrors(401, 'No such user exist'));
	}

	const userDetail = {
		username: username,
		imageUri: imageUri
	};

	const options = {
		new: true,
		runValidators: true
	};

	user = await User.findOneAndUpdate({ uuid }, userDetail, options);
	console.log(user);
	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Username updated successfully'
	}));
});

exports.addToSaved = BigPromise(async (req, res, next) => {
	console.log('Save recipe called');
	console.log(req.body);

	const { saveRecipe } = req.body;
	console.log(saveRecipe);

	const { recipeId, title, imageUrl, uuid, ingredients, likes } = saveRecipe;

	if (!recipeId || !title || !imageUrl || !uuid || !ingredients) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	const user = await User.findOne({ uuid });

	if (!user) {
		res.status(401).send(JSON.stringify({
			success: false,
			message: "User does not exist"
		}));
	}

	const isSavedBefore = await Saved.findOne({ user, recipeId });

	if (isSavedBefore) {
		res.status(401).send(JSON.stringify({
			success: false,
			message: "Item already has been saved before"
		}));
	}

	const newRecipe = {
		user,
		recipeId,
		title,
		likes,
		imageUrl,
		ingredients
	};

	const recipe = await Saved.create(newRecipe);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Recipe saved successfully'
	}));
});

exports.addToCollection = BigPromise(async (req, res, next) => {
	console.log("add to collection called");

	const { recipeId, uuid, collectionName, aggregateLikes, imageUrl,
		instructions, summary, title, vegan, vegetarian,
		readyInMinutes, servings, extendedIngredients } = req.body.recipe;

	if (!recipeId || !collectionName || !imageUrl || !uuid || !aggregateLikes || !title || !extendedIngredients) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	const isVegan = (vegan === 'true');
	const isVeg = (vegetarian === 'true');

	const user = await User.findOne({ uuid });

	if (!user) {
		res.status(401).send(JSON.stringify({
			success: false,
			message: "User does not exist"
		}));
	}

	// const isSavedBefore = await Collection.findOne({ user, id: recipeId });

	// console.log(isSavedBefore);

	// if (isSavedBefore) {
	// 	res.status(401).send(JSON.stringify({
	// 		success: false,
	// 		message: "Item already has been saved in collection before"
	// 	}));
	// }

	const collection = await Collection.findOne({ user, collectionName });

	const newRecipe = {
		aggregateLikes, id: recipeId, image: imageUrl, instructions, summary,
		title, vegan: isVegan, vegetarian: isVeg, readyInMinutes, servings, extendedIngredients
	};

	console.log(extendedIngredients);
	console.log(typeof extendedIngredients); //string
	console.log(newRecipe);

	// let recipeList;

	// if (collection != null) {
	// 	console.log("collection exist with name ", collectionName);
	// 	recipeList = [...collection.recipeList, newRecipe];
	// }
	// else {
	// 	console.log("no previous collection with this name");
	// 	recipeList = [newRecipe];
	// }

	const newCollectinRecipe = {
		user,
		collectionName,
		recipeList: [newRecipe]
	};

	const recipe = await Collection.create(newCollectinRecipe);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Recipe saved successfully',
	}));

});

exports.getSavedRecipes = BigPromise(async (req, res, next) => {
	const { uuid } = req.body;

	const user = await User.findOne({ uuid });
	// console.log(user);

	if (!user) {
		res.status(401).send(JSON.stringify({
			success: false,
			message: "User does not exist",
		}));
	}

	const savedRecipes = await Saved.find({ user });

	// console.log("savedRecipes ", savedRecipes);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'saved recipes',
		savedRecipes
	}));
});

exports.getCollectionRecipe = BigPromise(async (req, res, next) => {
	// console.log("Get collection recipe called");
	const { uuid, collectionName } = req.body;

	if (!collectionName || !uuid) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	const user = await User.findOne({ uuid });

	if (!user) {
		return next(new customErrors(401, 'Please create an account first'));
	}

	// console.log(user + " " + collectionName);
	const collectionRecipeList = await Collection.find({ user, collectionName });

	// console.log("collection recipe ", collectionRecipeList);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Collection recipes fetched',
		collectionRecipeData: collectionRecipeList
	}));
});

exports.getUserDetail = BigPromise(async (req, res, next) => {

	// console.log("get user detail called", req.body);

	const { uuid } = req.body;

	const user = await User.findOne({ uuid });

	console.log(user);

	if (!user) {
		return next(new customErrors(401, 'Please create an account first'));
	}

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'User details fetched successfully',
		username: user.username,
		imageUri: user.imageUri
	}));
});

exports.createRecipe = BigPromise(async (req, res, next) => {
	console.log("create recipe called");

	const { uuid, imageUrl, instructions, summary, title, vegan, vegetarian,
		readyInMinutes, servings, ingredients } = req.body.createdRecipe;

	if (!imageUrl || !uuid || !title || !ingredients || !instructions) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	console.log(imageUrl);

	const user = await User.findOne({ uuid });

	if (!user) {
		res.status(401).send(JSON.stringify({
			success: false,
			message: "User does not exist"
		}));
	}

	const newRecipe = {
		imageUrl, instructions, summary, title, vegan, vegetarian,
		readyInMinutes, servings, ingredients
	};

	const newCreatedRecipe = {
		user,
		recipeList: [newRecipe]
	};
	await Created.create(newCreatedRecipe);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Recipe created successfully',
	}));
});

exports.getCreatedRecipe = BigPromise(async (req, res, next) => {
	console.log("Get create recipe called");
	const { uuid } = req.body;

	if (!uuid) {
		return next(new customErrors(401, 'Please provide all details'));
	}

	const user = await User.findOne({ uuid });

	if (!user) {
		return next(new customErrors(401, 'Please create an account first'));
	}

	const recipe = await Created.find({ uuid });

	let respnoseRecipeList = [];

	recipe.forEach((recipe) => {
		respnoseRecipeList.push(recipe.recipeList[0]);
	});

	console.log(respnoseRecipeList);

	res.status(200).send(JSON.stringify({
		success: true,
		message: 'Created recipes fetched',
		createdRecipeList: respnoseRecipeList
	}));
});