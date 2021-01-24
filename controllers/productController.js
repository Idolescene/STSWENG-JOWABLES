const productModel = require('../models/product');
const cartModel = require('../models/cart');
const {validationResult} = require('express-validator');

// Get all products from the DB and display it in catalogue
exports.getAllProducts = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          var query = {};
          var sort = {name: 1};
          console.log('staaarto');
          if (req.body.category && req.body.category != 'No Filter'){
            query.category = req.body.category;
          }
          if (req.body.size && req.body.size != 'No Filter'){
            query.stock.size = req.body.size;
          }
          console.log(query.category);
          console.log(query.stock);
          productModel.getMany(query,sort, (err, products) => {
            if (err) throw err;
            console.log(products);
            var categories = [];
            var sizes = [];
            products.forEach((item)=>{
              console.log(sizes)
              console.log('----')
              if (!categories.includes(item.category)) {
                categories.push(item.category);
              }
              item.stock.forEach((item)=>{
                if (!sizes.includes(item.size)){
                  sizes.push(item.size)
                }
              })
            });
            products.forEach((item) => {
              item.price = item.price.toFixed(2);
            });
            if(result) {
              res.render('catalogue', {
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: result.products,
                size: sizes
              });
            }
            else {
              res.render('catalogue', {
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: null,
                size: sizes
              });
            }
          });
        }
      });
    }
    else {
      // if guest
      var query = {};
      var sort = {name: 1};
      if (req.body.category && req.body.category != 'No Filter'){
        query.category = req.body.category;
      }
      if (req.body.size && req.body.size != 'No Filter'){
        query.stock.size = req.body.size;
      }
      productModel.getMany(query,sort, (err, products) => {
        if (err) throw err;
        console.log(products);
        
        var categories = [];
        products.forEach((item) =>{
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
          item.stock.forEach((item)=>{
            if (!sizes.includes(item.size)){
              sizes.push(item.size)
            }
          })
        });
        products.forEach((item) => {
          item.price = item.price.toFixed(2);
        });
        res.render('catalogue', {
          loggedIn: req.session.user,
          products: products,
          categories: categories,
          cartProducts: null,
          size: sizes
        });
      });
    }
  }
}

// Get all products from the DB and display it in update products
exports.viewAllProducts = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          var query = {};
          var sort = {name: 1};
          if (req.body.category && req.body.category != 'No Filter'){
            query.category = req.body.category;
          }
          productModel.getMany(query,sort, (err, products) => {
            if (err) throw err;
            console.log(products);
            var categories = [];
            products.forEach(function(item){
              if (!categories.includes(item.category)) {
                categories.push(item.category);
              }
            });
            products.forEach((item) => {
              item.price = item.price.toFixed(2);
            });
            if(result) {
              res.render('update-products', {
                layout: 'admin',
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: result.products
              });
            }
            else {
              res.render('update-products', {
                layout: 'admin',
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: null
              });
            }
          });
        }
      });
    }
    else {
      // if guest
      var query = {};
      var sort = {name: 1};
      if (req.body.category && req.body.category != 'No Filter'){
        query.category = req.body.category;
      }
      productModel.getMany(query,sort, (err, products) => {
        if (err) throw err;
        console.log(products);
        
        var categories = [];
        products.forEach(function(item){
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
        
        products.forEach((item) => {
          item.price = item.price.toFixed(2);
        });
        res.render('catalogue', {
          loggedIn: req.session.user,
          products: products,
          categories: categories,
          cartProducts: null
        });
      });
    }
  }
}

// Post method for displaying products by category
exports.refreshProducts = (req, res) => {
  console.log('bop')
  var query = {};
  var sort = {name: 1};
  var size;
  if (req.body.category && req.body.category != 'No Filter'){
    query.category = req.body.category;
  }
  if (req.body.size && req.body.size != 'No Filter'){
    size = req.body.size;
  }
  console.log(query);
  console.log('bop')
  productModel.getManyFilter(query, sort, size,(err, products) => {
    if (err) throw err;
    console.log(products);
    products.forEach((item) => {
      item.price = item.price.toFixed(2);
    });
    res.render('products', {
      loggedIn: req.session.user,
      products: products,
      layout: null
    });
  });
}

// Get a specific product from the DB and display it in product-details 
exports.getAProduct = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          productModel.getOne({slug: req.params.slug}, (err, product) => {
            if (err) throw err;

            if(result) {
              res.render('product-details', {
                loggedIn: req.session.user,
                layout: 'main1',
                productName: product.name,
                productPrice: product.price.toFixed(2),
                productDesc: product.description,
                productImg: product.img,
                _id: product._id,
                sizeChart: "./img/size-chart-short.jpg",
                cartProducts: result.products
              });
            }
            else {
              res.render('product-details', {
                loggedIn: req.session.user,
                layout: 'main1',
                productName: product.name,
                productPrice: product.price.toFixed(2),
                productDesc: product.description,
                productImg: product.img,
                _id: product._id,
                sizeChart: "./img/size-chart-short.jpg",
                cartProducts: null
              });
            }
          });
        }
      });
    }
    else {
      // if guest
      productModel.getOne({slug: req.params.slug}, (err, product) => {
        if (err) throw err;
        res.render('product-details', {
          loggedIn: req.session.user,
          layout: 'main1',
          productName: product.name,
          productPrice: product.price.toFixed(2),
          productDesc: product.description,
          productImg: product.img,
          _id: product._id,
          sizeChart: "./img/size-chart-short.jpg",
          cartProducts: null
        });
      });
    }
  }
};

// Get categories from the DB and display them in home
exports.getCategories = (req,res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          var sort = {name: 1}
          productModel.getMany({},sort,(err,products) => {
            if (err) throw err;
            var categories = [];
            var sample = [];
            products.forEach(function(item){
              if (!categories.includes(item.category)) {
                categories.push(item.category);
                sample.push(item)
              }
            });
            productModel.getOne({_id: req.body.id}, (err, product) => {
              if (err) throw err;
              if(result) {
                res.render('home', {
                  title: "Home",
                  name: req.session.username,
                  loggedIn: req.session.user,
                  categories: sample,
                  productDetails: product,
                  cartProducts: result.products
                });
              }
              else {
                res.render('home', {
                  title: "Home",
                  name: req.session.username,
                  loggedIn: req.session.user,
                  categories: sample,
                  productDetails: null,
                  cartProducts: null
                });
              }
            })
          });
        }
      })
    }
    else {
      // if guest
      var sort = {name: 1}
      productModel.getMany({},sort,(err,products) => {
        if (err) throw err;
        var categories = [];
        var sample = [];
        products.forEach(function(item){
          if (!categories.includes(item.category)) {
            categories.push(item.category);
            sample.push(item)
          }
        });
        res.render('home', {
          title: "Home",
          name: "login",
          loggedIn: req.session.user,
          categories: sample,
          cartProducts: null
        });
      });
    }
  }
}

exports.postAProduct = (req, res) => {
  let id = req.body.id;
  productModel.getOne({_id: id}, (err, results) => {
    console.log(results);
    res.send(results);
  });
};