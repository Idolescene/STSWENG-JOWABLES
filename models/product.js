const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String},
  description: {type: String, required: true},
  category: {type: String, required: true},
  price: {type: Number, required: true},
  // img: {type: String, required: true},
  img: {type: String},
  stock:[
    {
    status: {type: Boolean,required:true},
    size: {type: String,required:true}
    }
  ]
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

exports.getManyFilter = (query,sort,filter,next) => {
  productModel.find(query).sort(sort).exec((err, products) => {
    if (err) throw err;
    const productObjects = [];
    products.forEach((doc) => {
      if (filter == "No Filter") {
        productObjects.push(doc.toObject());
      }
      else {
        doc.stock.forEach((prod) => {
          if (prod.size == filter) {
            if (prod.status) {
              productObjects.push(doc.toObject());
            }
          }
        })
      }
    });
    next(err, productObjects);
  });
}

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

// Update a product's details
exports.updateProduct = (id, name, slug, description, category, price, status, next) => {
  productModel.updateOne(
    {_id: id},
    {$set: {name: name, slug: slug, description: description, category: category, price: price, stock: status}},
    (err, result) => {
      if (err) throw err;
      next(err, result);
    });
};

// Create a new product
exports.create = (obj, next) => {
  const product = new productModel(obj);
  product.save((err, product) => {
    if (err) throw err;
    next(err, product);
  });
};

// Delete a product
exports.removeProduct = (id, next) => {
  productModel.deleteOne(id, (err, result) => {
    if (err) throw err;
    next(err, result);
  });
};
