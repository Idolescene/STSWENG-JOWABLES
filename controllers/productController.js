const productModel = require('../models/product');

exports.getAllProducts = (req, res) => {
  var query = {archive: false};
  var sort = {name: 1};
  if (req.body.category && req.body.category != 'No Filter'){
    query.category = req.body.category;
  }
  productModel.getMany({},sort, (err, products) => {
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
      categories: categories
    });
  });
};

exports.refreshProducts = (req, res) => {
  var query = {archive: false};
  var sort = {name: 1};
  if (req.body.category && req.body.category != 'No Filter'){
    query.category = req.body.category;
  }
  
  productModel.getMany({}, sort , (err, products) => {
    if (err) throw err;
    console.log(products);
    products.forEach((item) => {
      item.price = item.price.toFixed(2);
    });
    res.render('catalogue', {
      loggedIn: req.session.user,
      products: products,
      layout:null
    });
  });
}
exports.getAProduct = (req, res) => {
  productModel.getOne({slug: req.params.slug}, (err, product) => {
    if (err) throw err;
    res.render('product-details', {
      loggedIn: req.session.user,
      productName: product.name,
      productPrice: product.price.toFixed(2),
      productDesc: product.description,
      productImg: product.img,
      sizeChart: "./img/size-chart-short.jpg"
    });
  });
};