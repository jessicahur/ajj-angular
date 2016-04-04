const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vehicle = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  year: Number,
  make: String,
  model: String,
  detail: String
});

module.exports = mongoose.model( 'Vehicle', Vehicle );
