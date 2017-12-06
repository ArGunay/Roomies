const express = require('express');


const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const conf = require('./config');


// //Routes
const location = require('./routes/location/router.js')
const message = require('./routes/message/router.js')

//TODO 

//connect to mongoDB
mongoose.connect(conf.mongoUrl + conf.mongoDbName ,{ useMongoClient: true });


//routes 

app.use("/location", location)
app.use("/message", message)


app.use(function (err, req, res, next) {
    console.log(err.status)
  
    res.status(err.status || 500);
    res.sendStatus(err.status);})




app.listen(3000, () => console.log('listening on port 3000'))


module.exports.app = app;
