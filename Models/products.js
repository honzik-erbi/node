const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    smallDescription: {type: String, require: true},
    description: {type: String, require: true},
})

module.exports = mongoose.model("Product", productSchema)