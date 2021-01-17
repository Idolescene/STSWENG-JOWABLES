const mongoose = require('./connection');
const productModel = require('../models/product');

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      qty: {type: Number, required: true},
      size: {type: String, required: true}
    }
  ],
  date: {type: String, required: true},
  status: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  fullname: {type: String, required: true},
  contactnum: {type: String, required: true},
  housenum: {type: String, required: true},
  barangay: {type: String, required: true},
  city: {type: String, required: true},
  province: {type: String, required: true}
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

orderSchema.virtual('totalcount').get(function() {
    var totalcount = 0;
    this.products.forEach((doc) => {
      totalcount = totalcount + doc.qty;
    });
    return totalcount;
});

const orderModel = mongoose.model('orders', orderSchema);

// Create a new order
exports.create = (object, next) => {
    const newOrder = new orderModel(object);
    newOrder.save((err, order) => {
        next(err, order);
    });
};

// Get all orders by a user
exports.getAllByUser = (user, next) => {
  orderModel.find({user: user}).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    var prodArray = [];
    var totalPrice = 0;
    var prodIds = [];
    var ctr = 0;
    orders.forEach((doc) => {
      totalPrice = 0;
      prodArray = [];
      doc.products.forEach((item) => {
        prodIds.push(item.id);
      });
      productModel.getAllIds(prodIds, (err, products) => {
        products.forEach((item) => {
          totalPrice = item.price + totalPrice;
          prodArray.push(item.toObject());
        });
        var orderInfo = {
          orderinfo: doc.toObject(),
          productList: prodArray,
          totalPrice: totalPrice.toFixed(2)
        }
        orderObjects.push(orderInfo);
        next(err, orderObjects);
      });
      ctr++;
    });
  });
};
