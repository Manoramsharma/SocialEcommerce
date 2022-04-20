const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    price: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    mrp: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1250,
    },
    productFeatures: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1250,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    images: {
      type: Array,
      required: true,
    },

    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],

    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
