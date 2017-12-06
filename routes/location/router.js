const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const config = require("../../config.js") 


//import the model
const Location = require('../../models').Location


//Get all the locations
router.get('/', (req, res) => {
    Location.find({}, (err, results) => {

        if (err) next(err)

        console.log("Get all Locations function has been called")

        res.send(results)
    })
});


//Get all the locations with the given parameters

router.get('/', (req, res) => {
    var filter = {}
    //to do: build filter
    Location.find({}, (err, results) => {
        if (err) next(err)
        res.send(results)
    })
});



//update a listing
router.post('/', (req, res) => {
    id = req.body.id
    var filter = {}

    //update the post with the given id 
    Location.update({id}, (err, results) => {
        if (err) next(err)
        res.send(results)
    })
});


//remove a listing
router.delete('/', (req, res) => {
    id = req.body.id
    var filter = {}

    //update the post with the given id 
    Location.remove({id}, (err, results) => {
        if (err) next(err)
        res.send(results)
    })
});






module.exports = router
