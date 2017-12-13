const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect(config.mongoUrl + config.mongoDbName, { 
    useMongoClient: true
});

const app = express();

//configure app
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

const location = require('./routes/location/router');
const roomie = require("./routes/roomie/router");

app.use("/location", location);
app.use("/roomie", roomie);

// app.use(function (err, req, res, next) {
//   console.log("next is called")
//     res.status(err.status || 500);
//     console.log(err.status)

//     res.sendStatus(err.status || 500);})


app.listen(config.port, () => console.log('listening on port 8081'))

module.exports.app = app;
