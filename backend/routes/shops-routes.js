const express = require("express");

const router = express.Router();

// Import Shop Controllers.
const shopControllers = require('../controllers/shop-controllers');

router.post('/', shopControllers.createShop);

router.get('/', shopControllers.getShops);

router.get('/awards', shopControllers.getShopAwards);

router.get('/search/:searchquery', shopControllers.getShopBySearchQuery);

router.get('/:shopid', shopControllers.getShopById);

module.exports = router;