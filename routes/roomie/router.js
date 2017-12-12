const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');


const config = require("../../config.js")
require("../../models/Roomie.js")

//import the model
const Roomie = mongoose.model("Location");



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
module.exports = router
