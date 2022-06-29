const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewerName: {type: String, required: true},
    reviewRating: {type: Number, required: true},
    reviewDate: {type: String, required: true},
    reviewMessage: {type: String, required: false},
    drinkId: {type: mongoose.Types.ObjectId, required: true, ref: 'Drink'},
});

// For shop
module.exports =  mongoose.model('Review', reviewSchema);