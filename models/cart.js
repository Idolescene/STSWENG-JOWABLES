const mongoose = require('./connection');
const productModel = require('../models/product');

const cartSchema = new mongoose.Schema({
  prod: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      qty: {type: Number, required: true}
    }
  ],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  checkout: {type: Boolean, required: true}
});

const cartModel = mongoose.model('cart', cartSchema);

// Create a new cart
exports.create = (obj, next) => {
  const cart = new cartModel(obj);
  cart.save((err, cart) => {
    if (err) throw err;
    next(err, cart);
  });
};

// Retrieve all carts
exports.getAll = (query, next) => {
  cartModel.find({}).exec((err, carts) => {
    if (err) throw err;
    const cartObjects = [];
    carts.forEach((doc) => {
      cartObjects.push(doc.toObject());
    });
    next(err, cartObjects);
  });
};

// Retrieve a user's cart
exports.getByUser = (user, next) => {
  cartModel.findOne({user: user}).exec((err, cart) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!cart) {
        next(err, cart);
      }
      else {
        var prodIds = [];
        cart.prod.forEach((item) => {
          prodIds.push(item.id);
        });
        console.log(prodIds);
        productModel.getAllIds(prodIds, (err, products) => {
          var totalPrice = 0;
          var totalPriceWithShipping = 0;
          var subPrice;
          var prodArray = [];
          products.forEach((item) => {
            console.log(item);
            var index = cart.prod.findIndex(x => x.id.equals(item._id));
            var product = {};

            subPrice = item.price * cart.prod[index].qty;
            totalPrice += subPrice;
            totalPriceWithShipping = totalPrice + 50;

            product['name'] = item.name;
            product['img'] = item.img;
            product['subPrice'] = subPrice.toFixed(2);
            product['qty'] = cart.prod[index].qty;
            product['id'] = item._id;
            product['slug'] = item.slug;

            prodArray.push(product); 
          });
          console.log('before send: ' + totalPrice);
          next(err, {_id: cart._id, 
                      products: prodArray, 
                      total: totalPrice.toFixed(2), 
                      totalWithShipping: totalPriceWithShipping.toFixed(2)});
        });
      }
    }
  });
};

// Deletes a user's cart
exports.deleteByUser = (user, next) => {
  cartModel.deleteOne({user: user}).exec((err, result) => {
    if (err) throw err;
    next(err, result);
  });
};

// Add a product to a user's cart
exports.addProduct = (filter, update, qty, next) => {
  cartModel.findOne({user: filter}).exec((err, cart) => {
    if (err) throw err;
    if (cart) {
      console.log(cart.prod.some(prod => prod.id == update));
      if (!cart.prod.some(prod => prod.id == update)) {
        cart.prod.push({id: update, qty: qty});
        cart.save((next(err, cart)));
      }
      else {
        var prodArray = cart.prod;
        var prodIndex = prodArray.findIndex(x => x.id == update);
        if (prodArray[prodIndex].qty + qty > 0) {
          cart.prod[prodIndex].qty += qty;
          cart.save(next(err, cart));
        }
        else {
          cart.prod.splice(prodIndex, 1);
          if (cart.prod.length == 0) {
            cartModel.deleteOne({user: filter}).exec((err, result) => {
              next(err, result);
            });
          }
          else {
            cart.save(next(err, cart));
          }
        }
      }
    }
    else {
      if(qty < 0) {
        console.log('negative quantity when cart does not exist'); //testing
      }
      else {
        var newCart = {
          prod: [{id: update, qty: qty}],
          user: filter,
          checkout: false
        };
        cartModel.create(newCart, next);
      }
    }
  });
};

// Remove a product from a user's cart
exports.removeProduct = (filter, update, next) => {
  cartModel.findOne({user: filter}).exec((err, cart) => {
    if (err) throw err;
    if (cart) {
      console.log(cart.prod.some(prod => prod.id == update));
      if (!cart.prod.some(prod => prod.id == update)) {
        next(err, cart);
      }
      else {
        var prodArray = cart.prod;
        var prodIndex = prodArray.findIndex(x => x.ide == update);
        cart.prod.splice(prodIndex, 1);
        if (cart.prod.length == 0) {
          cartModel.deleteOne({user: filter}).exec((err, result) => {
            if (err) throw err;
            next(err, result);
          });
        }
        else {
          cart.save(next(err, cart));
        }
      }
    }
  });
};