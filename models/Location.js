const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = exports.LocationSchema = new Schema({
    lat: { type: Number },
    lon: { type: Number },
    nation: { type: String },
    city: { type: String },
    cap: { type: String },
    street: { type: String },
    buildingNumber: { type: String },
    owners: { type: Array },
    historicData: { type: Array },
    reviews: { type Array },
    description: { type: String },
    applicantFilters: { type: Array }
});

// TODO: building or listings? Will users be able to see their listings after they find applicants?
//

mongoose.model('Location', LocationSchema);
