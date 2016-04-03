const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const ShoppingList = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [type: String]
});

module.exports = mongoose.model( 'ShoppingList', ShoppingList );
