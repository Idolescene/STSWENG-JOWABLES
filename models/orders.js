const mongoose = require('./connection');;

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      qty: {type: Number, required: true}
    }
  ],
  totalcount: {type: Nummber, required: true},
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
