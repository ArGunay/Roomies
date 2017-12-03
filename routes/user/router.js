const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

//import pubsub

//TODO should import the config, but there's still no file
const config = require()//insert the path


//import the model
const User = require('../../models').Favorites




//Get all the users
router.get('/', (req, res) => {
    User.find({}, (err, results) => {

        if (err) next(err)

        console.log("Get all users function has been called")

        res.send(results)
    })
});



//We may need a function to get a specific user (maybe from id?)


//todo


module.exports = router
