const conf = require('./config');
const express = require('express');

//stuff
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


const app = express()
const router = express.Router()
const mongoose = require('mongoose')


// //Routes
const location = require('./routes/location/router.js')
const message = require('./routes/message/router.js')

//OTHER stuff
//configure app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride(
function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}
));


//connect to mongoDB
mongoose.connect(conf.mongoUrl + conf.mongoDbName ,{ useMongoClient: true });


//routes 

app.use("/location", location)
app.use("/message", message)



app.use(function (err, req, res, next) {
  console.log("next is called")
    res.status(err.status || 500);
    console.log(err.status)
    
    res.sendStatus(err.status || 500);})




app.listen(3000, () => console.log('listening on port 3000'))


module.exports.app = app;
