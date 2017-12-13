// TODO:
//  - correct status codes

const express = require('express');
const mongoose = require('mongoose');

require('../../models/Location.js');
const Location = mongoose.model("Location");

const router = express.Router();

//Get all the locations regarding the filter
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


//following stackoverflow suggestion:
//https://stackoverflow.com/questions/978061/http-get-with-request-body
//it should be avoided to put data in a get request, thus we can use a post request where the body is the filter
//Get all the locations regarding the filter
router.post('/query', (req, res) => {
    const filter = req.body
    Location.find(filter, (err, results) => {
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
        } else {
            if(!results) return next(err);
            res.status(200);
            res.json(results);
        }
    });
});

router.post('/', (req, res) => {
    if(!req.is("application/json"))   
        return res.status(400).end();

    var toSave = new Location(req.body);
    toSave.save((err, newLocation) => {
        if (err) {
            console.log(err)
            res.status(500).end();            
        } else {
            res.status(200);
            res.json(newLocation);
        }
    });
});

//remove a listing
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const pass = req.body.deleteSecret;
    
    //update the post with the given id 
    Location.remove({_id: id, deleteSecret: pass}, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.status(200);
            res.json(results);
        }
    });
});


module.exports = router
