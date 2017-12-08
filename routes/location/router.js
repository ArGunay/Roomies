// TODO:
//  - correct status codes

const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const config = require("../../config.js") 

require('../../models/Location.js');
const Location = mongoose.model("Location");

//Get all the locations
router.get('/', (req, res) => {
    Location.find({}, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            console.log("Get all Locations function has been called");

            res.status(200);
            res.json(results);
        }
    });
});


//Get all the locations with the given parameters

router.get('/', (req, res) => {
    var filter = {};

    //TODO: build filter
    Location.find(filter, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            console.log("Get all Locations function has been called");

            res.status(200);
            res.json(results);
        }
    });
});



//update a listing
router.post('/', (req, res) => {
    console.log(req.body);
    var filter = {
        "id": req.body.id
    };

    Location.update(filter, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            console.log("Get all Locations function has been called");

            res.status(200);
            res.json(results);
        }
    });
});


//remove a listing
router.delete('/', (req, res) => {
    var filter = {
        "id": req.body.id
    };

    //update the post with the given id 
    Location.remove(filter, (err, results) => {
        if (err) {
            next(err);
        } else {
            console.log("Get all Locations function has been called");

            res.status(200);
            res.json(results);
        }
    });
});


module.exports = router
