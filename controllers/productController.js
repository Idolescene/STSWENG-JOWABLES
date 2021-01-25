const productModel = require('../models/product');
const cartModel = require('../models/cart');
const {validationResult} = require('express-validator');
const multer = require('multer');

const upload = multer({
  storage: storage
});

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
              res.render('catalogue', {
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: result.products
              });
            }
            else {
              res.render('catalogue', {
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
  var query = {};
  var sort = {name: 1};
  if (req.body.category && req.body.category != 'No Filter'){
    query.category = req.body.category;
  }
  console.log('beep')
  productModel.getMany(query, sort, (err, products) => {
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

// Edit a product
exports.editProduct = (req, res) => {

  var image;
  var {name, description, category, price} = req.body;
  var slug = req.body.name.replace(/\s+/g, '-').toLowerCase();
  var product_id = req.params._id;

  productModel.getOne({_id: product_id}, (err, product) => {
    if(err) {
      req.flash('error_msg', "Product not found.");
      res.redirect('/view_all_items');
    }
    else {
      if(product) {
        if(name == "") {
          name = product.name;
          slug = product.slug;
        }
        if(description == "") {
          description = product.description;
        }
        if(category == "") {
          category = product.category;
        }
        if(price == "") {
          price = product.price;
        }
        else {
          price = Math.round(price * 100) / 100.0;
        }
        if(req.file == undefined || req.file == null || req.file == "") {
          image = product.img;
        }
        else {
          // image = "uploads/" + req.file.originalname.replace(/\s+/g, '-').toLowerCase();
          image = "uploads/" + req.file.originalname;
        }

        productModel.updateItem(product_id, name, slug, description, category, price, image, (err, result) => {
          if(err) {
            req.flash('error_msg', "There was a problem updating product details. Please try again.");
            res.redirect('/edit_item/' + product_id);
          }
          else {
            req.flash('success_msg', "Successfully updated product details of " + name + ".");
            res.redirect('/edit_item/' + product_id);
          }
        });
      }
    }
  });
};