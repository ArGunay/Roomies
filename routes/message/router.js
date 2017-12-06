const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

//import pubsub

//TODO should import the config, but there's still no file
const config = require() //insert the path


//import the model
const User = require('../../models').Favorites




//Get all the users
router.post('/', (req, res) => {
    //TODO:
    //1 Retrieve host email

    //2 send mail to host

    if (err) next(err)
    res.send(results)
});



module.exports = router