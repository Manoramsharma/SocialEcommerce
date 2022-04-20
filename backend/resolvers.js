const { gql } = require('apollo-server-express');
const productModel = require('./models/product');

const resolvers = {
  Query: {
    getProducts: async () => {
      return await productModel.find();
    },
    getProductsByCategory: async (_, { category }, __, ___) => {
      return await productModel.find({ category: { $regex: category } });
    },
    searchUser: async (_, { user }, __, ___) => {
      const users = await userModel
        .find({ username: { $regex: user } })
        .limit(10)  
        .select('fullname username avatar');
      return users;
    },
  },
};
module.exports = resolvers;
