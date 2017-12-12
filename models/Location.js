const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verify mail: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

const LocationSchema = exports.LocationSchema = new Schema({
    administrator: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    deleteSecret: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    postalCode: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    buildingNumber: { type: String },

    description: {
        type: String,
        required: true
    },

    monthly_price: {
        type: Number,
        min: 0,
        required: true
    },

    size: {
        type: Number,
        min: 1,
        required: true
    },

    bedrooms: {
        type: Number,
        min: 1,
        required: true
    },

    bathrooms: {
        type: Number,
        min: 1,
        required: true
    },

    pictures: [{
        type: String,
        required: true
    }],

    accept_smokers: { type: Boolean },
    accept_animals: { type: Boolean },
    gender: { type: String }
});

mongoose.model('Location', LocationSchema);
