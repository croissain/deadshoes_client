const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductsController');

router.get('/filter', productController.filter);
// // router.post('/search', productController.search);
// router.get('/search', productController.search);
router.get('/:productid', productController.show);
router.post('/feedback', productController.feedback);
// router.post('/:productid', productController.feedback);
router.get('/', productController.list);

module.exports = router;
