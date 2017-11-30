const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = exports.UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    presentation: { type: String },
    age: { type: Number },
    gender: { type: String },
    reviews: { type: Array },
    locationsHistory: { type: Array },
    listings: { type: Array }
});

mongoose.model('User', UserSchema);
