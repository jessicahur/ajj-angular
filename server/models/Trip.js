const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trip = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  origin: String,
  midpoints: [String],
  destination: String
});

module.exports = mongoose.model( 'Trip', Trip );
