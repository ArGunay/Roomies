const express = require('express');
const mongoose = require('mongoose');
var NodeGeocoder = require('node-geocoder');

const Location = mongoose.model("Location");
const router = express.Router();


var options = {
    provider: 'google',
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDvk4XmxE9TyfNn0r-QhkjZpuzgVBHZank', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

// "city":"Lugano","postalCode":"6900","street":"Strada","buildingNumber":"145"
var geocoder = NodeGeocoder(options);

router.get('/:id', (req, res) => {
  // console.log("the id is " + req.params.id)
  Location.findById(req.params.id, function(err, found){
  	if (err) throw (err);
    if(found !== null) {
      console.log(found.buildingNumber + " " + found.street);

      geocoder.geocode({
        address: found.buildingNumber + " " + found.street,
        country: "Switzerland",
        zipcode: found.postalCode
        },function(err, r) {
          if(err) throw err;
          console.log(r);
          let latLon = {lon : r[0].longitude, lat : r[0].latitude};
          console.log(latLon)
          res.status(200).json(latLon);
        });
      }
    });
});

router.get('/', (req, res) => {
    let q = Location.find({});
    q.select('city postalCode street buildingNumber');

    q.exec(function (err, locations) {
        let p = []
        locations.forEach(function(l){

            p.push(geocoder.geocode(`${l.street} ${l.buildingNumber}, ${l.city}`))
        })

        Promise.all(p)
        .then(function(data){
            let ll = [];
            data.forEach(function(l){
                ll.push({
                    lon : l[0].longitude,
                    lat : l[0].latitude
                })
            })
            res.json(ll);
        })
    })
});




module.exports = router
