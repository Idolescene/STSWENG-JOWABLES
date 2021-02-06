const router = require('express').Router();
const cartController = require('../controllers/cartController');

// add an item to the cart
router.post('/add_to_cart/:id/', cartController.addToCart);

// delete an item from the cart
router.get('/delete_from_cart/:id', cartController.removeFromCart);

module.exports = router;
