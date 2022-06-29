const HttpError = require('../models/http-error');
const Shop = require('../models/shop');
const Drink = require('../models/drink');

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
        console.log(shop);
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
        console.log(createdShop);
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
exports.createShop = createShop;