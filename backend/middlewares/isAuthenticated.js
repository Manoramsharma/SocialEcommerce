const jwt = require('jsonwebtoken');
const productModel = require('../models/product');

module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('You must login first!');
  }
};

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }

  return res.status(400).json({ message: 'Authorization required' });
};

exports.userMiddleware = (req, res, next) => {};

exports.sellerMiddleware = (req, res, next) => {};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Access Denied' });
  }

  next();
};
exports.isUsersPrdouct = async (req, res, next) => {
  try{
    const product = await productModel.findById(req.params.id).populate('user');
    if (!product) throw { status: 404, message: 'Product does not exist' };
    if (product.user.username === req.user.username) {
      next();
    } else {
      res.send({ status: 400, message: 'Not authorized' });
    }
  }
  catch(err){
    next(err);
  }
};
