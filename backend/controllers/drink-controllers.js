const HttpError = require('../models/http-error');
const Drink = require('../models/drink');
const Shop = require('../models/shop');
const Review = require('../models/review');

const getDrinks = async (req, res, next) => {
    let drinks;
    try {
        drinks = await Drink.find({});
        console.log(drinks);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding drinks.',
            500
        );
        return next(error);
    }

    if (!drinks) {
        return next(new HttpError(
            'Could not find any drinks.'
        ));
    }

    res.json({drinks: drinks.map(drink => drink.toObject({getters: true}))});
};

const getDrinkById = async (req, res, next) => {
    const drinkId = req.params.drinkid;

    let drink;
    try {
        drink = await Drink.findById(drinkId);
        console.log(drink.reviews);
        if (drink.reviews.length > 0) {
            drink = await drink.populate('reviews');
        }
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding this drink.',
            500
        );
        return next(error);
    }

    if (!drink) {
        return next(new HttpError(
            'Could not find any drinks under this id.'
        ));
    }

    res.json({drink: drink.toObject({getters: true})});
};

const createDrink = async (req, res, next) => {
    const {drinkName, avgRating, drinkImage, shopId} = req.body;

    const createdDrink = new Drink({
        drinkName,
        avgRating,
        drinkImage,
        reviews: [],
        shopId
    });

    // Get Shop.
    let shop;
    try {
        shop = await Shop.findById(shopId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding the shop.',
            500
        );
        return next(error);
    }

    try {
        console.log(createdDrink);
        await createdDrink.save();
        shop.drinks.push(createdDrink);
        await shop.save();
    } catch (err) {
        console.log(shop);
        const error = new HttpError(
            'Failed to create drink, please try again!',
            500
        );
        return next(error);
    }

    /*
        When creating a review, get the review's shop average rating and update it, then get the drink's average rating and update it.
    */

    res.status(201).json({drink: createdDrink});
};

const createReview = async (req, res, next) => {
    const {reviewerName, reviewRating, reviewDate, reviewMessage} = req.body;
    const drinkId = req.params.drinkid;

    const createdReview = new Review({
        reviewerName, 
        reviewRating, 
        reviewDate, 
        reviewMessage, 
        drinkId
    });

    console.log(createdReview);

    let drink;
    try {
        drink = await Drink.findById(drinkId);
        console.log(drink);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding the drink.',
            500
        );
        return next(error);
    }

    try {
        await createdReview.save();
        drink.reviews.push(createdReview);
        await drink.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with saving the review.',
            500
        );
        return next(error);
    }

    res.status(201).json({review: createdReview});
}

exports.getDrinks = getDrinks;
exports.getDrinkById = getDrinkById;
exports.createDrink = createDrink;
exports.createReview = createReview;