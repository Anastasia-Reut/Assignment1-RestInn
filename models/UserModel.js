//Anna, March 23

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "user_id": {
        type: Number,
        unique: true},
    "login_id": {
        type: String,
        unique: true},
    "user_first_name": String,
    "user_last_name": String,
    "password": String,
    "dob": Date,
    "phone": Number,
    "email": {
        type: String,
        unique: true},
    "user_address": [{
        "address1": String,
        "address2": String,
        "city": String,
        "province": String,
        "postal_code": String,
        "primary_address": Boolean,
        "active_address": Boolean,
    }],    
    "isAdmin": Boolean,
    "isDoctor": Boolean,
    "doctor_license_no": Number,
    "ohip_no": Number,
    "user_prescription": [{"prescription_id": Number}]
});

module.exports = mongoose.model("USERS", userSchema);