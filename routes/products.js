const express = require('express');
const path = require('path');

const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const {Product} = require('../models/product');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  }
  else {
    callback(new Error('Blogas nuotraukos formatas'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
  fileSize: 1024 * 1024 * 5
},
  fileFilter: fileFilter
});



const ProductsController = require('../controllers/products');

router.get('/:id', ProductsController.products_get);

// Products comment and price post
router.post('/:id', ensureAuthenticated, ProductsController.products_post_comment);
router.post('/:id/bid', ensureAuthenticated, ProductsController.products_post_price);
//Quick Bid
router.post('/:id/quick-bid/first', ensureAuthenticated, ProductsController.products_post_quick_bid_first);
router.post('/:id/quick-bid/second', ensureAuthenticated, ProductsController.products_post_quick_bid_second);
router.post('/:id/quick-bid/third', ensureAuthenticated, ProductsController.products_post_quick_bid_third);
// Add Product from
router.get('/add/add-product', ensureAuthenticated, ProductsController.products_get_add_form);
router.post('/add/add-product', ensureAuthenticated, upload.array('customFile', 12), ProductsController.products_post_product);

// Products add to list
router.post('/:id/add-to-list', ensureAuthenticated, ProductsController.products_add_to_list);

// Product edit
router.get('/edit/:id', ensureAuthenticated, ProductsController.get_product_edit);
router.post('/edit/:id', ensureAuthenticated, ProductsController.post_product_edit);

router.post('/my-items/:id', ensureAuthenticated, ProductsController.delete_from_my_items);

router.post('/:id/:cId', ensureAuthenticated, ProductsController.delete_product_comment);


module.exports = router;
