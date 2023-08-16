import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($skip: Int, $category: Int) {
    getProducts(skip: $skip, category: $category) {
      id
      name
      price
      images
      discount {
        id
        discount_percent
      }
    }
  }
`;
