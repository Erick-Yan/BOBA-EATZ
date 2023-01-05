const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    drinkName: {type: String, required: true},
    avgRating: {type: Number, required: true},
    drinkImage: {type: String, required: true},
    reviews: [{type: mongoose.Types.ObjectId, required: true, ref: 'Review'}],
    shopId: {type: mongoose.Types.ObjectId, required: true, ref: 'Shop'},
    shopName: {type: String, required: true},
    positiveSents: [{type: String, required: true}],
    negativeSents: [{type: String, required: true}],
    happyScore: {type: Number, required: false},
    surprisedScore: {type: Number, required: false},
    sadScore: {type: Number, required: false},
    angryScore: {type: Number, required: false},
    positiveWords: [{type: String, required: true}],
    negativeWords: [{type: String, required: true}],
});

module.exports = mongoose.model('Drink', drinkSchema);