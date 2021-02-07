const productModel = require('../models/product');
const cartModel = require('../models/cart');
const {validationResult} = require('express-validator');
const multer = require('multer');

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
          var category = "All Items"
          if (req.body.category && req.body.category != 'No Filter'){
            query.category = req.body.category;
            category = req.body.category
          }
          if (req.body.size && req.body.size != 'No Filter'){
            query.stock.size = req.body.size;
          }
          productModel.getMany(query,sort, (err, products) => {
            if (err) throw err;
            var categories = [];
            var sizes = [];
            products.forEach((item)=>{
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
                size: sizes,
                category: category
              });
            }
            else {
              res.render('catalogue', {
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: null,
                size: sizes,
                category: category
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
      var category = "All Items"
      if (req.body.category && req.body.category != 'No Filter'){
        query.category = req.body.category;
        category = req.body.category;
      }
      if (req.body.size && req.body.size != 'No Filter'){
        query.stock.size = req.body.size;
      }
      productModel.getMany(query,sort, (err, products) => {
        if (err) throw err;

        var categories = [];
        var sizes = [];
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
          size: sizes,
          category: category
        });
      });
    }
  }
}
// Get all products from the DB and display it in catalogue
/*exports.getAllProductsSorted = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log(req.params)
    var user = req.session.user;
    if (user) {
      // if user
      cartModel.getByUser(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          var query = {};
          query.category = req.params.category
          var sort = {name: 1};
          console.log('r u here');
          category = req.params.category
          if (req.body.size && req.body.size != 'No Filter'){
            query.stock.size = req.body.size;
          }
          console.log(query);
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
                size: sizes,
                category: query.category
              });
            }
            else {
              res.render('catalogue', {
                loggedIn: req.session.user,
                products: products,
                categories: categories,
                cartProducts: null,
                size: sizes,
                category: category
              });
            }
          });
        }
      });
    }
    else {
      // if guest
      var query = {};
      query.category = req.params.category;
      var category = req.params.category;
      var sort = {name: 1};
      if (req.body.size && req.body.size != 'No Filter'){
        query.stock.size = req.body.size;
      }
      productModel.getMany(query,sort, (err, products) => {
        if (err) throw err;
        console.log(products);

        var categories = [];
        var sizes = [];
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
          size: sizes,
          category: category
        });
      });
    }
  }
}
*/
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
          var size = "No Filter"
          if (req.body.category && req.body.category != 'No Filter'){
            query.category = req.body.category;
          }
          if (req.body.size && req.body.size != 'No Filter'){
            size = req.body.size;
          }

          productModel.getManyFilter(query,sort, size,(err, products) => {
            if (err) throw err;
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
              console.log(result._id);
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
      var size = "No Filter"
      var category = "All Items"
      if (req.body.category && req.body.category != 'No Filter') {
        query.category = req.body.category;
        category = query.category
      }
      if (req.body.size && req.body.size != "No Filter") {
        size = req.body.size;
      }

      console.log('bsd')
      productModel.getManyFilter(query,sort, size,(err, products) => {
        if (err) throw err;

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
          cartProducts: null,
          category: category
        });
      });
    }
  }
}

// Post method for displaying products by category
exports.refreshProducts = (req, res) => {
  var query = {};
  var sort = {name: 1};
  var size = "No Filter";
  var category = 'All Items';
  if (req.body.category && req.body.category != 'No Filter'){
    query.category = req.body.category;
    category = req.body.category;
  }
  if (req.body.size && req.body.size != 'No Filter'){
    size = req.body.size;
    category = category + " (" + req.body.size + ")"
  }
  productModel.getManyFilter(query, sort, size,(err, products) => {
    if (err) throw err;
    products.forEach((item) => {
      item.price = item.price.toFixed(2);
    });
    res.render('products', {
      loggedIn: req.session.user,
      products: products,
      layout: null,
      category: category
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
                productStock: product.toObject().stock,
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
                productStock: product.toObject().stock,
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
    res.send(results);
  });
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
    // console.log(generateName(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

// GET: Edit a product
exports.getEditProduct = (req, res) => {
  var image;
  const slug = req.params.slug;
  var status = [];
  var size = [];
  productModel.getOne({slug: slug}, (err, result) => {
    if (err) throw err;
    if (result) {
      result.stock.forEach((item) => {
        status.push(item.status);
        size.push(item.qty);
      });

      var status_msg = [];
      var msg_style = [];
      for(i=0; i<4; i++) {
        if (status[i] == true) {
          status_msg[i] = "Available";
          msg_style[i] = "alert alert-success";
        } else {
          status_msg[i] = "Out of Stock";
          msg_style[i] = "alert alert-danger";
        }
      }

      res.render('add-edit-product', {
        layout: "admin1",
        buttonStateEdit: "",
        buttonStateAdd: "disabled",
        id: result._id,
        name: result.name,
        description: result.description,
        category: result.category,
        price: result.price,
        image: result.img,
        small_status: status_msg[0],
        medium_status: status_msg[1],
        large_status: status_msg[2],
        xlarge_status: status_msg[3],
        small_style: msg_style[0],
        medium_style: msg_style[1],
        large_style: msg_style[2],
        xlarge_style: msg_style[3],
        small_size: size[0],
        medium_size: size[1],
        large_size: size[2],
        xlarge_size: size[3]
      });
    }
  });
};

// POST: Edit a product
exports.postEditProduct = (req, res) => {
  var image;
  var {name, description, category, price, small, medium, large, xlarge} = req.body;
  var slug = req.body.name.replace(/\s+/g, '-').toLowerCase();
  var sstat, mstat, lstat, xlstat;
  var product_id = req.params._id;
  var small_stat, medium_stat, large_stat, xlarge_stat;

  productModel.getOne({_id: product_id}, (err, product) => {
    if (err) {
      req.flash('error_msg', "Product not found.");
      res.redirect('/admin/update-products');
    } else {
      if (product) {
        if(name == "") {
          name = product.name;
          slug = product.slug;
        }
        if (description == "") {
          description = product.description;
        }
        if (category == "") {
          category = product.category;
        }
        if (price == "") {
          price = product.price;
        } else {
          price = Math.round(price*100)/100.0;
        }
        if(req.file == undefined || req.file == null || req.file == "") {
          image = product.img;
        }
        else {
          // image = "uploads/" + req.file.originalname.replace(/\s+/g, '-').toLowerCase();
          image = "uploads/" + req.file.originalname;
        }

        console.log("IMAGE: " + image);

        if (small == "") {
          small_stat = product.stock[0].status;
          small = product.stock[0].qty;
        } else {
          if (small > 0) {
            small_stat = true;
          } else {
            small_stat = false;
          }
        }
        if (medium == "") {
          medium_stat = product.stock[1].status;
          medium = product.stock[1].qty;
        } else {
          if (medium > 0) {
            medium_stat = true;
          } else {
            medium_stat = false;
          }
        }
        if (large == "") {
          large_stat = product.stock[2].status;
          large = product.stock[2].qty;
        } else {
          if (large > 0) {
            large_stat = true;
          } else {
            large_stat = false;
          }
        }
        if (xlarge == "") {
          xlarge_stat = product.stock[3].status;
          xlarge = product.stock[3].qty;
        } else {
          if (xlarge > 0) {
            xlarge_stat = true;
          } else {
            xlarge_stat = false;
          }
        }
        var sizesUpdate = [
          {size: "Small", qty: small, status: small_stat},
          {size: "Medium", qty: medium, status: medium_stat},
          {size: "Large", qty: large, status: large_stat},
          {size: "X-Large", qty: xlarge, status: xlarge_stat}
        ];

        productModel.updateProduct(product_id, name, slug, description, category, price, image, sizesUpdate, (err, result) => {
          if (err) {
            req.flash('error_msg', "There was a problem updating product details. Please try again.");
            res.redirect('/admin/edit-product-details/' + slug);
          } else {
            req.flash('success_msg', "Successfully updated product details for " + name + ".");
            res.redirect('/admin/edit-product-details/' + slug);
          }
        })
      }
    }
  })
}

// GET: Add a new product
exports.getAddProduct = (req, res) => {
  res.render('add-edit-product', {
    layout: "admin",
    buttonStateEdit: "disabled",
    buttonStateAdd: ""
  });
};

// POST: Add a new product
exports.postAddProduct = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var image;
    var {name, description, category, price, small, medium, large, xlarge} = req.body;
    var slug = req.body.name.replace(/\s+/g, '-').toLowerCase();
    var small_stat, medium_stat, large_stat, xlarge_stat;

    image = req.file;
    if(image == undefined || image == null || image == "") {
      image = 'img/black-shorts.jpg';
    }
    else {
      image = "uploads/" + req.file.originalname;
    }
    console.log("IMAGE: " + image);

    productModel.getOne({slug: slug}, (err, result) => {
      if (result) {
        req.flash('error_msg', 'Product already exists.');
        res.redirect('/admin/add-new-product');
      } else {

        if (small > 0) {
          small_stat = true;
        } else {
          small_stat = false;
        }
        if (medium > 0) {
          medium_stat = true;
        } else {
          medium_stat = false;
        }
        if (large > 0) {
          large_stat = true;
        } else {
          large_stat = false;
        }
        if (xlarge > 0) {
          xlarge_stat = true;
        } else {
          xlarge_stat = false;
        }

        const newProduct = {
          name: name,
          slug: slug,
          description: description,
          category: category,
          price: Math.round(price * 100) / 100.0,
          img: image,
          stock: [
            {size: "Small", qty: small, status: small_stat},
            {size: "Medium", qty: medium, status: medium_stat},
            {size: "Large", qty: large, status: large_stat},
            {size: "X-Large", qty: xlarge, status: xlarge_stat}
          ]
        };

        productModel.create(newProduct, (err, product) => {
          if(err) {
            req.flash('error_msg', 'Could not create product. Please try again.');
            res.redirect('/admin/add-new-product');
          }
          else {
            req.flash('success_msg', 'You have added a new product in the catalogue!');
            res.redirect('/admin/add-new-product');
          }
        })
      }
    })
  }
}

// Delete a product
exports.deleteProduct = (req, res) => {
  var product_id = req.params._id;
  productModel.getOne({_id: product_id}, (err, product) => {
    if(err) {
      console.log(err);
    }
    else {
      productModel.removeProduct({_id: product_id}, (err, product) => {
        if(err) {
          console.log(err);
        }
        else {
          req.flash('success_msg', 'Successfully deleted a product!');
          res.redirect('/admin/update-products');
        }
      })
    }
  });
}

exports.getProductToDelete = (req, res) => {
  productModel.getOne({slug: req.params.slug}, (err, product) => {
    if (err) throw err;
    if(product) {
      var image = product.img.substring(1);

      res.render('confirm-delete', {
        loggedIn: req.session.user,
        id: product.id,
        name: product.name,
        img: image,
        desc: product.description,
        price: product.price.toFixed(2),
        layout: 'admin1'
      });
    }
    else {
      console.log(err);
    }
  });
}
