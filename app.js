const config = require('./config');
const express = require('express');

// //stuff
// const path = require('path');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override')

const app = express()
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect(config.mongoUrl + config.mongoDbName ,{ useMongoClient: true });

//configure app
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

const location = require('./routes/location/router.js');
const roomie = require("./routes/roomie/router");

app.use("/location", location);
app.use("/roomie", roomie);

// app.use("/message", message)


// app.use(function (err, req, res, next) {
//   console.log("next is called")
//     res.status(err.status || 500);
//     console.log(err.status)

//     res.sendStatus(err.status || 500);})

// Allow Cross-Origin Resource Sharing, otherwise requests are refused (on Chrome).
// https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});



const message = require('./routes/message/router.js')
app.use("/message", message)

app.listen(8081, () => console.log('listening on port 8081'))

module.exports.app = app;
