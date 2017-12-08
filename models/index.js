/** @module models/index.js
 * Loads all models
 */
'use strict';

const mongoose = require('mongoose');

require("./Location");

module.exports = {
    "Location": mongoose.model("Location")
};
