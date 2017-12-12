const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');


const config = require("../../config.js")
require("../../models/Roomie.js")

//import the model
const Roomie = mongoose.model("Roomie");



router.get("/", (req,res) =>{
    Roomie.find({}, (err,response) => {
        if(err){
            console.log(err);
            res.status(500).end();

        }else{
            res.status(200);
            res.json(response);
        }
    })
})


router.post('/query', (req, res) => {
    const filter = req.body
    Roomie.find(filter, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {

            res.status(200);
            res.json(results);
        }
    });
});



outer.get('/:id', (req, res) => {
    const id = req.params.id
    Roomie.findOne({_id: id}, (err, results) => {
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
     var toSave = new Roomie(req.body)   
    toSave.save((err, newLocation)=>{
        console.log("bella")
        if(err){
            console.log("THIS ERR",err)
            res.status(500).end();            
        } else{
            res.status(200)
            res.json(newLocation)
        }
    })
    
});

router.put('/:id', (req, res) => {
    const id = req.params.id    
    Roomie.update({_id: id}, req.body, (err, results) => {
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