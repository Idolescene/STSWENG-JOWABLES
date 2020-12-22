const mongoose = require('./connection');

const cartSchema = new mongoose.Schema({
  product: [
    {
      id: {type: Number, required: true}, //change to product ID from product schema later
      qty: {type: Number, required: true}
    }
  ],
  user: {type: Number, required: true}, //change to user ID from product schema later
  checkout: {type: Boolean, required: true}
});

const cartModel = mongoose.model('cart', cartSchema);