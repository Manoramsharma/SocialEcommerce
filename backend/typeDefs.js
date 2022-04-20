const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Product {
    id: ID
    productName: String
    price: Int
    mrp: Int
    productDescription: String
    productFeatures: String
    categories: String
    subCategory: String
  }
  type User {
    id: ID
    fullname: String
    username: String
    avatar: String
  }
  type Query {
    getProducts: [Product]

    getProductsByCategory(category: String): [Product]

    searchUser(username: String): [User]
  }
`;
module.exports = typeDefs;
