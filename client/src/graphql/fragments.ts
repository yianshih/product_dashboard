import { gql } from "apollo-boost";

export const PRODUCT_DATA = gql`
  fragment productData on Product {
    _id
    Name
    Description
    Price
    DeliveryPrice
  }
`;

export const PRODUCT_OPTION_DATA = gql`
  fragment productOptionData on ProductOption {
      _id
      ProductId
      Name
      Description
  }
`