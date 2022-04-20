const Cart = require("../models/cart");
const Users = require("../models/userModel");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find(c => c.product == product);

      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      }
      /* return res.status(400).json({message : 'hello same user'});  */
      /*  will now update the cart as cart should be unique for a user */
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((err, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};
exports.addToCart = async (req, res) => {
  try {
    const findCart = await Users.find({
      _id: req.user._id,
      "cart.product": req.params.id,
    });
    if (findCart.length > 0) {
      //already in the cart
      // we can update quantity
      if (req.params.quantity === "0") {
        console.log("in 0 quantity");
        //remove product from cart

        const data = await Users.update(
          {
            _id: req.user._id,
            "cart.product": req.params.id,
          },
          {
            $pull: {
              cart: {
                product: req.params.id,
              },
            },
          },
          { new: true }
        );
        return res.status(200).json({ msg: "cart item deleted successfully" });
      } else {
        //update quantity in cart
        console.log("in update quantity");
        const data = await Users.update(
          {
            _id: req.user._id,
            "cart.product": req.params.id,
          },
          {
            $set: {
              "cart.$.quantity": req.params.quantity,
              "cart.$.size": req.params.size,
            },
          }
        ).populate("cart.product");
        const result = await Users.findOne({ _id: req.user._id }).populate(
          "cart.product"
        );
        return res.status(200).send(result.cart);
      }
    }
    if (req.params.quantity === "0") {
      res.status(400).send(data.cart);
    } else {
      const data = await Users.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $push: {
            cart: {
              product: req.params.id,
              quantity: req.params.quantity,
              size: req.params.size,
            },
          },
        },
        { upsert: true, new: true }
      ).populate("cart.product");
      res.send(data.cart);
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
};
