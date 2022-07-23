const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    drinkName: {type: String, required: true},
    avgRating: {type: Number, required: true},
    drinkImage: {type: String, required: true},
    reviews: [{type: mongoose.Types.ObjectId, required: true, ref: 'Review'}],
    shopId: {type: mongoose.Types.ObjectId, required: true, ref: 'Shop'}
});

module.exports = mongoose.model('Drink', drinkSchema);