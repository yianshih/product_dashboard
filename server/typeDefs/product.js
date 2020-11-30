const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    _id: ID!
    Name: String
    Description: String
    Price: Float
    DeliveryPrice: Float
  }

  # input type
  input ProductCreateInput {
    Name: String!
    Description: String!
    Price: Float!
    DeliveryPrice: Float!
  }
  input ProductUpdateInput {
    _id: String!
    Name: String!
    Description: String!
    Price: Float!
    DeliveryPrice: Float!
  }

  # queries
  type Query {
    products: [Product]!
    allProducts: [Product!]!
    productByName(productName: String!): [Product!]!
    productById(productId: String!): Product!
  }
  # mutations
  type Mutation {
    productCreate(input: ProductCreateInput!): Product!
    productUpdate(input: ProductUpdateInput!): Product!
    productDelete(productId: String!): Product!
  }
`;
