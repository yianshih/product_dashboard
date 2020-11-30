import { gql } from "apollo-boost";
import { PRODUCT_DATA, PRODUCT_OPTION_DATA } from "./fragments";

// Product
export const PRODUCT_CREATE = gql`
  mutation productCreate($input: ProductCreateInput!) {
    productCreate(input: $input) {
      ...productData
    }
  }
  ${PRODUCT_DATA}
`;

export const PRODUCT_UPDATE = gql`
  mutation productUpdate($input: ProductUpdateInput!) {
    productUpdate(input: $input) {
      ...productData
    }
  }
  ${PRODUCT_DATA}
`;

export const PRODUCT_DELETE = gql`
  mutation productDelete($productId: String!) {
    productDelete(productId: $productId) {
      _id
    }
  }
`;

// Product Option
export const PRODUCT_OPTION_DELETE = gql`
  mutation productOptionDelete($productOptionId: String!) {
    productOptionDelete(productOptionId: $productOptionId) {
      _id
    }
  }
`;

export const PRODUCT_OPTION_CREATE = gql`
  mutation productOptionCreate($input: ProductOptionCreateInput!) {
    productOptionCreate(input: $input) {
      ...productOptionData
    }
  }
  ${PRODUCT_OPTION_DATA}
`;

export const PRODUCT_OPTION_UPDATE = gql`
  mutation productOptionUpdate($input: ProductOptionUpdateInput!) {
    productOptionUpdate(input: $input) {
      ...productOptionData
    }
  }
  ${PRODUCT_OPTION_DATA}
`;
