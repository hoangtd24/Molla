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

export const DETAIL_PRODUCT = gql`
  query detailProduct($id: Float!) {
    detailProduct(id: $id) {
      code
      success
      message
      product {
        id
        name
        price
        discount {
          discount_percent
        }
        images
        categories {
          id
          name
        }
      }
      relatedProduct {
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
  }
`;
