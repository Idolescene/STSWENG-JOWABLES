const mongoose = require('./connection');
const productModel = require('../models/product');

const cartSchema = new mongoose.Schema({
  prod: [
    {
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
      buy: [
      {
        qty: {type: Number, required: true},
        size: {type: String,required: true}
      }
      ]
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

// update a cart with new values based on the query
exports.updateOne = (query, newvalues, next) => {
    cartModel.updateOne(query, newvalues, (err, cart) => {
        next(err, cart);
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

        productModel.getAllIds(prodIds, (err, products) => {
          var totalPrice = 0;
          var totalPriceWithShipping = 0;
          var subPrice;
          var prodArray = [];
          products.forEach((item) => {
            var index = cart.prod.findIndex(x => x.id.equals(item._id));
            //var stat = item.stock.findIndex(x =>x.id.equals(cart.prod[index].size))
            cart.prod[index].buy.forEach((element) => {
              var product = {};
              product['name'] = item.name;
              product['img'] = item.img;
              product['id'] = item._id;
              product['slug'] = item.slug;
              subPrice = item.price * element.qty;
              totalPrice += subPrice;
              totalPriceWithShipping = totalPrice + 50;
              product['size'] = element.size
              product['qty'] = element.qty
              product['subPrice'] = subPrice.toFixed(2);
              cartdex = item.stock.findIndex(x => x.size == element.size)
              product['status'] = false;
              if (cartdex > -1) {
                if (element.qty < item.stock[cartdex].qty) {
                  product['status'] = true;
                }
              }
              prodArray.push(product)
            })
          });
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
exports.addProduct = (filter, update, qty, size, next) => {
  cartModel.findOne({user: filter}).exec((err, cart) => {
    if (err) throw err;
    if (cart) {
      if (!cart.prod.some(prod => prod.id == update)) {
        if(!cart.prod.some(prod => prod.id == update).buy) {
          var buy = {};
          buy.qty = qty;
          buy.size = size;

          cart.prod.push({id: update, buy:buy})
          cart.save((next(err,cart)));
        }
     }
      else {
        //if (cart.prod.some(prod => prod.id == update).buy)
        var prodArray = cart.prod;
        var prodIndex = prodArray.findIndex(x => x.id == update);
        var buyArray = prodArray[prodIndex].buy
        var buyIndex = buyArray.findIndex(x => x.size == size)
        prodArray[prodIndex].buy.forEach(element => {
          if (element.size == size && buyIndex > -1) {
            if (prodArray[prodIndex].buy[buyIndex].qty + qty > 0) {
              cart.prod[prodIndex].buy[buyIndex].qty += qty;
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
        })
        if (buyIndex < 0) {
          cart.prod[prodIndex].buy.push({qty:qty,size:size})
          cart.save(next(err, cart));
        }
      }
    }
    else {
      if(qty < 0) {
        console.log('negative quantity when cart does not exist'); //testing
      }
      else {
        var newCart = {
          prod: [{id: update, qty: qty, size: size}],
          user: filter,
          checkout: false
        };
        cartModel.create(newCart, next);
      }
    }
  });
};

// Remove a product from a user's cart
exports.removeProduct = (filter, update, size, next) => {
  cartModel.findOne({user: filter}).exec((err, cart) => {
    if (err) throw err;
    if (cart) {
      if (!cart.prod.some(prod => prod.id == update)) {
        next(err, cart);
      }
      else {
        var prodArray = cart.prod;
        var prodIndex = prodArray.findIndex(x => x.id == update);
        var i = 0;
        var find = false;
        console.log ("---to delete---")
        console.log (cart.prod[prodIndex])
        console.log (cart.prod[prodIndex].buy)
        cart.prod[prodIndex].buy.forEach(element => {
          if (element.size != size && !find) {
            i++;
          }
          else if (element.size == size) {
            find = true;
          }
        })
        console.log(i)
        cart.prod[prodIndex].buy.splice(i,1)
        console.log(cart.prod[prodIndex].buy)
        if (cart.prod[prodIndex].buy.length == 0) {
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
        else {
          cart.save(next(err,cart));
        }
      }
    }
  });
};
