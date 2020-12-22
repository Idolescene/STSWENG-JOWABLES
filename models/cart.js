const mongoose = require('./connection');

const cartSchema = new mongoose.Schema({
  product: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      qty: {type: Number, required: true}
    }
  ],
  user: {type: mongoose.Schema.Types.ObjectId, required: true},
  checkout: {type: Boolean, required: true}
});

const cartModel = mongoose.model('cart', cartSchema);