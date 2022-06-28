const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    shopName: {type: String, required: true},
    shopAddress: {type: String, required: true},
    shopImage: {type: String, required: true},
    avgRating: {type: Number, required: true},
    drinks: [{type: mongoose.Types.ObjectId, required: true, ref: 'Drink'}]
});

module.exports = mongoose.model('Shop', shopSchema);