const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String},
  description: {type: String, required: true},
  category: {type: String, required: true},
  price: {type: Number, required: true},
  status: {type: Boolean, required: true}, //true=available, false=out of stock
  img: {type: String, required: true}
});

const productModel = mongoose.model('products', productSchema);

/** ADMIN FUNCTIONS **/
// 1) Create/Add a new product
// 2) Delete a product
// 3) Update/Edit a product
// 4) Change status

// Get all products
exports.getAll = (query, next) => {
  productModel.find({}).exec((err, products) => {
    if (err) throw err;
    const productObjects = [];
    products.forEach((doc) => {
      productObjects.push(doc.toObject());
    });
    next(err, productObjects);
  });
};

// Get a specific group of products
exports.getMany = (query,sort,next) => {
  productModel.find(query).sort(sort).exec((err, products) => {
    if (err) throw err;
    const productObjects = [];
    products.forEach((doc) => {
      productObjects.push(doc.toObject());
    });
    next(err, productObjects);
  });
};

// Get one product
exports.getOne = (query, next) => {
  productModel.findOne(query).exec((err, product) => {
    if (err) throw err;
    next(err, product);
  });
};

// Get all product IDs
exports.getAllIds = (query, next) => {
  productModel.find({_id: {$in: query}}).exec((err, products) => {
    if (err) throw err;
    next(err, products);
  });
};

// Get one (1) product ID
exports.getById = (query, next) => {
  productModel.findOne({_id: query}).populate('_id').exec((err, product) => {
    if (err) throw err;
    next(err, product);
  });
};
