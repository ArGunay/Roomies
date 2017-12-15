const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
mailer = require('express-mailer');


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
const points = require("./routes/points/router.js")

app.use("/location", location);
app.use("/roomie", roomie);
app.use("/points", points)
// app.use(function (err, req, res, next) {
//   console.log("next is called")
//     res.status(err.status || 500);
//     console.log(err.status)


//send email
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



mailer.extend(app, {
from: 'roomies777@gmail.com',
host: 'smtp.gmail.com', // hostname
secureConnection: true, // use SSL
port: 465, // port for secure SMTP
transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
auth: {
user: 'roomies777@gmail.com',
pass: 'passwordperlaemail'
}
});

app.post('/email', function (req, res, next) {
    //req has to be a json file with fields: address, subject, content

    console.log("RB",req.body)
    app.mailer.send('email', {
      to: req.body.address, 
      subject: req.body.subject, 
      message: req.body.message,
      from: req.body.from
    }, function (err) {
      if (err) {
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent Correctly');
    });
  });




const server = app.listen(config.port, () => console.log('listening on port 8081'))

const io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log("connected")
    socket.on('newRoomie', function(){
      console.log("In newRoomie serverside")
        socket.broadcast.emit("newRoomie", {});
    });

    socket.on('newApartment', function(){
      console.log("In newap serverside")
        socket.broadcast.emit("newApartment", {});
    });
});


module.exports.app = app;
