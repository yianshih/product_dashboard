import { gql } from "apollo-boost";
import { PRODUCT_DATA, PRODUCT_OPTION_DATA } from "./fragments";

// Product
export const GET_ALL_PRODUCTS = gql`
  query {
    allProducts {
      ...productData
    }
  }
  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_BY_NAME = gql`
  query productByName($productName: String!) {
    productByName(productName: $productName) {
      ...productData
    }
  }
  ${PRODUCT_DATA}
`;

export const GET_PRODUCT_BY_ID = gql`
  query productById($productId: String!) {
    productById(productId: $productId) {
      ...productData
    }
  }
  ${PRODUCT_DATA}
`;


// ProductOption

export const GET_PRODUCT_OPTIONS_BY_PRODUCT_ID = gql`
  query productOptionsByProductId($productId: String!) {
    productOptionsByProductId(productId: $productId) {
      ...productOptionData
    }
  }
  ${PRODUCT_OPTION_DATA}
`;

export const GET_PRODUCT_OPTION_BY_ID = gql`
  query productOptionById($productOptionId: String!) {
    productOptionById(productOptionId: $productOptionId) {
      ...productOptionData
    }
  }
  ${PRODUCT_OPTION_DATA}
`;
