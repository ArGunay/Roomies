/** @module models/index.js
 * Loads all models
 */
'use strict';

const mongoose = require('mongoose');

require("./Location");
require("./Roomie");

module.exports = {
    "Location": mongoose.model("Location"),
    "Roomie": mongoose.model("Roomie")
};
