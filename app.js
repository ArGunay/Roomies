const express = require('express');


const app = express()
const mongoose = require('mongoose')


//Routes
const location = require('./routes/location/router.js')
const message = require('./routes/message/router.js')

//TODO 

//connect to mongoDB
mongoose.connect(config.mongoUrl + config.mongoDbName ,{ useMongoClient: true });


//routes 

app.use("/location", location)
app.use("/message", message)





app.listen(3000, () => console.log('Example app listening on port 3000!'))