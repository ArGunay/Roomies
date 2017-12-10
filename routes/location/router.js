
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

            res.status(200);
            res.json(results);
        }
    });
});



//Get the location with the given id
router.get('/:id', (req, res) => {
    const id = req.params.id

    Location.findOne({_id: id}, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
            //return next(err)
        } else {
            if(!results) return next(err)
            res.status(200);
            res.json(results);
        }
    });
});

router.post('/', (req, res) => {
    if(!req.is("application/json"))   return res.sendStatus(400)
     var toSave = new Location(req.body)   
    toSave.save((err, newLocation)=>{
        console.log("caio")
        if(err){
            console.log("THIS ERR",err)
            res.status(500).end();            
        } else{
            res.status(200)
            res.json(newLocation)
        }
    })
    
});




//update a listing
// TODO: to update an element u should use put, not post
router.put('/:id', (req, res) => {
    const id = req.params.id    
    Location.update({_id: id}, req.body, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {

            res.status(200);
            res.json(results);
        }
    });
});


//remove a listing
router.delete('/:id', (req, res) => {

    const id = req.params.id
    //update the post with the given id 
    Location.remove({_id: id}, (err, results) => {
        if (err) {
            next(err);
        } else {

            res.status(200);
            res.json(results);
        }
    });
});


module.exports = router

