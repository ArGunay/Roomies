const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RoomieSchema = exports.RoomieSchema = new Schema({
    deleteSecret: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        requred: true,
    },
    age:{
        type: Number,
        requred: true,
    },
    gender:{
        type: String,
    },
    max_price: {
        type: Number,
        requred: true
    },
    description:{
        type: String,
    },
    smoker:{
        type: Boolean,
    },
    accept_animals: {
        type: Boolean
    },
    picture:[{
        type: String,
        required: true,
    }],
    profession:{
        type:String,
    }

});

mongoose.model('Roomie',RoomieSchema);
