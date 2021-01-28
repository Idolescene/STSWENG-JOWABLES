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
          console.log('boop')
          console.log(products)
          console.log('beep')
          products.forEach((item) => {
            console.log(item);
            var index = cart.prod.findIndex(x => x.id.equals(item._id));
            console.log(cart.prod[index]);
            //var stat = item.stock.findIndex(x =>x.id.equals(cart.prod[index].size))
            cart.prod[index].buy.forEach((element) => {
              console.log("PRODUCTS: " + element); //testing
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
              //product['status'] = item.stock[cartdex].status
              prodArray.push(product)
              console.log(product);
              console.log("beep");
              console.log(prodArray);
              console.log('wat');
            })
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
exports.addProduct = (filter, update, qty, size, next) => {
  cartModel.findOne({user: filter}).exec((err, cart) => {
    if (err) throw err;
    if (cart) {
      console.log(cart.prod.some(prod => prod.id == update));
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
        console.log(buyArray)
        var buyIndex = buyArray.findIndex(x => x.size == size)
        console.log(buyIndex);
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
      console.log(cart); // testing
      console.log(cart.prod.some(prod => prod.id == update));
      if (!cart.prod.some(prod => prod.id == update)) {
        next(err, cart);
      }
      else {
        var prodArray = cart.prod;
        var prodIndex = prodArray.findIndex(x => x.id == update);
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