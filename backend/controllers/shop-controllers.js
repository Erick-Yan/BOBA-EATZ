const HttpError = require('../models/http-error');
const Shop = require('../models/shop');
const Drink = require('../models/drink');
const { default: mongoose } = require('mongoose');

const getShops = async (req, res, next) => {
    let shops;
    try {
        shops = await Shop.find({});
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding a shop.',
            500
        );
        return next(error);
    }

    if (!shops) {
        return next(new HttpError(
            'Could not find any shops!'
        ));
    }

    res.json({shops: shops.map(shop => shop.toObject({getters: true}))});
};

const getShopById = async (req, res, next) => {
    const shopId = req.params.shopid;

    let shop;
    try {
        shop = await Shop.findById(shopId);
        // console.log(shop);
        if (shop.drinks.length > 0) {
            shop = await shop.populate('drinks');
        }
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with finding a shop with this id.',
            500
        );
        return next(error);
    }

    if (!shop) {
        return next(new HttpError(
            'Could not find any shops under this id.'
        ));
    }

    res.json({shop: shop.toObject({getters: true})});
};

const getShopBySearchQuery = async (req, res, next) => {
    const {db} = mongoose.connection;
    const collection = await db.collection("shops");
    collection.createIndex(
        {
            shopName: "text"
        },
        {
            weights: {
                shopName: 10
            }
        }
    )

    const searchQuery = req.params.searchquery;

    let shops;
    try {
        shops = await collection.find(
            { $text: {$search: searchQuery} },
        ).sort({ score: { $meta: "textScore" } }).project({score: { $meta: "textScore" }}).toArray();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with searching this drink.',
            500
        );
        return next(error);
    }

    if (shops.length === 0) {
        try {
            shops = await collection.find({shopName: {"$regex": searchQuery, "$options": `i`}}).toArray();
        } catch (err) {
            const error = new HttpError(
                'Something went wrong with searching this drink.',
                500
            );
            return next(error);
        }
    }

    if (shops.length === 0) {
        return next(new HttpError(
            'Could not find any drinks under this id.'
        ));
    }

    res.json(shops);
}

const getShopAwards = async (req, res, next) => {
    const {db} = mongoose.connection;
    const collection = await db.collection("shops");
    collection.aggregate([
        {$unwind: "#drinks"},
        {$group: {_id: "$_id", reviews: {$push:"$drinks"}, size: {$sum:1}}}
    ])
    collection.createIndex(
        {
            avgRating: 1,
            drinks: 1
        }
    )

    let highestRatedShop;
    try {
        highestRatedShop = await collection.find().sort({ avgRating: -1 }).toArray();
        highestRatedShop = highestRatedShop[0];
    } catch (err) {
        const error = new HttpError(
            'Something went wrong with searching this drink.',
            500
        );
        return next(error);
    }

    res.json({highestRatedShop});
}

const createShop = async (req, res, next) => {
    const {shopName, shopAddress, shopImage, avgRating} = req.body;

    const createdShop = new Shop({
        shopName,
        shopAddress,
        shopImage,
        avgRating,
        drinks: []
    });

    try {
        // console.log(createdShop);
        await createdShop.save();
    } catch (err) {
        const error = new HttpError(
            'Failed to create shop, please try again.',
            500
        );
        return next(error);
    }

    /*
        When creating a review, get the review's shop average rating and update it, then get the drink's average rating and update it.
    */

    res.status(201).json({shop: createdShop});
};

exports.getShops = getShops;
exports.getShopById = getShopById;
exports.getShopBySearchQuery = getShopBySearchQuery;
exports.getShopAwards = getShopAwards;
exports.createShop = createShop;