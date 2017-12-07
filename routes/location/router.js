const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const config = require("../../config.js") 


//import the model
const models = require('../../models/index.js')
const Location = models.Location



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



router.post('/', (req, res, next) => {
    const data = req.body
    if(!req.is("application/json"))   return res.sendStatus(400)

    var favoriteToSave = new Location(data)
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url)
    // favoriteToSave.links = req.originalUrl
    favoriteToSave.save((err, newFavorites) => {
        if(err) 
                {        
                err.status=400 
                return next(err)}

        // newFavorites.links = { 
        //     "self": url  + newFavorites._id}
        newFavorites.save(( err, newFavorites ) => {
            if(err) return next(err)
            
            res.send(newFavorites)            
        })
    })
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
    id = req.body.id
    var filter = {}

    //update the post with the given id 
    Location.remove({id}, (err, results) => {
        if (err) next(err)
        res.send(results)
    })
});






module.exports = router
