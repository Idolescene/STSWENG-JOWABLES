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
  totalcount: {type: Number, required: true},
  totalcost: {type: Number, required: true},
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

const orderModel = mongoose.model('orders', orderSchema);

// Create a new order
exports.create = (object, next) => {
    const newOrder = new orderModel(object);
    newOrder.save((err, order) => {
        next(err, order);
    });
};

// Get orders of a specific user
exports.getByUser = (user, next) => {
  orderModel.find({user: user}).exec((err, orders) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!orders) {
        next(err, orders);
      }
      else {
        console.log(orders); // testing

        var prodIds = [];
        orders.forEach((item) => {
          item.products.forEach((prod) => {
            prodIds.push(prod.id);
          });
        });

        console.log("Product IDs: " + prodIds); // testing

        productModel.getAllIds(prodIds, (err, products) => {
          var totalPrice = 0;
          var prodArray = [];
          products.forEach((item) => {
            console.log("Items: " + item); // testing
            var product = {};
            
            totalPrice += item.price;

            // append to prodArray
            product['name'] = item.name;
            product['img'] = item.img;
            product['id'] = item._id;

            prodArray.push(product);
          });
          console.log("Total Price: " + totalPrice); // testing
          next(err, {_id: orders._id, products: prodArray, total: totalPrice.toFixed(2)});
        });
      }
    }
  });
};

// Finds all orders
exports.getAll = (query, next) => {
  orderModel.find({}).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    orders.forEach((doc) => {
      orderObjects.push(doc.toObject());
    });
    next(err, orderObjects);
  });
};
