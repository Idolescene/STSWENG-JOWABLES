const productModel = require('../models/product');

exports.getAllProducts = (req, res) => {
  productModel.getMany({}, (err, products) => {
    if (err) throw err;
    products.forEach((item) => {
      item.price = item.price.toFixed(2);
    });
    res.render('catalogue', {
      loggedIn: req.session.user,
      products: products
    });
  });
};

exports.getAProduct = (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  
  productModel.getOne({slug: req.params.slug}, (err, product) => {
    if (err) throw err;
    res.render('catalogue', {
      loggedIn: req.session.user,
      productImg: product.img
    })
  })
}