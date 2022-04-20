const express = require("express");
const app = express();
const Product = require("../models/product");
const Comments = require("../models/comment");
const Users = require("../models/userModel");
const { cloudinary } = require("../configs/cloudinary");
app.use(express.json());
const UsersService = require("../services/users.service");

exports.uploadFile = async (req, res) => {
  const {
    productName,
    price,
    mrp,
    productDescription,
    productFeatures,
    category,
    subCategory,
  } = req.body;
  const links = [];
  for (var i = 0; i < req.body.file.length; i++) {
    try {
      const fileStr = req.body.file[i];
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "ml_default",
      });
      links.push(uploadResponse.secure_url);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  const newProduct = new Product({
    productName,
    price,
    mrp,
    productDescription,
    productFeatures,
    category,
    subCategory,
    images: links,
    user: req.user._id,
  });
  newProduct.save();
  res.status(200).json({
    msg: "Product Uploaded!",
    newProduct: { ...newProduct._doc, user: req.user },
  });
};

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find()
      .sort("-createdAt")
      .populate("user likes", "avatar username fullname followers")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      })
      .limit(5);
    res.status(200).json({ msg: "product fetched", product: product });
  } catch (err) {
    console.log(err);
    res.json({ msg: err });
  }
};
exports.getProfileProduct = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.id });
    const product = await Product.find({ user: user._id })
      .sort("-createdAt")
      .populate("user", "username");
    res.status(200).json({ msg: "product fetched", product: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};
// exports.getAllProducts = async (req, res) => {
//   res.json(res.paginatedResults);
// };
exports.getAllProducts = async (req, res) => {
  try {
    const result = await Product.find({})
      .populate("user", "username")
      .sort("-createdAt");

    res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id }).populate(
      "user",
      "username avatar fullname"
    );
    res.json({ product });
  } catch (error) {
    console.log(error);
  }
};

exports.likeProduct = async (req, res) => {
  try {
    const product = await Product.find({
      _id: req.params.id,
      likes: req.user._id,
    });
    try{
      if (product.length > 0)
        return res.status(500).json({ msg: "You already liked" });

      const newProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            likes: req.user._id,
          },
        },
        { new: true }
      ).populate("user");
    }
    catch {console.log('likes adding error')}
    try{
      const product = await Product.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      await Users.findOneAndUpdate(
        { _id: newProduct.user._id },
        {
          $push: {
            notifications: {userAvatar:req.user.avatar,message:`${req.user.fullname} liked you Product`,postImg:product.images[0],url:`/buyproduct/${product._id}`},
            unreadnotifications: {userAvatar:req.user.avatar,message:`${req.user.fullname} liked you Product`,postImg:product.images[0],url:`/buyproduct/${product._id}`},
          },
        },
        { new: true }
      );
    }
    catch{console.log('notification error')}

    res.json({ newProduct });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id }, function (err, obj) {
    if (err) {
      res.status(500).json({ msg: "database error occured" });
    }
    res.status(200).json({ msg: "product deleted successfully" });
  });
};
exports.getProductByCategory = async (req, res, next) => {
  const category = await Product.find({ category: req.query.category });
  const subCategory = await Product.find({
    subCategory: req.query.subcategory,
  });
  res.status(200).json({ category, subCategory });
};
