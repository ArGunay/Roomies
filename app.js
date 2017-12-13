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

app.use("/location", location);
app.use("/roomie", roomie);



//send email 
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



mailer.extend(app, {
from: 'nick.zup@example.com',
host: 'smtp.gmail.com', // hostname 
secureConnection: true, // use SSL 
port: 465, // port for secure SMTP 
transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
auth: {
user: 'roomies777@gmail.com',
pass: 'passwordperlaemail'
}
});

app.get('/email', function (req, res, next) {
    app.mailer.send('email', {
      to: 'ardil.guenay@usi.ch', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
      subject: 'You have won the lottery', // REQUIRED. 
      otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
    }, function (err) {
      if (err) {
        // handle error 
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.send('Email Sent');
    });
  });




app.listen(config.port, () => console.log('listening on port 8081'))

module.exports.app = app;
