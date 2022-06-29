const express = require("express");

const router = express.Router();

// Import Shop Controllers.
const drinkControllers = require('../controllers/drink-controllers');

router.post('/', drinkControllers.createDrink);

router.post('/:drinkid', drinkControllers.createReview);

router.get('/', drinkControllers.getDrinks);

router.get('/:drinkid', drinkControllers.getDrinkById);

module.exports = router;