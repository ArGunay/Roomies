// TODO:
//  - correct status codes

const express = require('express');
const mongoose = require('mongoose');

require('../../models/Location.js');
const Location = mongoose.model("Location");

const router = express.Router();

const shared = require('../shared.js');

//Get all the locations regarding the filter
router.get('/', (req, res) => {
    shared.getall(Location, req, res);
});

router.post('/query', (req, res) => {
    shared.query(Location, req, res);
});

//Get the location with the given id
router.get('/:id', (req, res) => {
    shared.getbyid(Location, req, res);
});

router.post('/', (req, res) => {
    shared.post(Location, req, res);
});

//remove a listing
router.delete('/:id', (req, res) => {
    shared.del(Location, req, res);
});


module.exports = router
