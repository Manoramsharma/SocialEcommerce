const ProductsService = require('../services/products.service');
const productModel = require('../models/product');
const Product = require("../models/product");
const userModel = require('../models/userModel');
const l = require('../common/logger');

class Controller {
  async uploadProduct(req, res, next) {
    try {
      await ProductsService.uploadProduct(req.body, req.user);
      res.status(200).json({ message: 'Product Uploaded successfully' });
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) throw { status: 404, message: 'Product does not exist' };
      const deleteProduct = await ProductsService.deleteProduct(req.params.id);
      res.status(200).json({ message: 'Product Deleted successfully' });
    } catch (error) {
      l.error('[DELETE PRODUCT CONTROLLER]', req);
      next(error);
    }
  }
  async getProfileProduct(req, res, next) {
    try {
      const user = await userModel.findOne({ username: req.params.id });
      if (!user) throw { status: 400, message: 'User not found' };
      const product = await productModel
        .find({ user: user._id })
        .sort('-createdAt')
        .populate('likes','username')
        .populate('user', 'username');
      res.status(200).json({ message: 'product fetched', product: product });
    } catch (error) {
      l.error('[GET PROFILE PRODUCT CONTROLLER]', req);
      next(error);
    }
  }
  // async getAllProducts(_, res) {
  //   try {
  //     res.status(200).json(res.paginatedResults);
  //   } catch (error) {
  //     l.error('[GET ALL PRODUCTS CONTROLLER]', error);
  //   }
  // }
  async getAllProducts(req, res) {
    try {
      const result = await Product.find({})
        .populate("user", "username avatar",)
        .sort("-createdAt");
  
      res.status(200).json({ result: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };
  async getProductById(req, res, next) {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        throw { status: 400, message: 'Invalid product id' };
      }
      const product = await productModel
        .findOne({ _id: req.params.id })
        .populate('user likes');
      if (!product) {
        throw { status: 400, message: 'Product not found' };
      }
      if (!product.user) {
        await productModel.findOneAndDelete({ _id: req.params.id });
        throw { status: 400, message: 'Product not found' };
      }

      res.status(200).json({ message: 'Product fetched', product });
    } catch (error) {
      l.error(`[GET PRODUCT BY ID CONTROLLER] ${error}`, req);
      next(error);
    }
  }
  async topProducts(req, res, next) {
    try {
      const product = await productModel
        .find()
        .sort('-createdAt')
        .populate('user likes', 'avatar username fullname followers')
        .populate({
          path: 'comments',
          populate: {
            path: 'user likes',
            select: '-password',
          },
        })
        .limit(5);
      res.status(200).json({ message: 'Product fetched', product: product });
    } catch (err) {
      l.error('[TOP PRODUCTS]', req);
      next(err);
    }
  }
  async likeProduct(req, res) {
    try {
      let product = await productModel.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      
      if (product.length > 0) return res.status(500).json({ msg: 'You already liked' });

      const newProduct = await productModel
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              likes: req.user._id,
            },
          },
          { new: true },
        )
        .populate('user');
      product = await productModel.find({
        _id: req.params.id,
      });
      await userModel.findOneAndUpdate(
        { _id: newProduct.user._id },
        {
          $push: {
            notifications: {userAvatar:req.user.avatar,message:`${req.user.fullname} liked you Product`,postImg:product[0].images[0],url:`/buyproduct/${product[0]._id}`},
            unreadnotifications: {userAvatar:req.user.avatar,message:`${req.user.fullname} liked you Product`,postImg:product[0].images[0],url:`/buyproduct/${product[0]._id}`},
          },
        },
        { new: true },
      );

      res.json({ newProduct });
    } catch (err) {
      console.log(err)
      l.error('[LIKE PRODUCT]', req);
      next(error);
    }
  }
  async unlikeProduct(req, res, next) {
    try {
      const newProduct = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true },
      );

      res.json({ newProduct });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new Controller();
