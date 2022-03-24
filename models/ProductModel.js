//Anna, March 24

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    "product_id": {
        type: Number,
        unique: true},
    "product_description": {
        type: String,
        unique: true},
    "available_stock": Boolean,
    "price": Number,
    "is_prescribed": Boolean,
    "product_category_id": Number,
    "product_category_description": String,
    "product_detail": String,
    "product_images_construct": String,
    "reviews": [{
        "product_review_id": Number,
        "star_value": Number,
        "review": String,
        "user_id": Number
    }]
});

module.exports = mongoose.model("products", productSchema);