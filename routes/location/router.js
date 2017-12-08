
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const config = require("../../config.js")


//import the model
const models = require('../../models/index.js')
const Location = models.Location



//Get all the locations
router.get('/', (req, res) => {
    //body has to be json
    filter = (req.body || {})
    Location.find(filter, (err, results) => {

        if (err) next(err)

        console.log("Get all Locations function has been called")

        res.send(results)
    })
});


//Get all the locations with the given parameters
//Actually is the same as the previous one, so for now it s commented
// router.get('/', (req, res) => {
//     var filter = {}
//     //to do: build filter
//     Location.find({}, (err, results) => {
//         if (err) next(err)
//         res.send(results)
//     })
// });



router.post('/', (req, res, next) => {
    const data = req.body
    console.log(data)
    if (!req.is("application/json")) return res.sendStatus(400)

    var toSave = new Location(data)
    toSave.save((err)=>{
        if (err) next(err);
        
    })

    res.send(newFavorites)
})



//TODO u have to use put, not post
// //update a listing
// router.post('/', (req, res) => {
//     id = req.body.id
//     var filter = {}

//     //update the post with the given id 
//     Location.update({id}, (err, results) => {
//         if (err) next(err)
//         res.send(results)
//     })
// });


//remove a listing
router.delete('/', (req, res) => {
    //provide an id to remove element 
    id = req.body.id
    //update the post with the given id 
    Location.remove({id}, (err, results) => {
        if (err) next(err)
        res.send(results)
    })
});





module.exports = router