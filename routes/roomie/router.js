// TODO:
//  - correct status codes

const express = require('express');
const mongoose = require('mongoose');

require('../../models/Roomie.js');
const Roomie = mongoose.model("Location");

const router = express.Router();

const shared = require('../shared.js');

//Get all the locations regarding the filter
router.get('/', (req, res) => {
    shared.getall(Roomie, req, res);
});

router.post('/query', (req, res) => {
    shared.query(Roomie, req, res);
});

//Get the location with the given id
router.get('/:id', (req, res) => {
    shared.getbyid(Roomie, req, res);
});

router.post('/', (req, res) => {
    shared.post(Roomie, req, res);
});

//remove a listing
router.delete('/:id', (req, res) => {
    shared.del(Roomie, req, res);
});


module.exports = router
