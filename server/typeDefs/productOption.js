const { gql } = require("apollo-server-express");

module.exports = gql`
  type ProductOption {
    _id: ID!
    ProductId: String
    Name: String
    Description: String
  }

  # ProductOption input type
  input ProductOptionCreateInput {
    ProductId: String!
    Name: String!
    Description: String!
  }

  input ProductOptionUpdateInput {
    _id: ID!
    ProductId: String
    Name: String
    Description: String
  }

  input ProductOptionOptionInput {
    _id: ID!
    ProductId: String
    Name: String
    Description: String
  }

  # queries
  type Query {
    productOptionById(productOptionId: String!): ProductOption!
    productOptionsByProductId(productId: String!): [ProductOption!]!
  }
  # mutations
  type Mutation {
    productOptionUpdate(input: ProductOptionUpdateInput!): ProductOption!
    productOptionCreate(input: ProductOptionCreateInput!): ProductOption!
    productOptionDelete(productOptionId: String!): ProductOption!
  }
`;
