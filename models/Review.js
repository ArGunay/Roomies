const mongoose = require(
    'mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Type.ObjectId;

const ReviewSchema = exports.ReviewSchema = new Schema({
    reviewId: { type: ObjectId },
    stars: { type: Integer },
    review: { type: String }
});

// Is giving a user the ability to leave comments good? May open too many problems. Stars are ok.
//

mongoose.model('Review');
