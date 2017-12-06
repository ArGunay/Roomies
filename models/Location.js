const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Verify mail: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

const LocationSchema = exports.LocationSchema = new Schema({
    administrator: { 
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    nation: { 
        type: String, 
        required: true 
    },

    city: { 
        type: String,
        required: true
    },

    cap: { 
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
        required: true
    },

    accept_smokers: { type: Boolean },
    accept_animals: { type: Boolean },
    gender: { type: String },
    price_min: { type: Number },
    price_max: { type: Number }
});

mongoose.model('Location', LocationSchema);
