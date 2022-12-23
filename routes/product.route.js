
const express = require("express");
const productController = require('../controllers/product.controller');
const { checkLogin } = require("../middleware/checkLogin");

const router = express.Router();

// router format should be like it

router.route('/bulk-update')
    .patch(productController.bulkUpdateProuducts)

router.route('/bulk-delete')
    .delete(productController.bulkDeleteProducts)


router.route('/')
    .get(checkLogin, productController.getProducts)
    .post(productController.createProduct)


router.route("/:id")
    .patch(productController.updateAProductById)
    .delete(productController.deleteProductById)


module.exports = router;