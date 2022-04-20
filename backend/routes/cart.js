const express = require("express");
const { addItemToCart, addToCart } = require("../controllers/cart");
const auth = require("../middlewares/auth");

const router = express.Router();
router.post("/cart/addtocart", auth, addItemToCart);
router.post("/cart/update/:id/:quantity/:size", auth, addToCart);

/* router.get("/product", getProducts);
router.get("/product/:id", auth, getProfileProduct); */

module.exports = router;
