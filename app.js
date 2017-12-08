const config = require('./config');
const express = require('express');

const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect(config.mongoUrl + config.mongoDbName ,{ useMongoClient: true });

//configure app
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

const location = require('./routes/location/router.js')
app.use("/location", location)

const message = require('./routes/message/router.js')
app.use("/message", message)

app.listen(3000, () => console.log('listening on port 3000'))

module.exports.app = app;
