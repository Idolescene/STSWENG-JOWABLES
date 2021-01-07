const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String},
  description: {type: String, required: true},
  category: {type: String, required: true},
  price: {type: Number, required: true},
  status: {type: String, required: true},
  img: {type: String, required: true}
});

const productModel = mongoose.model('product', productSchema);