const HttpError = require('../models/http-error');
const Drink = require('../models/drink');
const Shop = require('../models/shop');
const Review = require('../models/review');
const { default: mongoose } = require('mongoose');

const getDrinks = async (req, res, next) => {
    let drinks;
    try {
        drinks = await Drink.find({}).populate("shopId");
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
        // console.log(drink.reviews);
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

const getDrinkBySearchQuery = async (req, res, next) => {
    const {db} = mongoose.connection;
    const collection = await db.collection("drinks");
    collection.createIndex(
        {
            drinkName: "text"
        },
        {
            weights: {
                drinkName: 10
            }
        }
    )

    const searchQuery = req.params.searchquery;

    let drinks;
    try {
        drinks = await collection.find(
            { $text: {$search: searchQuery} },
        ).sort({ score: { $meta: "textScore" } }).project({score: { $meta: "textScore" }}).toArray();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with searching this drink.',
            500
        );
        return next(error);
    }

    if (drinks.length === 0) {
        try {
            drinks = await collection.find({drinkName: {"$regex": searchQuery, "$options": `i`}}).toArray();
        } catch (err) {
            const error = new HttpError(
                'Something went wrong with searching this drink.',
                500
            );
            return next(error);
        }
    }

    if (drinks.length === 0) {
        return next(new HttpError(
            'Could not find any drinks under this id.'
        ));
    }

    res.json(drinks);
}

const getDrinkAwards = async (req, res, next) => {
    // W = (Average Rating * Number of Votes / Number of Votes + Weight)
    let newFields = await Drink.aggregate([
        {
            $group: {
              _id: '$_id',
              avgRating: {$sum:'$avgRating'},
              numberOfReviews: { $sum: { $size:"$reviews" } },
              drinkName: {$first: '$drinkName'},
              shopName: {$first: '$shopName'},
              drinkImage: {$first: '$drinkImage'}
            }
        },
        {
            $project: {
                numerator: {$multiply: ['$avgRating', '$numberOfReviews']},
                denominator: { $sum: ['$avgRating', 3] },
                numberOfReviews: '$numberOfReviews',
                drinkName: '$drinkName',
                shopName: '$shopName',
                drinkImage: '$drinkImage'
            }
        },
        {
            $addFields: {
                weightedScore: {$divide: ['$numerator', '$denominator']}
            }
        },
        { $sort: { weightedScore: -1, numberOfReviews: -1 } },
        { $limit: 2}
    ]);

    let highestRatedDrink = newFields[0];
    let mostPopularDrink = newFields[1];

    res.json({highestRatedDrink: highestRatedDrink, mostPopularDrink: mostPopularDrink});
}

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
        // console.log(createdDrink);
        await createdDrink.save();
        shop.drinks.push(createdDrink);
        await shop.save();
    } catch (err) {
        // console.log(shop);
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

    // console.log(createdReview);

    let drink;
    try {
        drink = await Drink.findById(drinkId);
        // console.log(drink);
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
exports.getDrinkBySearchQuery = getDrinkBySearchQuery;
exports.getDrinkAwards = getDrinkAwards;
exports.createDrink = createDrink;
exports.createReview = createReview;