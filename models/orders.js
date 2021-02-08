const mongoose = require('./connection');
const productModel = require('../models/product');

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      qty: {type: Number, required: true},
      size: {type: String, required: true},
      img: {type: String, required: true},
      name: {type: String, required: true},
      price: {type: String, required: true}
    }
  ],
  date: {type: String, required: true},
  dateformatted: {type: Date, required: true},
  status: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  fullname: {type: String, required: true},
  contactnum: {type: String, required: true},
  housenum: {type: String, required: true},
  barangay: {type: String, required: true},
  city: {type: String, required: true},
  province: {type: String, required: true},
  payment: {type: String, required: true},
  totalPrice: {type: Number, required: true},
  totalWithShipping: {type: Number, required: true}
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

orderSchema.virtual('address').get(function() {
    var add = this.housenum + ", " + this.barangay + ", " + this.city + ", " + this.province;
    return add;
});

const orderModel = mongoose.model('orders', orderSchema);

// Create a new order
exports.create = (object, next) => {
    const newOrder = new orderModel(object);
    newOrder.save((err, order) => {
        next(err, order);
    });
};

// Get one order
exports.getOne = (query, next) => {
    orderModel.findOne(query, (err, order) => {
        next(err, order);
    });
};

// Get all orders for a user
exports.getAll = (user, next) => {
  orderModel.find({user: user}).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    orders.forEach((doc) => {
      orderObjects.push(doc.toObject());
    });
    next(err, orderObjects);
  });
};

// Get all orders that match the query given
exports.find = (query, next) => {
  orderModel.find(query).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    orders.forEach((doc) => {
      orderObjects.push(doc.toObject());
    });
    next(err, orderObjects);
  });
};

// Get all order that do not have the Cancelled status
exports.findNotCancel = (query, next) => {
  orderModel.find({status: {$not: {$regex: "^Cancelled$"}}}).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    orders.forEach((doc) => {
      orderObjects.push(doc.toObject());
    });
    next(err, orderObjects);
  });
};

// update a order with new values based on the query
exports.update = (query, newvalues, next) => {
    orderModel.updateOne(query, newvalues, (err, order) => {
        next(err, order);
    });
};


/*
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
            var product = {};

            totalPrice += item.price;

            // append to prodArray
            product['name'] = item.name;
            product['img'] = item.img;
            product['id'] = item._id;

            prodArray.push(product);
          });

          var output = {_id: orders._id, products: prodArray, total: totalPrice.toFixed(2)};
          console.log(output);
          next(err, output);
        });
      }
    }
  });
};


// Finds all orders
exports.getAll = (user, next) => {
  orderModel.find({}).exec((err, orders) => {
    if (err) throw err;
    const orderObjects = [];
    var prodArray = [];
    var totalPrice = 0;
    var prodIds = [];
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
    });
  });
};

*/
