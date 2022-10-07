const express = require('express');
const router = express.Router();

const { signup, updateUserDetail, addToSaved, addToCollection,
	getSavedRecipes, getUserDetail, getCollectionRecipe, createRecipe,
	getCreatedRecipe } = require('../controller/userController');


router.route('/signup').post(signup);
router.route('/updateUserDetails').put(updateUserDetail);
router.route('/saveRecipe').post(addToSaved);
router.route('/collectionRecipe').post(addToCollection);
router.route('/get/saveRecipe').post(getSavedRecipes);
router.route('/get/collectionRecipe').post(getCollectionRecipe);
router.route('/get/userDetail').post(getUserDetail);
router.route('/createRecipe').post(createRecipe);
router.route('/get/createRecipe').post(getCreatedRecipe);


module.exports = router; 