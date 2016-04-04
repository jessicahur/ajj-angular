const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ShoppingList = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [String]
});

module.exports = mongoose.model( 'ShoppingList', ShoppingList );
